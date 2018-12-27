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
var FontData_js_1 = require("../FontData.js");
var lengths_js_1 = require("../../../util/lengths.js");
var CommonTeXFont = (function (_super) {
    __extends(CommonTeXFont, _super);
    function CommonTeXFont() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CommonTeXFont.prototype, "styles", {
        get: function () {
            return {};
        },
        enumerable: true,
        configurable: true
    });
    CommonTeXFont.prototype.em = function (n) {
        return lengths_js_1.em(n);
    };
    CommonTeXFont.prototype.em0 = function (n) {
        return lengths_js_1.em(Math.max(0, n));
    };
    CommonTeXFont.defaultVariants = FontData_js_1.FontData.defaultVariants.concat([
        ['-smallop', 'normal'],
        ['-largeop', 'normal'],
        ['-size3', 'normal'],
        ['-size4', 'normal'],
        ['-tex-caligraphic', 'italic'],
        ['-tex-bold-caligraphic', 'bold-italic'],
        ['-tex-oldstyle', 'normal'],
        ['-tex-bold-oldstyle', 'bold'],
        ['-tex-mathit', 'italic'],
        ['-tex-variant', 'normal']
    ]);
    CommonTeXFont.defaultVariantClasses = {};
    CommonTeXFont.defaultSizeVariants = ['normal', '-smallop', '-largeop', '-size3', '-size4'];
    return CommonTeXFont;
}(FontData_js_1.FontData));
exports.CommonTeXFont = CommonTeXFont;
//# sourceMappingURL=tex.js.map