# jquery-show-all

Make container take as much as possible space of its parent with specified (width / height) ratio
Like SHOW_ALL scale mode

## Usage
```js
$('#myDiv').showAll(16, 9, {
  horizontalAlign: true, // optional default: true
  vertivalAlign: true // optional default: true
})
```

or

```html
<div data-show-all data-width="16" data-height="9"></div>
```