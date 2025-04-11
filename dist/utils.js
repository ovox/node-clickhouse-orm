"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataTypeFilterUnnecessarySpace = exports.isObjectDate = exports.isObject = void 0;
const isObject = (value) => {
    return Object.prototype.toString.apply(value) === "[object Object]";
};
exports.isObject = isObject;
const isObjectDate = (value) => {
    return Object.prototype.toString.apply(value) === "[object Date]";
};
exports.isObjectDate = isObjectDate;
/**
 *
 * @param string
 * @description Eliminate unnecessary spaces in data type strings to ensure accurate comparison
 * `Enum8('enum1' = 1, 'enum2' = 2, 'enum3' = 3)` -> `Enum8('enum1'=1,'enum2'=2,'enum3'=3)`
 * @returns string
 */
const dataTypeFilterUnnecessarySpace = (str) => {
    return str.match(/(\S+)|(\'.+?\')/g).join("");
};
exports.dataTypeFilterUnnecessarySpace = dataTypeFilterUnnecessarySpace;
