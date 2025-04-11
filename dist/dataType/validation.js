"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataTypeValidation = void 0;
// Validate Data Type when INSERT INTO
exports.dataTypeValidation = {
    UInt8: "number",
    UInt16: "number",
    UInt32: "number",
    UInt64: "number",
    Int8: "number",
    Int16: "number",
    Int32: "number",
    Int64: "number",
    Float32: "number",
    Float64: "number",
    Boolean: "boolean",
    String: "string",
    UUID: "string",
    Date: "date|string|number",
    Date32: "date|string|number",
    DateTime: "date|string|number",
    DateTime64: "date|string|number",
    Enum8: 'string',
    Enum16: 'string',
    FixedString(value, N) {
        if (value.length > N)
            return false;
        return true;
    },
};
