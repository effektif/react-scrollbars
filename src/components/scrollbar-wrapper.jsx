'use strict'
var React = require('react')
var ReactDOM = require('react-dom')
var createClass = require('create-react-class')

var ScrollbarMixin = require('../mixins/scrollbar')
var Scrollbar = require('./scrollbar')

function offsetTop(elm) {
  var test = elm,
    top = 0
  while (!!test && test.tagName.toLowerCase() !== 'body') {
    top += test.offsetTop
    test = test.offsetParent
  }
  return top
}

function viewportHeight() {
  var de = document.documentElement
  if (!!window.innerWidth) {
    return window.innerHeight
  } else if (de && !isNaN(de.clientHeight)) {
    return de.clientHeight
  }
  return 0
}

function scrollTop() {
  if (window.pageYOffset) {
    return window.pageYOffset
  }
  return Math.max(document.documentElement.scrollTop, document.body.scrollTop)
}

var ScrollbarWrapper = createClass({
  mixins: [ScrollbarMixin],

  componentDidMount: function () {
    window.addEventListener('message', this.handleReceive, false)
    window.addEventListener('scroll', this.handleWindowScroll, false)
    window.addEventListener('resize', this.handleWindowScroll, false)
    this.handleWindowScroll()
  },

  componentWillUnmount: function () {
    window.removeEventListener('message', this.handleReceive, false)
    window.removeEventListener('scroll', this.handleWindowScroll, false)
    window.removeEventListener('resize', this.handleWindowScroll, false)
  },

  handleReceive: function (event) {
    console.log('event', event)
    var data = event.data

    if (typeof this[data.func] === 'function') {
      this[data.func]()
    }
  },

  handleWindowScroll: function (event) {
    if (this.props.scrollbarAffix) {
      this.setState({
        fixedScrollbar: this.isPartiallyVisible(),
      })
    }
  },

  onResize: function () {
    this.handleContentResize()
  },

  render: function () {
    return (
      <div
        style={this.scrollbarContainerStyle()}
        className={this.containerClass()}
      >
        <div
          ref="scrollableContent"
          style={this.scrollbarContentStyle()}
          onScroll={this.handleScroll}
          className={this.props.className + ' ScrollbarContent'}
        >
          <div
            className="ScrollbarChildren"
            style={{
              position: 'relative',
              paddingBottom: this.state.nativeScrollbarWidth,
            }}
          >
            {this.props.children}
          </div>

          <Scrollbar {...this.props} {...this.getScrollbarProps()} />
        </div>
      </div>
    )
  },

  // returns true if parts, but not the bottom border, of the scroll container are visible in the current viewport
  isPartiallyVisible: function () {
    var containerEl = ReactDOM.findDOMNode(this)
    var elTop = offsetTop(containerEl)
    var elBottom = elTop + containerEl.clientHeight

    var vpTop = scrollTop()
    var vpBottom = vpTop + viewportHeight()

    return elTop <= vpBottom && elBottom >= vpBottom
  },
})

module.exports = ScrollbarWrapper
