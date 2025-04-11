"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorLog = exports.DebugLog = exports.Log = exports.setLogService = void 0;
const colors = require("colors/safe");
const constants_1 = require("./constants");
let LogService = console.log;
const setLogService = (logService) => {
    LogService = logService;
};
exports.setLogService = setLogService;
const Log = (desc) => {
    LogService(`${colors.green(`>> ${constants_1.CLICKHOUSE_ORM_LOG}`)} ${colors.yellow(desc)} \n`);
};
exports.Log = Log;
const DebugLog = (desc) => {
    LogService(`${colors.green(`>> ${constants_1.CLICKHOUSE_ORM_DEBUG}`)} ${colors.gray(desc)} \n`);
};
exports.DebugLog = DebugLog;
const ErrorLog = (desc) => {
    LogService(`${colors.red(`>> ${constants_1.CLICKHOUSE_ORM_ERROR}`)} ${colors.red(desc)} \n`);
};
exports.ErrorLog = ErrorLog;
