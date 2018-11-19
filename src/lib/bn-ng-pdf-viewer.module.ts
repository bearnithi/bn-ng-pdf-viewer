import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BnNgPdfViewerComponent } from './bn-ng-pdf-viewer.component';
import { CommonModule } from '@angular/common';
import { ValidationService } from './services/validation.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [BnNgPdfViewerComponent],
  providers: [ValidationService],
  exports: [BnNgPdfViewerComponent]
})
export class BnNgPdfViewerModule { }
