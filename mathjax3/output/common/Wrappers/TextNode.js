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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
function CommonTextNodeMixin(Base) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.computeBBox = function (bbox) {
            var _a;
            var variant = this.parent.variant;
            if (variant === '-explicitFont') {
            }
            else {
                var c = this.parent.stretch.c;
                var text = this.node.getText();
                var chars = this.parent.remapChars(c ? [c] : this.unicodeChars(text));
                var _b = __read(this.getVariantChar(variant, chars[0]), 4), h = _b[0], d = _b[1], w = _b[2], data = _b[3];
                bbox.h = h;
                bbox.d = d;
                bbox.w = w;
                bbox.ic = data.ic || 0;
                bbox.sk = data.sk || 0;
                for (var i = 1, m = chars.length; i < m; i++) {
                    _a = __read(this.getVariantChar(variant, chars[i]), 4), h = _a[0], d = _a[1], w = _a[2], data = _a[3];
                    bbox.w += w;
                    if (h > bbox.h)
                        bbox.h = h;
                    if (d > bbox.d)
                        bbox.d = d;
                    bbox.ic = data.ic || 0;
                    bbox.sk = 0;
                }
            }
        };
        class_1.prototype.getStyles = function () { };
        class_1.prototype.getVariant = function () { };
        class_1.prototype.getScale = function () { };
        class_1.prototype.getSpace = function () { };
        return class_1;
    }(Base));
}
exports.CommonTextNodeMixin = CommonTextNodeMixin;
//# sourceMappingURL=TextNode.js.map