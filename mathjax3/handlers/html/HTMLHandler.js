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
Object.defineProperty(exports, "__esModule", { value: true });
var Handler_js_1 = require("../../core/Handler.js");
var HTMLDocument_js_1 = require("./HTMLDocument.js");
var HTMLHandler = (function (_super) {
    __extends(HTMLHandler, _super);
    function HTMLHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HTMLHandler.prototype.handlesDocument = function (document) {
        if (typeof (document) === 'string') {
            try {
                document = this.adaptor.parse(document, 'text/html');
            }
            catch (err) { }
        }
        if (document instanceof this.adaptor.window.Document ||
            document instanceof this.adaptor.window.HTMLElement ||
            document instanceof this.adaptor.window.DocumentFragment) {
            return true;
        }
        return false;
    };
    HTMLHandler.prototype.create = function (document, options) {
        if (typeof (document) === 'string') {
            document = this.adaptor.parse(document, 'text/html');
        }
        else if (document instanceof this.adaptor.window.HTMLElement ||
            document instanceof this.adaptor.window.DocumentFragment) {
            var child = document;
            document = this.adaptor.parse('', 'text/html');
            this.adaptor.append(this.adaptor.body(document), child);
        }
        return new HTMLDocument_js_1.HTMLDocument(document, this.adaptor, options);
    };
    return HTMLHandler;
}(Handler_js_1.AbstractHandler));
exports.HTMLHandler = HTMLHandler;
//# sourceMappingURL=HTMLHandler.js.map