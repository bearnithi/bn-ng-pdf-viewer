import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BnNgPdfViewerComponent } from './bn-ng-pdf-viewer.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [BnNgPdfViewerComponent],
  exports: [BnNgPdfViewerComponent]
})
export class BnNgPdfViewerModule { }
