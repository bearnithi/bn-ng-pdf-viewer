## DESCRIPTION
ANGULAR 6+ PDF VIEWER USING PDF JS. An easy to use stylish PDF Viewer for Angular 6+. (It supports angular 7 too)

## INSTALLATION
```sh
npm install bn-ng-pdf-viewer --save
```

## FEATURES
1. Pagination / Go to Page
3. Zoom In / Zoom Out

## USAGE
### Import the bn-ng-pdf-viewer in the module

```sh
import { BnNgPdfViewerModule } from 'bn-ng-pdf-viewer';
....
...
imports: [
    ....,
    BnNgPdfViewerModule
]
```

### Add the `bn-ng-pdf-viewer` selector in the component html

```html
<bn-ng-pdf-viewer [PDF]="'http://www.africau.edu/images/default/sample.pdf'" [pageNo]="1" [styleClass]="my-viewer-class"></bn-ng-pdf-viewer>
```

1. `@Input [PDF]` - url/path of the PDF file.
2. `@Input [pageNo]` - To render the particular page of the PDF document.
3. `@Input [styleClass]` - To add custom css class to the bn-ng-pdf-viewer

## VERSIONING
1.0.0 - Pagination, Zoom In, Zoom Out, Style Changes
0.0.2 - Angular 7 support added
0.0.1 - A simple angular 6 pdf viewer
