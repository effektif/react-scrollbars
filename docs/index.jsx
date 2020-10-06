"use strict";
var React = require("react");
var ReactDOM = require("react-dom");

var Home = require("./views/home/index.jsx");

require("normalize.css/normalize.css");
require("./app.css");

ReactDOM.render(<Home />, document.getElementById("App"));
