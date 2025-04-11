"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClickhouseOrm = exports.ClickhouseOrmModel = exports.ClickHouseORM = exports.DATA_TYPE = exports.setLogService = void 0;
const clickhouse_1 = require("clickhouse");
const orm_1 = require("./orm");
const log_1 = require("./log");
var log_2 = require("./log"); // Singleton Pattern
Object.defineProperty(exports, "setLogService", { enumerable: true, get: function () { return log_2.setLogService; } });
var dataType_1 = require("./dataType");
Object.defineProperty(exports, "DATA_TYPE", { enumerable: true, get: function () { return dataType_1.DATA_TYPE; } });
__exportStar(require("./orm"), exports);
var orm_2 = require("./orm");
Object.defineProperty(exports, "ClickHouseORM", { enumerable: true, get: function () { return orm_2.default; } });
var model_1 = require("./model");
Object.defineProperty(exports, "ClickhouseOrmModel", { enumerable: true, get: function () { return model_1.default; } });
const ClickhouseOrm = ({ client, db, debug = false }) => {
    if (!db) {
        (0, log_1.ErrorLog)("db is undefined. It should be object that include required name and optional engine");
        return;
    }
    if (!db.name) {
        (0, log_1.ErrorLog)("db.name is undefined. db is object and db.name should be string");
        return;
    }
    /**
     * new ClickHouse
     */
    return new orm_1.default({ client: new clickhouse_1.ClickHouse(client), db, debug });
};
exports.ClickhouseOrm = ClickhouseOrm;
