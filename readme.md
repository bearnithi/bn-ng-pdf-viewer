## DESCRIPTION
ANGULAR 6+ PDF VIEWER USING PDF JS. An easy to use stylish PDF Viewer for Angular 6+. It comes with a toolbar containing pagination/go to page and zooming options. (It supports angular 7 too)

## INSTALLATION
```sh
npm install bn-ng-pdf-viewer --save
```

## Content

* [Install](#installation)
* [Usage](#usage)
* [Options](#options)

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
<bn-ng-pdf-viewer [showAll]="true" [PDF]="'http://www.africau.edu/images/default/sample.pdf'" [pageNo]="1" [styleClass]="my-viewer-class"></bn-ng-pdf-viewer>
```

## OPTIONS
* [[PDF]](#pdf)
* [[pageNo]](#pageno)
* [[showAll]](#showall)
* [[styleClass]](#styleclass)
* [(PDFRender)](#pdfrender)

### INPUT PROPERTIES

#### [PDF]

| Property | Type | Required |
| --- | ---- | --- |
| [PDF] | *string* | Required |

Pass PDF Source
 
```
[PDF]="'http://www.africau.edu/images/default/sample.pdf'"
```

#### [pageNo]


| Property | Type | Required |
| --- | ---- | --- |
| [pageNo] | *number* |  *Optional* |

Page number

```
[pageNo]="1"
```

#### [showAll]

| Property | Type | Required |
| --- | ---- | --- |
| [showAll] | *boolean* | *Optional* |

Show all the pages

```
[showAll]="true"
```

#### [styleClass]

| Property | Type | Required |
| --- | ---- | --- |
| [styleClass] | *boolean* | *Optional* |

Add custom css class to the PDF viewer

```
[styleClass]="true"
```
### OUTPUT PROPERTIES

#### (PDFRender)
| Property | Type | Required |
| --- | ---- | --- |
| [PDFRender] | *string* | *Optional* |

PDF RENDER EMITS THREE VALUES:
1. 'LOADING' - It emits whenever a PDF Page is loading.
2. 'FINISHED' - It emits once the PDF page is successfully rendered.
3. 'ERROR' - It emits once an error occured while rendering the PDF page.

## VERSIONING
1.1.0 - Show All pages option added
1.0.0 - Pagination, Zoom In, Zoom Out, Style Changes
0.0.2 - Angular 7 support added
0.0.1 - A simple angular 6 pdf viewer
