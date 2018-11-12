import {
  Component, OnInit, Input, OnChanges, ViewChild,
  ElementRef, EventEmitter, Output, AfterViewInit, Renderer2
} from '@angular/core';

// imports typings first
import { PDFJSStatic, PDFDocumentProxy, PDFPromise } from 'pdfjs-dist';

// then import the actual library using require() instead of import
const PDFJS: PDFJSStatic = require('pdfjs-dist');
PDFJS.workerSrc = require('pdfjs-dist/build/pdf.worker');


@Component({
  selector: 'bn-ng-pdf-viewer',
  templateUrl: 'bn-ng-pdf-viewer.component.html',
  styleUrls: ['bn-ng-pdf-viewer.component.scss']
})
export class BnNgPdfViewerComponent implements OnInit, OnChanges, AfterViewInit {
  private _PDF: string;
  private _pageNo: number;

  @Input() showAll = false;

  @Input() set PDF(value: string) {
    this._PDF = value;
    this.initPdfViewer();
  }

  get PDF() {
    return this._PDF;
  }

  @Input() set pageNo(value: number) {
    this._pageNo = value || 1;

    if (this.pageNo && this.PDFDocument) {
      this.renderPDF();
    }
  }

  get pageNo() {
    return this._pageNo;
  }

  @Input() styleClass: string;
  @ViewChild('PDFCanvas') PDFCanvasElem: ElementRef;
  @ViewChild('PDFContainer') PDFContainerElem: ElementRef;
  @ViewChild('PDFPageLink') PDFPageLinkElem: ElementRef;

  @Output() getPDFInfo = new EventEmitter<any>();
  @Output() PDFRendered = new EventEmitter<any>();


  public numOfPages: number;
  private scale = 1.5;
  public PDFDocument: any;
  public showLoader: boolean;
  public isPDFValid: boolean;

  constructor(private renderer: Renderer2) {
    let pdfWorkerSrc: string;

    if (window.hasOwnProperty('pdfWorkerSrc') && typeof (window as any).pdfWorkerSrc === 'string' && (window as any).pdfWorkerSrc) {
      pdfWorkerSrc = (window as any).pdfWorkerSrc;
    } else {
      pdfWorkerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${ (PDFJS as any).version }/pdf.worker.min.js`;
    }

    (PDFJS as any).GlobalWorkerOptions.workerSrc = pdfWorkerSrc;
   }

  ngOnInit() {

  }

  ngOnChanges(): void {

  }

  ngAfterViewInit(): void {
  }

  initPdfViewer() {
    if (this._PDF && this._PDF !== '' && this.PDFCanvasElem !== undefined) {
      PDFJS.getDocument(this._PDF).then(
        (PDF) => {
          this.PDFDocument = PDF;
          this.numOfPages = PDF.numPages;
          const PDFInfo = {
            numOfPages: this.numOfPages
          };
          this.getPDFInfo.emit(PDFInfo);
          this.renderPDF();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  renderPDF() {
    if (this.showAll) {
      this.renderAllPages();
    } else {
      this.renderPDFPage(this.pageNo);
    }
  }

  renderPDFPage(pageNo) {
    if (!isNaN(pageNo)) {
      pageNo = parseInt(pageNo, 0);
    }

    if (pageNo > this.numOfPages) {
      return;
    }
    this.showLoader = true;
    this.PDFDocument.getPage(pageNo).then((page) => {
      const viewport = page.getViewport(this.scale);
      const canvas: any = this.PDFCanvasElem.nativeElement;
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      const renderTask = page.render(renderContext);
      renderTask.then(() => {
        this.showLoader = false;
      }, (error) => {
        this.showLoader = false;
      });
    });
  }

  renderPDFPageSync(pageNo, canvas) {
    this.PDFDocument.getPage(pageNo).then((page) => {
      const viewport = page.getViewport(this.scale);
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      const renderTask = page.render(renderContext);
      renderTask.then(() => {
        this.showLoader = false;
      }, (error) => {
        this.showLoader = false;
      });
    });
  }

  renderAllPages() {
    this.showLoader = true;
    const PDFContainer: HTMLElement = this.PDFContainerElem.nativeElement;

    while (PDFContainer.firstChild) {
      PDFContainer.removeChild(PDFContainer.firstChild);
    }

    for (let i = 1; i <= this.numOfPages; i++) {
        const div: HTMLElement = this.renderer.createElement('div');

        div.setAttribute('id', `bn-ng-pdf-page-${i}`);
        div.setAttribute('style', 'position: relative');

        PDFContainer.appendChild(div);

        const canvas: HTMLCanvasElement = document.createElement('canvas');
        div.appendChild(canvas);
        this.renderPDFPageSync(i, canvas);
    }
  }

  /* PAGINATION */
  prevPage() {
    if (this._pageNo > 1) {
      this._pageNo--;
      this.goToPage();
    }
  }

  nextPage() {
    if (this._pageNo < this.numOfPages) {
      this._pageNo++;
      this.goToPage();
    }
  }

  goToPage() {
    if (this.showAll) {
      const pageLinkElement: HTMLAnchorElement = this.PDFPageLinkElem.nativeElement;
      this.renderer.setAttribute(pageLinkElement, 'href', `#bn-ng-pdf-page-${this.pageNo.toString()}`);
      pageLinkElement.click();
    } else {
      this.renderPDFPage(this.pageNo);
    }
  }

  /* ZOOM */
  zoomIn() {
    this.scale += 0.25;
    this.renderPDF();
  }

  zoomOut() {
    if (this.scale <= 0.25) {
      return;
    }
    this.scale -= 0.25;
    this.renderPDF();
  }

  /* VALIDATION */
  validateNumbers(e) {
    const pattern = /[0-9]/;

    const inputChar = String.fromCharCode(e.charCode);

    if (!pattern.test(inputChar)) {
      e.preventDefault();
    }
  }


}
