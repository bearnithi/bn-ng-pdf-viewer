import { TestBed, inject } from '@angular/core/testing';

import { BnNgPdfViewerService } from './bn-ng-pdf-viewer.service';

describe('BnNgPdfViewerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BnNgPdfViewerService]
    });
  });

  it('should be created', inject([BnNgPdfViewerService], (service: BnNgPdfViewerService) => {
    expect(service).toBeTruthy();
  }));
});
