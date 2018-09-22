"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mutator_1 = require("./Mutator");
Mutator_1.Mutator.prototype.sort = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var _a = this._getMutated(), newObj = _a.newObj, target = _a.target;
    target[this.accessors[this.accessors.length - 1]] = target[this.accessors[this.accessors.length - 1]].slice();
    this.current = newObj;
    return target.sort.apply(target, args);
};
