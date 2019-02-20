"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Wrapper_js_1 = require("../Wrapper.js");
var mtable_js_1 = require("../../common/Wrappers/mtable.js");
var mtable_js_2 = require("../../../core/MmlTree/MmlNodes/mtable.js");
var WFUZZ = .25;
var SVGmtable = (function (_super) {
    __extends(SVGmtable, _super);
    function SVGmtable(factory, node, parent) {
        if (parent === void 0) { parent = null; }
        var _this = _super.call(this, factory, node, parent) || this;
        var def = { 'data-labels': true };
        if (_this.isTop) {
            def.transform = 'matrix(1 0 0 -1 0 0)';
        }
        _this.labels = _this.svg('g', def);
        return _this;
    }
    SVGmtable.prototype.toSVG = function (parent) {
        var svg = this.standardSVGnode(parent);
        this.placeRows(svg);
        this.handleColumnLines(svg);
        this.handleRowLines(svg);
        this.handleFrame(svg);
        var dx = this.handlePWidth(svg);
        this.handleLabels(svg, parent, dx);
    };
    SVGmtable.prototype.placeRows = function (svg) {
        var equal = this.node.attributes.get('equalrows');
        var _a = this.getTableData(), H = _a.H, D = _a.D;
        var HD = this.getEqualRowHeight();
        var rSpace = this.getRowHalfSpacing();
        var rLines = __spread([this.fLine], this.rLines, [this.fLine]);
        var y = this.getBBox().h - rLines[0];
        for (var i = 0; i < this.numRows; i++) {
            var row = this.childNodes[i];
            _b = __read(this.getRowHD(equal, HD, H[i], D[i]), 2), row.H = _b[0], row.D = _b[1];
            _c = __read([rSpace[i], rSpace[i + 1]], 2), row.tSpace = _c[0], row.bSpace = _c[1];
            _d = __read([rLines[i], rLines[i + 1]], 2), row.tLine = _d[0], row.bLine = _d[1];
            row.toSVG(svg);
            row.place(0, y - rSpace[i] - row.H);
            y -= rSpace[i] + row.H + row.D + rSpace[i + 1] + rLines[i + 1];
        }
        var _b, _c, _d;
    };
    SVGmtable.prototype.getRowHD = function (equal, HD, H, D) {
        return (equal ? [(HD + H - D) / 2, (HD - H + D) / 2] : [H, D]);
    };
    SVGmtable.prototype.handleColor = function () {
        _super.prototype.handleColor.call(this);
        var rect = this.adaptor.firstChild(this.element);
        if (rect) {
            this.adaptor.setAttribute(rect, 'width', this.fixed(this.getWidth()));
        }
    };
    SVGmtable.prototype.handleColumnLines = function (svg) {
        if (this.node.attributes.get('columnlines') === 'none')
            return;
        var lines = this.getColumnAttributes('columnlines');
        if (!lines)
            return;
        var cSpace = this.getColumnHalfSpacing();
        var cLines = this.cLines;
        var cWidth = this.getComputedWidths();
        var x = this.fLine;
        for (var i = 0; i < lines.length; i++) {
            x += cSpace[i] + cWidth[i] + cSpace[i + 1];
            if (lines[i] !== 'none') {
                this.adaptor.append(svg, this.makeVLine(x, lines[i], cLines[i]));
            }
            x += cLines[i];
        }
    };
    SVGmtable.prototype.handleRowLines = function (svg) {
        if (this.node.attributes.get('rowlines') === 'none')
            return;
        var lines = this.getRowAttributes('rowlines');
        if (!lines)
            return;
        var equal = this.node.attributes.get('equalrows');
        var _a = this.getTableData(), H = _a.H, D = _a.D;
        var HD = this.getEqualRowHeight();
        var rSpace = this.getRowHalfSpacing();
        var rLines = this.rLines;
        var y = this.getBBox().h - this.fLine;
        for (var i = 0; i < lines.length; i++) {
            var _b = __read(this.getRowHD(equal, HD, H[i], D[i]), 2), rH = _b[0], rD = _b[1];
            y -= rSpace[i] + rH + rD + rSpace[i + 1];
            if (lines[i] !== 'none') {
                this.adaptor.append(svg, this.makeHLine(y, lines[i], rLines[i]));
            }
            y -= rLines[i];
        }
    };
    SVGmtable.prototype.handleFrame = function (svg) {
        if (this.frame) {
            var _a = this.getBBox(), h = _a.h, d = _a.d, w = _a.w;
            var style = this.node.attributes.get('frame');
            this.adaptor.append(svg, this.makeFrame(w, h, d, style));
        }
    };
    SVGmtable.prototype.handlePWidth = function (svg) {
        if (!this.pWidth)
            return 0;
        var _a = this.getBBox(), w = _a.w, L = _a.L, R = _a.R;
        var W = L + this.pWidth + R;
        var _b = __read(this.getAlignShift(), 2), align = _b[0], shift = _b[1];
        var CW = Math.max(this.isTop ? W : 0, this.container.getWrapWidth(this.containerI)) - L - R;
        var dw = w - (this.pWidth > CW ? CW : this.pWidth);
        var dx = (align === 'left' ? 0 : align === 'right' ? dw : dw / 2);
        if (dx) {
            var table = this.svg('g', {}, this.adaptor.childNodes(svg));
            this.place(dx, 0, table);
            this.adaptor.append(svg, table);
        }
        return dx;
    };
    SVGmtable.prototype.makeFrame = function (w, h, d, style) {
        var t = this.fLine;
        return this.svg('rect', this.setLineThickness(t, style, {
            'data-frame': true, 'class': 'mjx-' + style,
            width: this.fixed(w - t), height: this.fixed(h + d - t),
            x: this.fixed(t / 2), y: this.fixed(t / 2 - d)
        }));
    };
    SVGmtable.prototype.makeVLine = function (x, style, t) {
        var _a = this.getBBox(), h = _a.h, d = _a.d;
        var dt = (style === 'dotted' ? t / 2 : 0);
        var X = this.fixed(x + t / 2);
        return this.svg('line', this.setLineThickness(t, style, {
            'data-line': 'v', 'class': 'mjx-' + style,
            x1: X, y1: this.fixed(dt - d), x2: X, y2: this.fixed(h - dt)
        }));
    };
    SVGmtable.prototype.makeHLine = function (y, style, t) {
        var w = this.getBBox().w;
        var dt = (style === 'dotted' ? t / 2 : 0);
        var Y = this.fixed(y - t / 2);
        return this.svg('line', this.setLineThickness(t, style, {
            'data-line': 'h', 'class': 'mjx-' + style,
            x1: this.fixed(dt), y1: Y, x2: this.fixed(w - dt), y2: Y
        }));
    };
    SVGmtable.prototype.setLineThickness = function (t, style, properties) {
        if (t !== .07) {
            properties['stroke-thickness'] = this.fixed(t);
            if (style !== 'solid') {
                properties['stroke-dasharray'] = (style === 'dotted' ? '0,' : '') + this.fixed(2 * t);
            }
        }
        return properties;
    };
    SVGmtable.prototype.handleLabels = function (svg, parent, dx) {
        if (!this.hasLabels)
            return;
        var labels = this.labels;
        var attributes = this.node.attributes;
        var adaptor = this.adaptor;
        var side = attributes.get('side');
        this.spaceLabels();
        this.isTop ? this.topTable(svg, labels, side) : this.subTable(svg, labels, side, dx);
    };
    SVGmtable.prototype.spaceLabels = function () {
        var adaptor = this.adaptor;
        var equal = this.node.attributes.get('equalrows');
        var _a = this.getBBox(), h = _a.h, d = _a.d;
        var L = this.getTableData().L;
        var space = this.getRowHalfSpacing();
        var y = h - this.fLine;
        var current = adaptor.firstChild(this.labels);
        for (var i = 0; i < this.numRows; i++) {
            var row = this.childNodes[i];
            if (row.node.isKind('mlabeledtr')) {
                var cell = row.childNodes[0];
                y -= space[i] + row.H;
                row.placeCell(cell, { x: 0, y: y, w: L, lSpace: 0, rSpace: 0, lLine: 0, rLine: 0 });
                y -= row.D + space[i + 1] + this.rLines[i];
                current = adaptor.next(current);
            }
            else {
                y -= space[i] + row.H + row.D + space[i + 1] + this.rLines[i];
            }
        }
    };
    SVGmtable.prototype.topTable = function (svg, labels, side) {
        var adaptor = this.adaptor;
        var _a = this.getBBox(), h = _a.h, d = _a.d, w = _a.w, L = _a.L, R = _a.R;
        var W = L + (this.pWidth || w) + R;
        var LW = this.getTableData().L;
        var _b = __read(this.getPadAlignShift(side), 3), pad = _b[0], align = _b[1], shift = _b[2];
        var translate = (shift ? " translate(" + this.fixed(shift) + " 0)" : '');
        var scale = "scale(" + this.jax.fixed((this.font.params.x_height * 1000) / this.metrics.ex, 2) + ")";
        var transform = "translate(0, " + this.fixed(h) + ") matrix(1 0 0 -1 0 0) " + scale;
        var table = this.svg('svg', {
            'data-table': true, transform: transform,
            preserveAspectRatio: (align === 'left' ? 'xMinYMid' : align === 'right' ? 'xMaxYMid' : 'xMidYMid'),
            viewBox: [this.fixed(-L), this.fixed(-h), this.fixed(W), this.fixed(h + d)].join(' ')
        }, [
            this.svg('g', { transform: 'matrix(1 0 0 -1 0 0)' + translate }, adaptor.childNodes(svg))
        ]);
        labels = this.svg('svg', {
            'data-labels': true, transform: transform,
            preserveAspectRatio: (side === 'left' ? 'xMinYMid' : 'xMaxYMid'),
            viewBox: [0, this.fixed(-h), this.fixed(LW), this.fixed(h + d)].join(' ')
        }, [labels]);
        adaptor.append(svg, table);
        adaptor.append(svg, labels);
        this.place(-L, 0, svg);
    };
    SVGmtable.prototype.subTable = function (svg, labels, side, dx) {
        var adaptor = this.adaptor;
        var _a = this.getBBox(), w = _a.w, L = _a.L, R = _a.R;
        var W = L + (this.pWidth || w) + R;
        var labelW = this.getTableData().L;
        var _b = __read(this.getAlignShift(), 2), align = _b[0], shift = _b[1];
        var CW = Math.max(W, this.container.getWrapWidth(this.containerI));
        this.place(side === 'left' ?
            (align === 'left' ? 0 : align === 'right' ? W - CW + dx : (W - CW) / 2 + dx) - L :
            (align === 'left' ? CW : align === 'right' ? W + dx : (CW + W) / 2 + dx) - L - labelW, 0, labels);
        adaptor.append(svg, labels);
    };
    return SVGmtable;
}(mtable_js_1.CommonMtableMixin(Wrapper_js_1.SVGWrapper)));
SVGmtable.kind = mtable_js_2.MmlMtable.prototype.kind;
SVGmtable.styles = {
    'g[data-mml-node="mtable"] > line[data-line]': {
        'stroke-width': '70px',
        fill: 'none'
    },
    'g[data-mml-node="mtable"] > rect[data-frame]': {
        'stroke-width': '70px',
        fill: 'none'
    },
    'g[data-mml-node="mtable"] > .mjx-dashed': {
        'stroke-dasharray': '140'
    },
    'g[data-mml-node="mtable"] > .mjx-dotted': {
        'stroke-linecap': 'round',
        'stroke-dasharray': '0,140'
    },
    'g[data-mml-node="mtable"] > svg': {
        overflow: 'visible'
    }
};
exports.SVGmtable = SVGmtable;
//# sourceMappingURL=mtable.js.map