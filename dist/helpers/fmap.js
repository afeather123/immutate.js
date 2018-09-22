"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fmap(arr, mapper) {
    return arr.reduce(function (acc, ele) {
        var result = mapper(ele);
        return acc.concat(result);
    }, []);
}
exports.default = fmap;
