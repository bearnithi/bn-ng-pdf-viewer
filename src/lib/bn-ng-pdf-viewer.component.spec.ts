import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BnNgPdfViewerComponent } from './bn-ng-pdf-viewer.component';

describe('BnNgPdfViewerComponent', () => {
  let component: BnNgPdfViewerComponent;
  let fixture: ComponentFixture<BnNgPdfViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BnNgPdfViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BnNgPdfViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
