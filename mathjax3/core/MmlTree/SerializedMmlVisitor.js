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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
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
var MmlVisitor_js_1 = require("./MmlVisitor.js");
var MmlNode_js_1 = require("./MmlNode.js");
var SerializedMmlVisitor = (function (_super) {
    __extends(SerializedMmlVisitor, _super);
    function SerializedMmlVisitor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SerializedMmlVisitor.prototype.visitTree = function (node) {
        return this.visitNode(node, '');
    };
    SerializedMmlVisitor.prototype.visitTextNode = function (node, space) {
        return node.getText();
    };
    SerializedMmlVisitor.prototype.visitXMLNode = function (node, space) {
        return '[XML Node not implemented]';
    };
    SerializedMmlVisitor.prototype.visitInferredMrowNode = function (node, space) {
        var e_1, _a;
        var mml = [];
        try {
            for (var _b = __values(node.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                mml.push(this.visitNode(child, space));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return mml.join('\n');
    };
    SerializedMmlVisitor.prototype.visitTeXAtomNode = function (node, space) {
        var e_2, _a;
        var texclass = node.texClass < 0 ? 'NONE' : MmlNode_js_1.TEXCLASSNAMES[node.texClass];
        var mml = space + '<mrow class="MJX-TeXAtom-' + texclass + '"' +
            this.getAttributes(node) + '>\n';
        var endspace = space;
        space += '  ';
        try {
            for (var _b = __values(node.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                mml += this.visitNode(child, space);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        mml += '\n' + endspace + '</mrow>';
        return mml;
    };
    SerializedMmlVisitor.prototype.visitDefault = function (node, space) {
        var e_3, _a;
        var kind = node.kind;
        var _b = __read((node.isToken || node.childNodes.length === 0 ? ['', ''] : ['\n', space]), 2), nl = _b[0], endspace = _b[1];
        var mml = space + '<' + kind + this.getAttributes(node) + '>' + nl;
        space += '  ';
        try {
            for (var _c = __values(node.childNodes), _d = _c.next(); !_d.done; _d = _c.next()) {
                var child = _d.value;
                mml += this.visitNode(child, space) + nl;
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_3) throw e_3.error; }
        }
        mml += endspace + '</' + kind + '>';
        return mml;
    };
    SerializedMmlVisitor.prototype.getAttributes = function (node) {
        var e_4, _a;
        var ATTR = '';
        var attributes = node.attributes.getAllAttributes();
        try {
            for (var _b = __values(Object.keys(attributes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var name_1 = _c.value;
                ATTR += ' ' + name_1 + '="' + this.quoteAttribute(attributes[name_1].toString()) + '"';
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return ATTR;
    };
    SerializedMmlVisitor.prototype.quoteAttribute = function (value) {
        return value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/\"/g, '&quot;')
            .replace(/([\uD800-\uDBFF].)/g, function (m, c) {
            return '&#x' + ((c.charCodeAt(0) - 0xD800) * 0x400 +
                (c.charCodeAt(1) - 0xDC00) + 0x10000).toString(16).toUpperCase() + ';';
        })
            .replace(/([\u0080-\uD7FF\uE000-\uFFFF])/g, function (m, c) {
            return '&#x' + c.charCodeAt(0).toString(16).toUpperCase() + ';';
        });
    };
    return SerializedMmlVisitor;
}(MmlVisitor_js_1.MmlVisitor));
exports.SerializedMmlVisitor = SerializedMmlVisitor;
//# sourceMappingURL=SerializedMmlVisitor.js.map