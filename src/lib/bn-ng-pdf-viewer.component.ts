import { Component, OnInit, Input, OnChanges, ViewChild,
   ElementRef, EventEmitter, Output, AfterViewInit } from '@angular/core';

// imports typings first
import { PDFJSStatic, PDFDocumentProxy, PDFPromise } from 'pdfjs-dist';

// then import the actual library using require() instead of import
const PDFJS: PDFJSStatic = require('pdfjs-dist');


@Component({
  selector: 'bn-ng-pdf-viewer',
  templateUrl: 'bn-ng-pdf-viewer.component.html',
  styleUrls: ['bn-ng-pdf-viewer.component.scss']
})
export class BnNgPdfViewerComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() PDF;
  @Input() pageNo = 1;
  @Input() styleClass: string;
  @ViewChild('PDFCanvas') PDFCanvasElem: ElementRef;

  @Output() getPDFInfo = new EventEmitter<any>();


  public numOfPages: number;
  private scale = 1.5;
  public PDFDocument: any;
  public showLoader: boolean;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(): void {
    if (this.pageNo && this.PDFDocument) {
      this.renderPDFPage(this.pageNo);
    }
  }

  ngAfterViewInit(): void {
    this.initPdfViewer();
  }

  initPdfViewer() {
    if (this.PDF && this.PDF !== '') {
      PDFJS.getDocument(this.PDF).then(
        (PDF) => {
          this.PDFDocument = PDF;
          this.numOfPages = PDF.numPages;
          const PDFInfo = {
            numOfPages: this.numOfPages
          };
          this.getPDFInfo.emit(PDFInfo);
          this.renderPDFPage(this.pageNo);
        },
        (error) => {
          console.log(error);
        }
      );
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

  prevPage() {
    if (this.pageNo > 1) {
      this.pageNo--;
      this.renderPDFPage(this.pageNo);
    }
  }

  nextPage() {
    if (this.pageNo < this.numOfPages) {
      this.pageNo++;
      this.renderPDFPage(this.pageNo);
    }
  }

  zoomIn() {
    this.scale += 0.25;
    this.renderPDFPage(this.pageNo);
  }

  zoomOut() {
    if (this.scale <= 0.25) {
      return;
   }
    this.scale -= 0.25;
    this.renderPDFPage(this.pageNo);
  }

  validateNumbers(e) {
    const pattern = /[0-9]/;

    const inputChar = String.fromCharCode(e.charCode);

    if (!pattern.test(inputChar)) {
      e.preventDefault();
    }
  }


}
