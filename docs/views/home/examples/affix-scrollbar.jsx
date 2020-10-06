var React = require('react');
var ScrollbarWrapper = require('react-scrollbar').ScrollbarWrapper;
require('./affix-scrollbar.css');

var HorizontalScrollbar = React.createClass({
  render: function() {
    return (
      <ScrollbarWrapper scrollbarAffix={true} className="ScrollbarContent--affix">
        <div className="ScrollbarContent--affix-columnContainer">
          <div className="ScrollbarContent--affix-column">
            Love
          </div>

          <div className="ScrollbarContent--affix-column">
            Don`t
          </div>

          <div className="ScrollbarContent--affix-column">
            Live
          </div>

          <div className="ScrollbarContent--affix-column">
            Here
          </div>

          <div className="ScrollbarContent--affix-column">
            No
          </div>

          <div className="ScrollbarContent--affix-column">
            More
          </div>
        </div>
      </ScrollbarWrapper>
    );
  }
});

module.exports = HorizontalScrollbar;

