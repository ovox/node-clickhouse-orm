"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteObject2Sql = exports.getDatabaseEngineStr = exports.getClusterStr = exports.object2Sql = exports.insertSQL = exports.getPureData = void 0;
// If database auto set value need to remove column
const DbAutoSetValueDataTypeFilter = [];
/**
 * Get a pure data instead of a model instance
 */
const getPureData = (schemaInstance, dataInstance) => {
    const data = {};
    schemaInstance.columns.forEach((key) => {
        if (DbAutoSetValueDataTypeFilter.includes(schemaInstance.schemaConfig[key].type))
            return;
        data[key] = dataInstance[key] != undefined ? dataInstance[key] : null;
    });
    return data;
};
exports.getPureData = getPureData;
const insertSQL = (tableName, schemaInstance) => {
    const headers = schemaInstance.columns.filter((key) => !DbAutoSetValueDataTypeFilter.includes(schemaInstance.schemaConfig[key].type));
    return `INSERT INTO ${tableName} (${headers.join(",")})`;
};
exports.insertSQL = insertSQL;
// table: tableName or parentSql
const object2Sql = (table, qObj) => {
    const { select = "*", where, limit, skip = 0, orderBy, groupBy } = qObj;
    let _where = "", _limit = "", _orderBy = "", _groupBy = "";
    if (where) {
        _where = ` WHERE ${where}`;
    }
    if (limit) {
        _limit = ` LIMIT ${skip ? `${skip},` : ""}${limit}`;
    }
    if (orderBy) {
        _orderBy = ` ORDER BY ${orderBy}`;
    }
    if (groupBy) {
        _groupBy = ` GROUP BY ${groupBy}`;
    }
    return `SELECT ${select} from ${table}${_where}${_groupBy}${_orderBy}${_limit}`;
};
exports.object2Sql = object2Sql;
const getClusterStr = (cluster) => {
    return cluster ? `ON CLUSTER ${cluster}` : "";
};
exports.getClusterStr = getClusterStr;
const getDatabaseEngineStr = (engine) => {
    return engine ? `ENGINE=${engine}` : "";
};
exports.getDatabaseEngineStr = getDatabaseEngineStr;
// table: tableName or parentSql
const deleteObject2Sql = (table, qObj) => {
    const { where, cluster } = qObj;
    let _where = "";
    if (where) {
        _where = ` WHERE ${where}`;
    }
    return `ALTER TABLE ${table} ${(0, exports.getClusterStr)(cluster)} DELETE ${_where}`;
};
exports.deleteObject2Sql = deleteObject2Sql;
