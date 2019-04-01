"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sum(A) {
    return A.reduce(function (a, b) { return a + b; }, 0);
}
exports.sum = sum;
function max(A) {
    return A.reduce(function (a, b) { return Math.max(a, b); }, 0);
}
exports.max = max;
//# sourceMappingURL=numeric.js.map