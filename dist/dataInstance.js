"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transformer_1 = require("./transformer");
const log_1 = require("./log");
const utils_1 = require("./utils");
class DataInstance {
    constructor(model, initData) {
        this.model = model;
        this.proxyApply();
        initData && (0, utils_1.isObject)(initData) && this.setInitData(initData);
    }
    setInitData(initData) {
        Object.keys(initData).forEach((column) => {
            if (this.checkColumnExist(column))
                this[column] = initData[column];
        });
    }
    checkColumnExist(column) {
        if (this.model.schemaInstance.columns.indexOf(column) === -1) {
            (0, log_1.ErrorLog)(`'${column}' is not a column of '${this.model.dbTableName}'. It should include ${this.model.schemaInstance.columns.join("、")}`);
            return false;
        }
        return true;
    }
    proxyApply() {
        const schemaInstance = this.model.schemaInstance;
        schemaInstance.columns.forEach((column) => {
            schemaInstance.proxyAttr(schemaInstance.schemaConfig, this, column);
        });
    }
    save() {
        const schemaInstance = this.model.schemaInstance;
        const data = (0, transformer_1.getPureData)(schemaInstance, this);
        const insertHeaders = (0, transformer_1.insertSQL)(this.model.dbTableName, schemaInstance);
        if (this.model.debug)
            (0, log_1.DebugLog)(`execute save> ${insertHeaders} ${JSON.stringify([data])}`);
        return this.model.client
            .insert(insertHeaders, [data])
            .toPromise();
    }
}
exports.default = DataInstance;
