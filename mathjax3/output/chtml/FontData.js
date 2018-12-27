"use strict";
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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var FontData_js_1 = require("../common/FontData.js");
__export(require("../common/FontData.js"));
function AddCSS(font, css, options) {
    var e_1, _a, e_2, _b;
    try {
        for (var _c = __values(Object.keys(css)), _d = _c.next(); !_d.done; _d = _c.next()) {
            var c = _d.value;
            var n = parseInt(c);
            FontData_js_1.FontData.charOptions(font, n).css = css[n];
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    try {
        for (var _e = __values(Object.keys(options)), _f = _e.next(); !_f.done; _f = _e.next()) {
            var c = _f.value;
            var n = parseInt(c);
            Object.assign(FontData_js_1.FontData.charOptions(font, n), options[n]);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return font;
}
exports.AddCSS = AddCSS;
//# sourceMappingURL=FontData.js.map