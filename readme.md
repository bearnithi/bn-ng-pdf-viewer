## DESCRIPTION

ANGULAR 6+ PDF VIEWER USING PDF JS. An easy to use PDF Viewer for Angular 6+.


## INSTALLATION
```sh
npm install bn-ng-pdf-viewer
```

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

### Add 'node' type to your tsconfig.app.json
```sh
 "types": [
      "node"
    ]
```

### Add the `bn-ng-pdf-viewer` selector in the component html

```html
<bn-ng-pdf-viewer [pdf]="'http://www.africau.edu/images/default/sample.pdf'" [pageNo]="1"></bn-ng-pdf-viewer>
```

1. It accepts `[pdf]` as input which is the url/path of the pdf file.
2. It accepts `[pageNo]` as input to render the particular page of the pdf document.



## VERSIONING

0.0.1 - A simple angular 6 pdf viewer
