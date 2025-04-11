"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATA_TYPE = void 0;
const validation_1 = require("./validation");
// Data Type
exports.DATA_TYPE = {
    UInt8: {
        validation: validation_1.dataTypeValidation.UInt8,
        columnType: "UInt8",
    },
    UInt16: {
        validation: validation_1.dataTypeValidation.UInt16,
        columnType: "UInt16",
    },
    UInt32: {
        validation: validation_1.dataTypeValidation.UInt32,
        columnType: "UInt32",
    },
    UInt64: {
        validation: validation_1.dataTypeValidation.UInt64,
        columnType: "UInt64",
    },
    Int8: {
        validation: validation_1.dataTypeValidation.Int8,
        columnType: "Int8",
    },
    Int16: {
        validation: validation_1.dataTypeValidation.Int16,
        columnType: "Int16",
    },
    Int32: {
        validation: validation_1.dataTypeValidation.Int32,
        columnType: "Int32",
    },
    Int64: {
        validation: validation_1.dataTypeValidation.Int64,
        columnType: "Int64",
    },
    Float32: {
        validation: validation_1.dataTypeValidation.Float32,
        columnType: "Float32",
    },
    Float64: {
        validation: validation_1.dataTypeValidation.Float64,
        columnType: "Float64",
    },
    Boolean: {
        validation: validation_1.dataTypeValidation.Boolean,
        columnType: "Boolean",
    },
    String: {
        validation: validation_1.dataTypeValidation.String,
        columnType: "String",
    },
    UUID: {
        validation: validation_1.dataTypeValidation.UUID,
        columnType: "UUID",
    },
    Date: {
        validation: validation_1.dataTypeValidation.Date,
        columnType: "Date",
    },
    Date32: {
        validation: validation_1.dataTypeValidation.Date32,
        columnType: "Date32",
    },
    DateTime: {
        validation: validation_1.dataTypeValidation.DateTime,
        columnType: "DateTime",
    },
    DateTime64: {
        validation: validation_1.dataTypeValidation.DateTime64,
        columnType: "DateTime64",
    },
    FixedString: (N) => {
        return {
            validation: (value) => validation_1.dataTypeValidation.FixedString(value, N),
            columnType: `FixedString(${N})`,
        };
    },
    LowCardinality: (type) => {
        return {
            validation: type.validation,
            columnType: `LowCardinality(${type.columnType})`,
        };
    },
    Enum8: (enums) => {
        return {
            validation: validation_1.dataTypeValidation.Enum8,
            columnType: `Enum8(${enums})`,
        };
    },
    Enum16: (enums) => {
        return {
            validation: validation_1.dataTypeValidation.Enum16,
            columnType: `Enum16(${enums})`,
        };
    },
    Other: (columnType) => {
        return {
            columnType: columnType,
        };
    },
};
