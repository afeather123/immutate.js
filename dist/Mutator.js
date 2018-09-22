"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fmap_1 = __importDefault(require("./helpers/fmap"));
var shallowCopy_1 = __importDefault(require("./helpers/shallowCopy"));
var Mutator = /** @class */ (function () {
    function Mutator(inital) {
        this.inital = inital;
        this.accessors = [];
        this.current = inital;
    }
    Mutator.prototype.a = function (accessorString) {
        return this.access(accessorString);
    };
    Mutator.prototype.access = function (accessorString) {
        var unbracketed = fmap_1.default(accessorString.split('['), function (ele) {
            var split = ele.split(']');
            if (split.length > 1) {
                var inBrackets = split[0];
                if (!isNaN(inBrackets))
                    split[0] = Number(inBrackets);
                else
                    split[0] = [split[0]];
            }
            return split;
        });
        this.accessors = fmap_1.default(unbracketed, function (ele) {
            switch (typeof ele) {
                case 'string':
                    var split = ele.split('.');
                    if (split[0] === '')
                        split.shift();
                    return split;
                case 'object':
                    return ele;
                case 'number':
                    return [ele];
            }
        });
        return this;
    };
    Mutator.prototype.set = function (value) {
        var _a = this._getMutated(), newObj = _a.newObj, target = _a.target;
        target[this.accessors[this.accessors.length - 1]] = value;
        this.current = newObj;
        return value;
    };
    Mutator.prototype.get = function () {
        var target = this.current;
        for (var i = 0; i < this.accessors.length - 1; i++) {
            var key = this.accessors[i];
            if (typeof target !== 'object')
                throw new Error("Cannot access property " + key + " of " + target);
            target = target[key];
        }
        return target[this.accessors[this.accessors.length - 1]];
    };
    Mutator.prototype._getMutated = function () {
        var target = shallowCopy_1.default(this.current);
        var newObj = target;
        for (var i = 0; i < this.accessors.length - 1; i++) {
            var key = this.accessors[i];
            if (typeof target !== 'object')
                throw new Error("Cannot access property " + key + " of " + target);
            target[key] = shallowCopy_1.default(target[key]);
            target = target[key];
        }
        return { newObj: newObj, target: target };
    };
    return Mutator;
}());
exports.Mutator = Mutator;
