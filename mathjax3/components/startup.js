"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
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
var global_js_1 = require("./global.js");
var PrioritizedList_js_1 = require("../util/PrioritizedList.js");
;
var Startup;
(function (Startup) {
    var extensions = [];
    var typesetCalls = new PrioritizedList_js_1.PrioritizedList();
    var convertCalls = new PrioritizedList_js_1.PrioritizedList();
    var visitor;
    var mathjax;
    Startup.constructors = {};
    Startup.input = [];
    Startup.output = null;
    Startup.handler = null;
    Startup.adaptor = null;
    Startup.elements = null;
    Startup.document = null;
    Startup.promise = null;
    Startup.pagePromise = new Promise(function (resolve, reject) {
        var doc = global.document;
        if (!doc || !doc.readyState || doc.readyState === 'complete' || doc.readyState === 'interactive') {
            resolve();
        }
        else {
            var listener = function () { return resolve(); };
            doc.defaultView.addEventListener('load', listener, true);
            doc.defaultView.addEventListener('DOMContentLoaded', listener, true);
        }
    });
    function toMML(node) {
        return visitor.visitTree(node, Startup.document);
    }
    Startup.toMML = toMML;
    ;
    function registerConstructor(name, constructor) {
        Startup.constructors[name] = constructor;
    }
    Startup.registerConstructor = registerConstructor;
    ;
    function useHandler(name, force) {
        if (force === void 0) { force = false; }
        if (!exports.CONFIG.handler || force) {
            exports.CONFIG.handler = name;
        }
    }
    Startup.useHandler = useHandler;
    ;
    function useAdaptor(name, force) {
        if (force === void 0) { force = false; }
        if (!exports.CONFIG.adaptor || force) {
            exports.CONFIG.adaptor = name;
        }
    }
    Startup.useAdaptor = useAdaptor;
    ;
    function useInput(name, force) {
        if (force === void 0) { force = false; }
        if (!inputSpecified || force) {
            exports.CONFIG.input.push(name);
        }
    }
    Startup.useInput = useInput;
    ;
    function useOutput(name, force) {
        if (force === void 0) { force = false; }
        if (!exports.CONFIG.output || force) {
            exports.CONFIG.output = name;
        }
    }
    Startup.useOutput = useOutput;
    ;
    function extendHandler(extend) {
        extensions.push(extend);
    }
    Startup.extendHandler = extendHandler;
    ;
    function typesetCall(fn, priority) {
        if (typeof fn === 'string') {
            typesetCalls.add(function (doc) { return doc[fn](); }, priority);
        }
        else {
            typesetCalls.add(fn, priority);
        }
    }
    Startup.typesetCall = typesetCall;
    ;
    function clearTypesetCalls() {
        typesetCalls = new PrioritizedList_js_1.PrioritizedList();
    }
    Startup.clearTypesetCalls = clearTypesetCalls;
    ;
    function convertCall(fn, priority) {
        if (typeof fn === 'string') {
            convertCalls.add(function (math, doc) { return math[fn](doc); }, priority);
        }
        else {
            convertCalls.add(fn, priority);
        }
    }
    Startup.convertCall = convertCall;
    ;
    function clearConvertCalls() {
        convertCalls = new PrioritizedList_js_1.PrioritizedList();
    }
    Startup.clearConvertCalls = clearConvertCalls;
    function defaultReady() {
        getComponents();
        makeMethods();
        if (exports.CONFIG.typeset && exports.MathJax.TypesetPromise) {
            Startup.promise = Startup.pagePromise.then(function () { return exports.MathJax.TypesetPromise(); });
        }
    }
    Startup.defaultReady = defaultReady;
    ;
    function getComponents() {
        visitor = new exports.MathJax._.core.MmlTree.SerializedMmlVisitor.SerializedMmlVisitor();
        mathjax = exports.MathJax._.mathjax.MathJax;
        Startup.input = getInputJax();
        Startup.output = getOutputJax();
        Startup.adaptor = getAdaptor();
        Startup.handler = getHandler();
    }
    Startup.getComponents = getComponents;
    ;
    function makeMethods() {
        if (!Startup.handler)
            return;
        mathjax.handlers.register(Startup.handler);
        Startup.document = mathjax.document(exports.CONFIG.document, __assign({}, exports.MathJax.config.options, { InputJax: Startup.input, OutputJax: Startup.output }));
        if (Startup.input && Startup.output) {
            makeTypesetMethods();
        }
        var oname = (Startup.output ? Startup.output.constructor.NAME.toLowerCase() : '');
        try {
            for (var input_1 = __values(Startup.input), input_1_1 = input_1.next(); !input_1_1.done; input_1_1 = input_1.next()) {
                var jax = input_1_1.value;
                var iname = jax.constructor.NAME.toLowerCase();
                makeMmlMethods(iname, jax);
                makeResetMethod(iname, jax);
                if (Startup.output) {
                    makeOutputMethods(iname, oname, jax);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (input_1_1 && !input_1_1.done && (_a = input_1.return)) _a.call(input_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _a;
    }
    Startup.makeMethods = makeMethods;
    ;
    function makeTypesetMethods() {
        exports.MathJax.Typeset = function (which) {
            if (which === void 0) { which = null; }
            Startup.elements = which;
            try {
                for (var typesetCalls_1 = __values(typesetCalls), typesetCalls_1_1 = typesetCalls_1.next(); !typesetCalls_1_1.done; typesetCalls_1_1 = typesetCalls_1.next()) {
                    var fn = typesetCalls_1_1.value;
                    fn.item(Startup.document);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (typesetCalls_1_1 && !typesetCalls_1_1.done && (_a = typesetCalls_1.return)) _a.call(typesetCalls_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            var e_2, _a;
        };
        exports.MathJax.TypesetPromise = function (which) {
            if (which === void 0) { which = null; }
            Startup.elements = which;
            return mathjax.handleRetriesFor(function () {
                try {
                    for (var typesetCalls_2 = __values(typesetCalls), typesetCalls_2_1 = typesetCalls_2.next(); !typesetCalls_2_1.done; typesetCalls_2_1 = typesetCalls_2.next()) {
                        var fn = typesetCalls_2_1.value;
                        fn.item(Startup.document);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (typesetCalls_2_1 && !typesetCalls_2_1.done && (_a = typesetCalls_2.return)) _a.call(typesetCalls_2);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                var e_3, _a;
            });
        };
        exports.MathJax.Clear = function () { return Startup.document.clear(); };
    }
    Startup.makeTypesetMethods = makeTypesetMethods;
    ;
    function makeOutputMethods(iname, oname, input) {
        var name = iname + '2' + oname;
        exports.MathJax[name] =
            function (math, display, em, ex, cwidth) {
                if (display === void 0) { display = true; }
                if (em === void 0) { em = 16; }
                if (ex === void 0) { ex = 8; }
                if (cwidth === void 0) { cwidth = 80 * 16; }
                var mitem = new exports.MathJax._.core.MathItem.AbstractMathItem(math, input, display);
                mitem.setMetrics(em, ex, cwidth, 1000000, 1);
                return convertMath(mitem, Startup.document);
            };
        exports.MathJax[name + 'Promise'] =
            function (math, display, em, ex, cwidth) {
                if (display === void 0) { display = true; }
                if (em === void 0) { em = 16; }
                if (ex === void 0) { ex = 8; }
                if (cwidth === void 0) { cwidth = 80 * 16; }
                var mitem = new exports.MathJax._.core.MathItem.AbstractMathItem(math, input, display);
                mitem.setMetrics(em, ex, cwidth, 1000000, 1);
                return mathjax.handleRetriesFor(function () { return convertMath(mitem, Startup.document); });
            };
        exports.MathJax[oname + 'Stylesheet'] = function () { return Startup.output.styleSheet(Startup.document); };
    }
    Startup.makeOutputMethods = makeOutputMethods;
    ;
    function makeMmlMethods(name, input) {
        exports.MathJax[name + '2mml'] =
            function (math, display, em, ex, cwidth) {
                if (display === void 0) { display = true; }
                if (em === void 0) { em = 16; }
                if (ex === void 0) { ex = 8; }
                if (cwidth === void 0) { cwidth = 80 * 16; }
                var mitem = new exports.MathJax._.core.MathItem.AbstractMathItem(math, input, display);
                mitem.setMetrics(em, ex, cwidth, 1000000, 1);
                return convertMath(mitem, Startup.document, 100);
            };
        exports.MathJax[name + '2mmlPromise'] =
            function (math, display, em, ex, cwidth) {
                if (display === void 0) { display = true; }
                if (em === void 0) { em = 16; }
                if (ex === void 0) { ex = 8; }
                if (cwidth === void 0) { cwidth = 80 * 16; }
                var mitem = new exports.MathJax._.core.MathItem.AbstractMathItem(math, input, display);
                mitem.setMetrics(em, ex, cwidth, 1000000, 1);
                return mathjax.handleRetriesFor(function () { return convertMath(mitem, Startup.document, 100); });
            };
    }
    Startup.makeMmlMethods = makeMmlMethods;
    ;
    function makeResetMethod(name, input) {
        if (name === 'tex') {
            exports.MathJax.texReset = function () { return input.parseOptions.tags.reset(); };
        }
    }
    Startup.makeResetMethod = makeResetMethod;
    ;
    function convertMath(mitem, document, maxPriority) {
        if (maxPriority === void 0) { maxPriority = 0; }
        try {
            for (var convertCalls_1 = __values(convertCalls), convertCalls_1_1 = convertCalls_1.next(); !convertCalls_1_1.done; convertCalls_1_1 = convertCalls_1.next()) {
                var _a = convertCalls_1_1.value, item = _a.item, priority = _a.priority;
                if (maxPriority === 0 || priority < maxPriority) {
                    item(mitem, document);
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (convertCalls_1_1 && !convertCalls_1_1.done && (_b = convertCalls_1.return)) _b.call(convertCalls_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return (maxPriority ? toMML(mitem.root) : mitem.typesetRoot);
        var e_4, _b;
    }
    Startup.convertMath = convertMath;
    ;
    function getInputJax() {
        var jax = [];
        try {
            for (var _a = __values(exports.CONFIG.input), _b = _a.next(); !_b.done; _b = _a.next()) {
                var name_1 = _b.value;
                var inputClass = Startup.constructors[name_1];
                if (inputClass) {
                    jax.push(new inputClass(exports.MathJax.config[name_1]));
                }
                else {
                    throw Error('Input Jax "' + name_1 + '" is not defined (has it been loaded?)');
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return jax;
        var e_5, _c;
    }
    Startup.getInputJax = getInputJax;
    ;
    function getOutputJax() {
        var name = exports.CONFIG.output;
        if (!name)
            return null;
        var outputClass = Startup.constructors[name];
        if (!outputClass) {
            throw Error('Output Jax "' + name + '" is not defined (has it been loaded?)');
        }
        return new outputClass(exports.MathJax.config[name]);
    }
    Startup.getOutputJax = getOutputJax;
    ;
    function getAdaptor() {
        var name = exports.CONFIG.adaptor;
        if (!name || name === 'none')
            return null;
        var adaptor = Startup.constructors[name];
        if (!adaptor) {
            throw Error('DOMAdaptor "' + name + '" is not defined (has it been loaded?)');
        }
        return adaptor(exports.MathJax.config[name]);
    }
    Startup.getAdaptor = getAdaptor;
    ;
    function getHandler() {
        var name = exports.CONFIG.handler;
        if (!name || name === 'none' || !Startup.adaptor)
            return null;
        var handlerClass = Startup.constructors[name];
        if (!handlerClass) {
            throw Error('Handler "' + name + '" is not defined (has it been loaded?)');
        }
        var handler = new handlerClass(Startup.adaptor, 5);
        return extensions.reduce(function (handler, extend) { return extend(handler); }, handler);
    }
    Startup.getHandler = getHandler;
    ;
})(Startup = exports.Startup || (exports.Startup = {}));
;
exports.MathJax = global_js_1.MathJax;
if (typeof exports.MathJax._.startup === 'undefined') {
    global_js_1.combineDefaults(exports.MathJax.config, 'startup', {
        input: [],
        output: '',
        handler: null,
        adaptor: null,
        document: (typeof document === 'undefined' ? '' : document),
        elements: null,
        typeset: true,
        ready: Startup.defaultReady.bind(Startup)
    });
    global_js_1.combineWithMathJax({
        startup: Startup,
        options: {}
    });
    var findMath = function (document) {
        var elements = Startup.elements;
        return document.findMath(elements ? { elements: elements } : {});
    };
    Startup.typesetCall(findMath, 10);
    Startup.typesetCall('compile', 20);
    Startup.typesetCall('getMetrics', 110);
    Startup.typesetCall('typeset', 120);
    Startup.typesetCall('updateDocument', 130);
    Startup.typesetCall('reset', 200);
    Startup.convertCall('compile', 20);
    Startup.convertCall('typeset', 120);
}
exports.CONFIG = exports.MathJax.config.startup;
var inputSpecified = exports.CONFIG.input.length !== 0;
//# sourceMappingURL=startup.js.map