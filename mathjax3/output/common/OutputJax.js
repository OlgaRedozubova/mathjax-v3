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
Object.defineProperty(exports, "__esModule", { value: true });
var OutputJax_js_1 = require("../../core/OutputJax.js");
var Options_js_1 = require("../../util/Options.js");
var CssStyles_js_1 = require("./CssStyles.js");
var lengths_js_1 = require("../../util/lengths.js");
var CommonOutputJax = (function (_super) {
    __extends(CommonOutputJax, _super);
    function CommonOutputJax(options, defaultFactory, defaultFont) {
        if (options === void 0) { options = null; }
        if (defaultFactory === void 0) { defaultFactory = null; }
        if (defaultFont === void 0) { defaultFont = null; }
        var _this = this;
        var _a = __read(Options_js_1.separateOptions(options, defaultFont.OPTIONS), 2), jaxOptions = _a[0], fontOptions = _a[1];
        _this = _super.call(this, jaxOptions) || this;
        _this.factory = _this.options.wrapperFactory ||
            new defaultFactory();
        _this.factory.jax = _this;
        _this.cssStyles = _this.options.cssStyles || new CssStyles_js_1.CssStyles();
        _this.font = _this.options.font || new defaultFont(fontOptions);
        return _this;
    }
    CommonOutputJax.prototype.typeset = function (math, html) {
        this.setDocument(html);
        var node = this.createNode();
        this.toDOM(math, node, html);
        return node;
    };
    CommonOutputJax.prototype.createNode = function () {
        var jax = this.constructor.NAME;
        return this.html('mjx-container', { 'class': 'MathJax', jax: jax });
    };
    CommonOutputJax.prototype.setScale = function (node) {
        var scale = this.math.metrics.scale * this.options.scale;
        if (scale !== 1) {
            this.adaptor.setStyle(node, 'fontSize', lengths_js_1.percent(scale));
        }
    };
    CommonOutputJax.prototype.toDOM = function (math, node, html) {
        if (html === void 0) { html = null; }
        this.setDocument(html);
        this.math = math;
        math.root.setTeXclass(null);
        this.setScale(node);
        this.nodeMap = new Map();
        try {
            this.processMath(math.root, node);
        }
        catch (e) {
            console.log(e.stack);
            throw e;
        }
        this.nodeMap = null;
        this.executeFilters(this.postFilters, math, node);
    };
    CommonOutputJax.prototype.getBBox = function (math, html) {
        this.setDocument(html);
        this.math = math;
        math.root.setTeXclass(null);
        this.nodeMap = new Map();
        var bbox = this.factory.wrap(math.root).getBBox();
        this.nodeMap = null;
        return bbox;
    };
    CommonOutputJax.prototype.getMetrics = function (html) {
        var e_1, _a;
        this.setDocument(html);
        var adaptor = this.adaptor;
        var map = this.getMetricMap(html);
        try {
            for (var _b = __values(html.math), _c = _b.next(); !_c.done; _c = _b.next()) {
                var math = _c.value;
                var parent_1 = adaptor.parent(math.start.node);
                var _d = map.get(parent_1), em = _d.em, ex = _d.ex, containerWidth = _d.containerWidth, lineWidth = _d.lineWidth, scale = _d.scale;
                math.setMetrics(em, ex, containerWidth, lineWidth, scale);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    CommonOutputJax.prototype.getMetricMap = function (html) {
        var e_2, _a, e_3, _b, e_4, _c;
        var adaptor = this.adaptor;
        var domMap = new Map();
        try {
            for (var _d = __values(html.math), _e = _d.next(); !_e.done; _e = _d.next()) {
                var math = _e.value;
                var parent_2 = adaptor.parent(math.start.node);
                if (!domMap.has(parent_2)) {
                    domMap.set(parent_2, this.getTestElement(parent_2));
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var map = new Map();
        try {
            for (var _f = __values(domMap.keys()), _g = _f.next(); !_g.done; _g = _f.next()) {
                var node = _g.value;
                map.set(node, this.measureMetrics(domMap.get(node)));
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
            }
            finally { if (e_3) throw e_3.error; }
        }
        try {
            for (var _h = __values(domMap.values()), _j = _h.next(); !_j.done; _j = _h.next()) {
                var node = _j.value;
                adaptor.remove(node);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return map;
    };
    CommonOutputJax.prototype.getTestElement = function (node) {
        var adaptor = this.adaptor;
        if (!this.testNodes) {
            this.testNodes = this.html('mjx-test', { style: {
                    display: 'inline-block',
                    'font-style': 'normal',
                    'font-weight': 'normal',
                    'font-size': '100%',
                    'font-size-adjust': 'none',
                    'text-indent': 0,
                    'text-transform': 'none',
                    'letter-spacing': 'normal',
                    'word-spacing': 'normal',
                    overflow: 'hidden',
                    height: '1px'
                } }, [
                this.html('mjx-ex-box', { style: {
                        position: 'absolute',
                        overflow: 'hidden',
                        width: '1px', height: '60ex'
                    } })
            ]);
        }
        return adaptor.append(node, adaptor.clone(this.testNodes));
    };
    CommonOutputJax.prototype.measureMetrics = function (node) {
        var adaptor = this.adaptor;
        var em = adaptor.fontSize(node);
        var ex = (adaptor.nodeSize(adaptor.firstChild(node))[1] / 60) || (em * this.options.exFactor);
        var containerWidth = 80 * em;
        var scale = ex / this.font.params.x_height / em;
        var lineWidth = 1000000;
        return { em: em, ex: ex, containerWidth: containerWidth, lineWidth: lineWidth, scale: scale };
    };
    CommonOutputJax.prototype.styleSheet = function (html) {
        var e_5, _a;
        this.setDocument(html);
        try {
            for (var _b = __values(this.factory.getKinds()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var kind = _c.value;
                this.addClassStyles(this.factory.getNodeClass(kind));
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
        this.cssStyles.addStyles(this.font.styles);
        var sheet = this.html('style', { id: 'MJX-styles' }, [this.text('\n' + this.cssStyles.cssText + '\n')]);
        return sheet;
    };
    CommonOutputJax.prototype.addClassStyles = function (CLASS) {
        this.cssStyles.addStyles(CLASS.styles);
    };
    CommonOutputJax.prototype.setDocument = function (html) {
        if (html) {
            this.document = html;
            this.adaptor.document = html.document;
        }
    };
    CommonOutputJax.prototype.html = function (type, def, content, ns) {
        if (def === void 0) { def = {}; }
        if (content === void 0) { content = []; }
        return this.adaptor.node(type, def, content, ns);
    };
    CommonOutputJax.prototype.text = function (text) {
        return this.adaptor.text(text);
    };
    CommonOutputJax.NAME = 'Common';
    CommonOutputJax.OPTIONS = __assign({}, OutputJax_js_1.AbstractOutputJax.OPTIONS, { scale: 1, mathmlSpacing: false, skipAttributes: {}, exFactor: .5, wrapperFactory: null, font: null, cssStyles: null });
    return CommonOutputJax;
}(OutputJax_js_1.AbstractOutputJax));
exports.CommonOutputJax = CommonOutputJax;
//# sourceMappingURL=OutputJax.js.map