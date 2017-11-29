;(function($) {

  function supportFlexbox() {
    var d = document.createElement('div')
    d.style.display = 'flex'
    return d.style.display === 'flex'
  }

  $.fn.showAll = function(rWidth, rHeight, options) {
    if (typeof rWidth !== 'number' || rWidth <= 0) {
      throw Error('Ratio width should be a positive number')
    }

    if (typeof rHeight !== 'number' || rHeight <= 0) {
      throw Error('Ratio height should be a positive number')
    }

    var defaultOptions = {
      horizontalAlign: true,
      verticalAlign: true
    }

    if (options) {
      options = $.extend({}, defaultOptions, options)
    }

    var elemRatio = rWidth / rHeight

    return this.each(function() {
      var $this = $(this)
      var $parent = $this.parent()
      if ($parent.css('position') === 'static') {
        $parent.css('position', 'relative')
      }
      var parentWidth = $parent.width()
      var parentHeight = $parent.height()
      var parentRatio = parentWidth / parentHeight

      // take all parent height
      if (parentRatio > elemRatio) {
        $this.height(parentHeight).width(parentHeight * elemRatio)
      }
      // take all parent width
      else {
        $this.width(parentWidth).height(parentWidth / elemRatio)
      }

      if (supportFlexbox()) {
        $parent.css('display', 'flex')
        if (options.horizontalAlign) {
        }
      }

      return this
    })
  }
})(jQuery)