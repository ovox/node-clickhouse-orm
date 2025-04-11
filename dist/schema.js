"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const log_1 = require("./log");
const errorThrow = ({ column, newVal, columnType }) => {
    const info = `column[${column}]-value(${newVal}): '${columnType}' type validation failed`;
    (0, log_1.ErrorLog)(info);
    throw new Error(info);
};
class Schema {
    constructor(schemaConfig) {
        this.schemaConfig = schemaConfig;
        this.columns = Object.keys(schemaConfig);
        return this;
    }
    proxyAttr(obj, data, column) {
        let value;
        // set default value
        const defaultVal = obj[column].default;
        if (typeof defaultVal !== "undefined") {
            if (defaultVal === Date.now || defaultVal === Date)
                value = new Date();
            else
                value = defaultVal;
        }
        Object.defineProperty(data, column, {
            enumerable: true,
            get: function () {
                return value;
            },
            set: function (newVal) {
                if (obj[column].type && obj[column].type.validation) {
                    // basic type validation
                    if (typeof obj[column].type.validation === "string") {
                        const validation = obj[column].type.validation;
                        const types = validation.split("|");
                        if (types.length) {
                            const verificationPass = types.filter((type) => {
                                // validate value type
                                switch (type) {
                                    case "boolean":
                                        if (typeof newVal === "boolean")
                                            return true;
                                        break;
                                    case "string":
                                        if (typeof newVal === "string")
                                            return true;
                                        break;
                                    case "number":
                                        if (typeof newVal === "number")
                                            return true;
                                        break;
                                    case "object":
                                        if ((0, utils_1.isObject)(newVal))
                                            return true;
                                        break;
                                    case "date":
                                        if ((0, utils_1.isObjectDate)(newVal))
                                            return true;
                                        break;
                                    case "array":
                                        if (Array.isArray(newVal))
                                            return true;
                                        break;
                                }
                                return false;
                            });
                            if (verificationPass.length === 0) {
                                errorThrow({
                                    column,
                                    newVal,
                                    columnType: obj[column].type.columnType,
                                });
                            }
                        }
                    }
                    // validation function
                    else if (typeof obj[column].type.validation === "function") {
                        const validation = obj[column].type
                            .validation;
                        if (!validation(newVal)) {
                            errorThrow({
                                column,
                                newVal,
                                columnType: obj[column].type.columnType,
                            });
                        }
                    }
                }
                value = newVal;
                return newVal;
            },
        });
    }
}
exports.default = Schema;
