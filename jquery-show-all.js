;(function($) {
  function supportFlexbox() {
    var d = document.createElement('div')
    d.style.display = 'flex'
    return d.style.display === 'flex'
  }

  var bindElem = []

  window.addEventListener('resize', () => {
    bindElem.forEach(function(item) {
      item.elem.each(function() {
        var $this = $(this)
        var $parent = $this.parent()
        var parentWidth = $parent.width()
        var parentHeight = $parent.height()
        var parentRatio = parentWidth / parentHeight
        if (parentRatio > item.elemRatio) {
          $this.height(parentHeight).width(parentHeight * item.elemRatio)
        } else {
          $this.width(parentWidth).height(parentWidth / item.elemRatio)
        }
      })
    })
  }, false)

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
    else {
      options = defaultOptions
    }

    var elemRatio = rWidth / rHeight

    bindElem.push({
      elemRatio: elemRatio,
      elem: this
    })

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
      } else {
        // take all parent width
        $this.width(parentWidth).height(parentWidth / elemRatio)
      }

      var styles = {}

      if (supportFlexbox()) {
        styles.display = 'flex'
        styles.flexDirection = 'row'
        if (options.horizontalAlign) {
          styles.justifyContent = 'center'
        }
        if (options.verticalAlign) {
          styles.alignItems = 'center'
        }
        $parent.css(styles)
      } else {
        styles.margin = 'auto'
        styles.position = 'absolute'
        if (options.horizontalAlign) {
          styles.left = 0
          styles.right = 0
        }

        if (options.verticalAlign) {
          styles.top = 0
          styles.bottom = 0
        }
        $this.css(styles)
      }

      return this
    })
  }

  $('[data-show-all]').each(function() {
    var $this = $(this)
    $this.showAll($this.data('width'), $this.data('height'))
  })
})(jQuery)
