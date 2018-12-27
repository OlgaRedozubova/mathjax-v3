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
var Wrapper_js_1 = require("../Wrapper.js");
var mtable_js_1 = require("../../common/Wrappers/mtable.js");
var mtable_js_2 = require("../../../core/MmlTree/MmlNodes/mtable.js");
var string_js_1 = require("../../../util/string.js");
var CHTMLmtable = (function (_super) {
    __extends(CHTMLmtable, _super);
    function CHTMLmtable(factory, node, parent) {
        if (parent === void 0) { parent = null; }
        var _this = _super.call(this, factory, node, parent) || this;
        _this.labels = _this.html('mjx-labels');
        return _this;
    }
    CHTMLmtable.prototype.toCHTML = function (parent) {
        var e_1, _a;
        var chtml = this.standardCHTMLnode(parent);
        var table = this.adaptor.append(chtml, this.html('mjx-itable'));
        try {
            for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                child.toCHTML(table);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.padRows();
        this.handleColumnSpacing();
        this.handleColumnLines();
        this.handleColumnWidths();
        this.handleRowSpacing();
        this.handleRowLines();
        this.handleEqualRows();
        this.handleFrame();
        this.handleWidth();
        this.handleLabels();
        this.handleAlign();
        this.handleJustify();
        this.shiftColor();
    };
    CHTMLmtable.prototype.shiftColor = function () {
        var color = this.adaptor.getStyle(this.chtml, 'backgroundColor');
        if (color) {
            this.adaptor.setStyle(this.chtml, 'backgroundColor', '');
            this.adaptor.setStyle(this.adaptor.firstChild(this.chtml), 'backgroundColor', color);
        }
    };
    CHTMLmtable.prototype.padRows = function () {
        var e_2, _a;
        try {
            for (var _b = __values(this.adaptor.childNodes(this.adaptor.firstChild(this.chtml))), _c = _b.next(); !_c.done; _c = _b.next()) {
                var row = _c.value;
                while (this.adaptor.childNodes(row).length < this.numCols) {
                    this.adaptor.append(row, this.html('mjx-mtd'));
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    CHTMLmtable.prototype.handleColumnSpacing = function () {
        var e_3, _a, e_4, _b;
        var spacing = this.getEmHalfSpacing(this.fSpace[0], this.cSpace);
        var frame = this.frame;
        try {
            for (var _c = __values(this.tableRows), _d = _c.next(); !_d.done; _d = _c.next()) {
                var row = _d.value;
                var i = 0;
                try {
                    for (var _e = __values(row.tableCells), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var cell = _f.value;
                        var lspace = spacing[i++];
                        var rspace = spacing[i];
                        var styleNode = (cell ? cell.chtml : this.adaptor.childNodes(row.chtml)[i]);
                        if ((i > 1 && lspace !== '0.4em') || (frame && i === 1)) {
                            this.adaptor.setStyle(styleNode, 'paddingLeft', lspace);
                        }
                        if ((i < this.numCols && rspace !== '0.4em') || (frame && i === this.numCols)) {
                            this.adaptor.setStyle(styleNode, 'paddingRight', rspace);
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    CHTMLmtable.prototype.handleColumnLines = function () {
        var e_5, _a, e_6, _b;
        if (this.node.attributes.get('columnlines') === 'none')
            return;
        var lines = this.getColumnAttributes('columnlines');
        try {
            for (var _c = __values(this.childNodes), _d = _c.next(); !_d.done; _d = _c.next()) {
                var row = _d.value;
                var i = 0;
                try {
                    for (var _e = __values(this.adaptor.childNodes(row.chtml).slice(1)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var cell = _f.value;
                        var line = lines[i++];
                        if (line === 'none')
                            continue;
                        this.adaptor.setStyle(cell, 'borderLeft', '.07em ' + line);
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_5) throw e_5.error; }
        }
    };
    CHTMLmtable.prototype.handleColumnWidths = function () {
        var e_7, _a, e_8, _b;
        try {
            for (var _c = __values(this.childNodes), _d = _c.next(); !_d.done; _d = _c.next()) {
                var row = _d.value;
                var i = 0;
                try {
                    for (var _e = __values(this.adaptor.childNodes(row.chtml)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var cell = _f.value;
                        var w = this.cWidths[i++];
                        if (w !== null) {
                            var width = (typeof w === 'number' ? this.em(w) : w);
                            this.adaptor.setStyle(cell, 'width', width);
                            this.adaptor.setStyle(cell, 'maxWidth', width);
                            this.adaptor.setStyle(cell, 'minWidth', width);
                        }
                    }
                }
                catch (e_8_1) { e_8 = { error: e_8_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_8) throw e_8.error; }
                }
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_7) throw e_7.error; }
        }
    };
    CHTMLmtable.prototype.handleRowSpacing = function () {
        var e_9, _a, e_10, _b;
        var spacing = this.getEmHalfSpacing(this.fSpace[1], this.rSpace);
        var frame = this.frame;
        var i = 0;
        try {
            for (var _c = __values(this.childNodes), _d = _c.next(); !_d.done; _d = _c.next()) {
                var row = _d.value;
                var tspace = spacing[i++];
                var bspace = spacing[i];
                try {
                    for (var _e = __values(row.childNodes), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var cell = _f.value;
                        if ((i > 1 && tspace !== '0.215em') || (frame && i === 1)) {
                            this.adaptor.setStyle(cell.chtml, 'paddingTop', tspace);
                        }
                        if ((i < this.numRows && bspace !== '0.215em') || (frame && i === this.numRows)) {
                            this.adaptor.setStyle(cell.chtml, 'paddingBottom', bspace);
                        }
                    }
                }
                catch (e_10_1) { e_10 = { error: e_10_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_10) throw e_10.error; }
                }
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_9) throw e_9.error; }
        }
    };
    CHTMLmtable.prototype.handleRowLines = function () {
        var e_11, _a, e_12, _b;
        if (this.node.attributes.get('rowlines') === 'none')
            return;
        var lines = this.getRowAttributes('rowlines');
        var i = 0;
        try {
            for (var _c = __values(this.childNodes.slice(1)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var row = _d.value;
                var line = lines[i++];
                if (line === 'none')
                    continue;
                try {
                    for (var _e = __values(this.adaptor.childNodes(row.chtml)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var cell = _f.value;
                        this.adaptor.setStyle(cell, 'borderTop', '.07em ' + line);
                    }
                }
                catch (e_12_1) { e_12 = { error: e_12_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_12) throw e_12.error; }
                }
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_11) throw e_11.error; }
        }
    };
    CHTMLmtable.prototype.handleEqualRows = function () {
        if (!this.node.attributes.get('equalrows'))
            return;
        var space = this.getRowHalfSpacing();
        var _a = this.getTableData(), H = _a.H, D = _a.D, NH = _a.NH, ND = _a.ND;
        var HD = this.getEqualRowHeight();
        var HDem = this.em(HD);
        for (var i = 0; i < this.numRows; i++) {
            var row = this.childNodes[i];
            if (HD !== NH[i] + ND[i]) {
                this.setRowHeight(row, HD, (HD - H[i] + D[i]) / 2, space[i] + space[i + 1]);
            }
        }
    };
    CHTMLmtable.prototype.setRowHeight = function (row, HD, D, space) {
        var e_13, _a;
        this.adaptor.setStyle(row.chtml, 'height', this.em(HD + space));
        var ralign = row.node.attributes.get('rowalign');
        try {
            for (var _b = __values(row.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var cell = _c.value;
                if (this.setCellBaseline(cell, ralign, HD, D))
                    break;
            }
        }
        catch (e_13_1) { e_13 = { error: e_13_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_13) throw e_13.error; }
        }
    };
    CHTMLmtable.prototype.setCellBaseline = function (cell, ralign, HD, D) {
        var calign = cell.node.attributes.get('rowalign');
        if (calign === 'baseline' || calign === 'axis') {
            var adaptor = this.adaptor;
            var child = adaptor.lastChild(cell.chtml);
            adaptor.setStyle(child, 'height', this.em(HD));
            adaptor.setStyle(child, 'verticalAlign', this.em(-D));
            var row = cell.parent;
            if ((!row.node.isKind('mlabeledtr') || cell !== row.childNodes[0]) &&
                (ralign === 'baseline' || ralign === 'axis')) {
                return true;
            }
        }
        return false;
    };
    CHTMLmtable.prototype.handleFrame = function () {
        if (this.frame) {
            this.adaptor.setStyle(this.adaptor.firstChild(this.chtml), 'border', '.07em ' + this.node.attributes.get('frame'));
        }
    };
    CHTMLmtable.prototype.handleWidth = function () {
        var w = this.node.attributes.get('width');
        var hasLabels = (this.adaptor.childNodes(this.labels).length > 0);
        if (!(string_js_1.isPercent(w) || hasLabels)) {
            if (w === 'auto')
                return;
            w = this.em(this.length2em(w) + 2 * this.fLine);
        }
        var table = this.adaptor.firstChild(this.chtml);
        this.adaptor.setStyle(table, 'minWidth', w);
    };
    CHTMLmtable.prototype.handleAlign = function () {
        var _a = __read(this.getAlignmentRow(), 2), align = _a[0], row = _a[1];
        if (row === null) {
            if (align !== 'axis') {
                this.adaptor.setAttribute(this.chtml, 'align', align);
            }
        }
        else {
            var y = this.getVerticalPosition(row, align);
            this.adaptor.setAttribute(this.chtml, 'align', 'top');
            this.adaptor.setStyle(this.chtml, 'verticalAlign', this.em(y));
        }
    };
    CHTMLmtable.prototype.handleJustify = function () {
        var _a = __read(this.getAlignShift(), 2), align = _a[0], shift = _a[1];
        if (align !== 'center') {
            this.adaptor.setAttribute(this.chtml, 'justify', align);
        }
    };
    CHTMLmtable.prototype.handleLabels = function () {
        var labels = this.labels;
        var attributes = this.node.attributes;
        var adaptor = this.adaptor;
        if (adaptor.childNodes(labels).length === 0)
            return;
        var side = attributes.get('side');
        adaptor.setAttribute(this.chtml, 'side', side);
        adaptor.setAttribute(labels, 'align', side);
        adaptor.setStyle(labels, side, '0');
        var L = this.getTableData().L;
        var sep = this.length2em(attributes.get('minlabelspacing'));
        var pad = L + sep;
        var _a = __read((this.styles == null ? ['', ''] :
            [this.styles.get('padding-left'), this.styles.get('padding-right')]), 2), lpad = _a[0], rpad = _a[1];
        if (lpad || rpad) {
            pad = Math.max(pad, this.length2em(lpad || '0'), this.length2em(rpad || '0'));
        }
        adaptor.setStyle(this.chtml, 'padding', '0 ' + this.em(pad));
        var _b = __read(this.getAlignShift(), 2), align = _b[0], shift = _b[1];
        if (align === side) {
            shift = (side === 'left' ? Math.max(pad, shift) - pad : Math.min(-pad, shift) + pad);
        }
        if (shift) {
            var table = adaptor.firstChild(this.chtml);
            this.setIndent(table, align, shift);
        }
        this.updateRowHeights();
        this.addLabelSpacing();
        adaptor.append(this.chtml, labels);
    };
    CHTMLmtable.prototype.updateRowHeights = function () {
        if (this.node.attributes.get('equalrows'))
            return;
        var _a = this.getTableData(), H = _a.H, D = _a.D, NH = _a.NH, ND = _a.ND;
        var space = this.getRowHalfSpacing();
        for (var i = 0; i < this.numRows; i++) {
            var row = this.childNodes[i];
            if (H[i] !== NH[i] || D[i] !== ND[i]) {
                this.setRowHeight(row, H[i] + D[i], D[i], space[i] + space[i + 1]);
            }
            else if (row.node.isKind('mlabeledtr')) {
                this.setCellBaseline(row.childNodes[0], '', H[i] + D[i], D[i]);
            }
        }
    };
    CHTMLmtable.prototype.addLabelSpacing = function () {
        var adaptor = this.adaptor;
        var equal = this.node.attributes.get('equalrows');
        var _a = this.getTableData(), H = _a.H, D = _a.D;
        var HD = (equal ? this.getEqualRowHeight() : 0);
        var space = this.getRowHalfSpacing();
        var h = this.fLine;
        var current = adaptor.firstChild(this.labels);
        for (var i = 0; i < this.numRows; i++) {
            var row = this.childNodes[i];
            if (row.node.isKind('mlabeledtr')) {
                h && adaptor.insert(this.html('mjx-mtr', { style: { height: this.em(h) } }), current);
                adaptor.setStyle(current, 'height', this.em((equal ? HD : H[i] + D[i]) + space[i] + space[i + 1]));
                current = adaptor.next(current);
                h = this.rLines[i];
            }
            else {
                h += space[i] + (equal ? HD : H[i] + D[i]) + space[i + 1] + this.rLines[i];
            }
        }
    };
    CHTMLmtable.kind = mtable_js_2.MmlMtable.prototype.kind;
    CHTMLmtable.styles = {
        'mjx-mtable': {
            'vertical-align': '.25em',
            'text-align': 'center',
            'position': 'relative',
            'box-sizing': 'border-box'
        },
        'mjx-mtable > mjx-itable': {
            'vertical-align': 'middle',
            'text-align': 'left',
            'box-sizing': 'border-box'
        },
        'mjx-labels': {
            display: 'inline-table',
            position: 'absolute',
            top: 0
        },
        'mjx-mtable[justify="left"][side="left"]': {
            'text-align': 'left',
            'padding-right': '0 ! important'
        },
        'mjx-mtable[justify="left"][side="right"]': {
            'text-align': 'left',
            'padding-left': '0 ! important'
        },
        'mjx-mtable[justify="right"][side="left"]': {
            'text-align': 'right',
            'padding-right': '0 ! important'
        },
        'mjx-mtable[justify="right"][side="right"]': {
            'text-align': 'right',
            'padding-left': '0 ! important'
        },
        'mjx-mtable[align]': {
            'vertical-align': 'baseline'
        },
        'mjx-mtable[align="top"] > mjx-itable': {
            'vertical-align': 'top'
        },
        'mjx-mtable[align="bottom"] > mjx-itable': {
            'vertical-align': 'bottom'
        },
        'mjx-mtable[align="center"] > mjx-itable': {
            'vertical-align': 'middle'
        },
        'mjx-mtable[align="baseline"] > mjx-itable': {
            'vertical-align': 'middle'
        }
    };
    return CHTMLmtable;
}(mtable_js_1.CommonMtableMixin(Wrapper_js_1.CHTMLWrapper)));
exports.CHTMLmtable = CHTMLmtable;
//# sourceMappingURL=mtable.js.map