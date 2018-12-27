"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var OutputJax_js_1 = require("./common/OutputJax.js");
var WrapperFactory_js_1 = require("./chtml/WrapperFactory.js");
var tex_js_1 = require("./chtml/fonts/tex.js");
var CHTML = (function (_super) {
    __extends(CHTML, _super);
    function CHTML(options) {
        if (options === void 0) { options = null; }
        return _super.call(this, options, WrapperFactory_js_1.CHTMLWrapperFactory, tex_js_1.TeXFont) || this;
    }
    CHTML.prototype.escaped = function (math, html) {
        this.setDocument(html);
        return this.html('span', {}, [this.text(math.math)]);
    };
    CHTML.prototype.styleSheet = function (html) {
        var sheet = _super.prototype.styleSheet.call(this, html);
        this.adaptor.setAttribute(sheet, 'id', 'CHTML-styles');
        return sheet;
    };
    CHTML.prototype.addClassStyles = function (CLASS) {
        var _a;
        if (CLASS.autoStyle && CLASS.kind !== 'unknown') {
            this.cssStyles.addStyles((_a = {},
                _a['mjx-' + CLASS.kind] = {
                    display: 'inline-block',
                    'text-align': 'left'
                },
                _a));
        }
        _super.prototype.addClassStyles.call(this, CLASS);
    };
    CHTML.prototype.processMath = function (math, parent) {
        return this.factory.wrap(math).toCHTML(parent);
    };
    CHTML.NAME = 'CHTML';
    CHTML.OPTIONS = __assign({}, OutputJax_js_1.CommonOutputJax.OPTIONS);
    return CHTML;
}(OutputJax_js_1.CommonOutputJax));
exports.CHTML = CHTML;
//# sourceMappingURL=chtml.js.map