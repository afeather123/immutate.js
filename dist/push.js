"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mutator_1 = require("./Mutator");
Mutator_1.Mutator.prototype.push = function (value) {
    var _a = this._getMutated(), newObj = _a.newObj, target = _a.target;
    target[this.accessors[this.accessors.length - 1]] = target[this.accessors[this.accessors.length - 1]].slice();
    target[this.accessors[this.accessors.length - 1]].push(value);
    this.current = newObj;
    return value;
};
