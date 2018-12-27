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
Object.defineProperty(exports, "__esModule", { value: true });
var Options_js_1 = require("../util/Options.js");
var InputJax_js_1 = require("./InputJax.js");
var OutputJax_js_1 = require("./OutputJax.js");
var MathList_js_1 = require("./MathList.js");
var MathItem_js_1 = require("./MathItem.js");
var MmlFactory_js_1 = require("../core/MmlTree/MmlFactory.js");
var DefaultInputJax = (function (_super) {
    __extends(DefaultInputJax, _super);
    function DefaultInputJax() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultInputJax.prototype.compile = function (math) {
        return null;
    };
    return DefaultInputJax;
}(InputJax_js_1.AbstractInputJax));
var DefaultOutputJax = (function (_super) {
    __extends(DefaultOutputJax, _super);
    function DefaultOutputJax() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultOutputJax.prototype.typeset = function (math, document) {
        if (document === void 0) { document = null; }
        return null;
    };
    DefaultOutputJax.prototype.escaped = function (math, document) {
        return null;
    };
    return DefaultOutputJax;
}(OutputJax_js_1.AbstractOutputJax));
var DefaultMathList = (function (_super) {
    __extends(DefaultMathList, _super);
    function DefaultMathList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DefaultMathList;
}(MathList_js_1.AbstractMathList));
var errorFactory = new MmlFactory_js_1.MmlFactory();
var AbstractMathDocument = (function () {
    function AbstractMathDocument(document, adaptor, options) {
        var CLASS = this.constructor;
        this.document = document;
        this.options = Options_js_1.userOptions(Options_js_1.defaultOptions({}, CLASS.OPTIONS), options);
        this.math = new (this.options['MathList'] || DefaultMathList)();
        this.processed = {
            findMath: false,
            compile: false,
            typeset: false,
            getMetrics: false,
            updateDocument: false
        };
        this.outputJax = this.options['OutputJax'] || new DefaultOutputJax();
        var inputJax = this.options['InputJax'] || [new DefaultInputJax()];
        if (!Array.isArray(inputJax)) {
            inputJax = [inputJax];
        }
        this.inputJax = inputJax;
        this.adaptor = adaptor;
        this.outputJax.setAdaptor(adaptor);
        this.inputJax.map(function (jax) { return jax.setAdaptor(adaptor); });
    }
    Object.defineProperty(AbstractMathDocument.prototype, "kind", {
        get: function () {
            return this.constructor.KIND;
        },
        enumerable: true,
        configurable: true
    });
    AbstractMathDocument.prototype.findMath = function (options) {
        if (options === void 0) { options = null; }
        this.processed.findMath = true;
        return this;
    };
    AbstractMathDocument.prototype.compile = function () {
        var e_1, _a;
        if (!this.processed.compile) {
            try {
                for (var _b = __values(this.math), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var math = _c.value;
                    try {
                        math.compile(this);
                    }
                    catch (err) {
                        if (err.retry || err.restart) {
                            throw err;
                        }
                        this.options['compileError'](this, math, err);
                        math.inputData['error'] = err;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.processed.compile = true;
        }
        return this;
    };
    AbstractMathDocument.prototype.compileError = function (math, err) {
        math.root = errorFactory.create('math', { 'data-mjx-error': err.message }, [
            errorFactory.create('merror', null, [
                errorFactory.create('mtext', null, [
                    errorFactory.create('text').setText('Math input error')
                ])
            ])
        ]);
        if (math.display) {
            math.root.attributes.set('display', 'block');
        }
    };
    AbstractMathDocument.prototype.typeset = function () {
        var e_2, _a;
        if (!this.processed.typeset) {
            try {
                for (var _b = __values(this.math), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var math = _c.value;
                    try {
                        math.typeset(this);
                    }
                    catch (err) {
                        if (err.retry || err.restart) {
                            throw err;
                        }
                        this.options['typesetError'](this, math, err);
                        math.outputData['error'] = err;
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
            this.processed.typeset = true;
        }
        return this;
    };
    AbstractMathDocument.prototype.typesetError = function (math, err) {
        math.typesetRoot = this.adaptor.node('span', { 'data-mjx-error': err.message }, [this.adaptor.text('Math output error')]);
    };
    AbstractMathDocument.prototype.getMetrics = function () {
        if (!this.processed.getMetrics) {
            this.outputJax.getMetrics(this);
            this.processed.getMetrics = true;
        }
        return this;
    };
    AbstractMathDocument.prototype.updateDocument = function () {
        var e_3, _a;
        if (!this.processed.updateDocument) {
            try {
                for (var _b = __values(this.math.reversed()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var math = _c.value;
                    math.updateDocument(this);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            this.processed.updateDocument = true;
        }
        return this;
    };
    AbstractMathDocument.prototype.removeFromDocument = function (restore) {
        if (restore === void 0) { restore = false; }
        return this;
    };
    AbstractMathDocument.prototype.state = function (state, restore) {
        if (restore === void 0) { restore = false; }
        var e_4, _a;
        try {
            for (var _b = __values(this.math), _c = _b.next(); !_c.done; _c = _b.next()) {
                var math = _c.value;
                math.state(state, restore);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        if (state < STATE.INSERTED) {
            this.processed.updateDocument = false;
        }
        if (state < STATE.TYPESET) {
            this.processed.typeset = false;
            this.processed.getMetrics = false;
        }
        if (state < STATE.COMPILED) {
            this.processed.compile = false;
        }
        return this;
    };
    AbstractMathDocument.prototype.reset = function () {
        var e_5, _a;
        try {
            for (var _b = __values(Object.keys(this.processed)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                this.processed[key] = false;
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return this;
    };
    AbstractMathDocument.prototype.clear = function () {
        this.reset();
        this.math.clear();
        return this;
    };
    AbstractMathDocument.prototype.concat = function (list) {
        this.math.merge(list);
        return this;
    };
    AbstractMathDocument.KIND = 'MathDocument';
    AbstractMathDocument.OPTIONS = {
        OutputJax: null,
        InputJax: null,
        MathList: DefaultMathList,
        compileError: function (doc, math, err) {
            doc.compileError(math, err);
        },
        typesetError: function (doc, math, err) {
            doc.typesetError(math, err);
        }
    };
    AbstractMathDocument.STATE = MathItem_js_1.AbstractMathItem.STATE;
    return AbstractMathDocument;
}());
exports.AbstractMathDocument = AbstractMathDocument;
var STATE = AbstractMathDocument.STATE;
//# sourceMappingURL=MathDocument.js.map