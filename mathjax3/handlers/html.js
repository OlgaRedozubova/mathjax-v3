"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mathjax_js_1 = require("../mathjax.js");
var HTMLHandler_js_1 = require("./html/HTMLHandler.js");
function RegisterHTMLHandler(adaptor) {
    mathjax_js_1.MathJax.handlers.register(new HTMLHandler_js_1.HTMLHandler(adaptor));
}
exports.RegisterHTMLHandler = RegisterHTMLHandler;
//# sourceMappingURL=html.js.map