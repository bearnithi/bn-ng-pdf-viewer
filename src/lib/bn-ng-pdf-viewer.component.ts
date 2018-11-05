import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';

// imports typings first
import { PDFJSStatic, PDFDocumentProxy, PDFPromise } from 'pdfjs-dist';

// then import the actual library using require() instead of import
const pdfjs: PDFJSStatic = require('pdfjs-dist');
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'bn-ng-pdf-viewer',
  templateUrl: 'bn-ng-pdf-viewer.component.html',
  styleUrls: ['bn-ng-pdf-viewer.component.css']
})
export class BnNgPdfViewerComponent implements OnInit, OnChanges {
  @Input() pdf;
  @Input() pageNo = 1;
  @ViewChild('pdfCanvas') pdfCanvasElem: ElementRef;
  constructor(private renderer: Renderer2, private ele: ElementRef) { }

  ngOnInit() {

  }

  ngOnChanges(): void {

  }

  ngAfterViewInit(): void {
    this.initPdfViewer();
  }

  initPdfViewer() {
    if (this.pdf && this.pdf !== '') {
      pdfjs.getDocument(this.pdf).then(
        (pdf) => {
         pdf.getPage(this.pageNo).then((page) => {
           const viewport = page.getViewport(1.5);
           const canvas: any = this.pdfCanvasElem.nativeElement;
           const context = canvas.getContext('2d');
           canvas.height = viewport.height;
           canvas.width = viewport.width;

           const renderContext = {
             canvasContext: context,
             viewport: viewport
           };

           const renderTask = page.render(renderContext);
           renderTask.then(() => {
             console.log('page rendered');
           });
         });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

}
