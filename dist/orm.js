"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
const transformer_1 = require("./transformer");
const log_1 = require("./log");
const utils_1 = require("./utils");
class ClickhouseOrm {
    constructor({ client, db, debug }) {
        this.models = {};
        this.client = client;
        this.db = db;
        this.debug = debug;
    }
    getCreateDatabaseSql() {
        const { name, engine, cluster } = this.db;
        const createDatabaseSql = `CREATE DATABASE IF NOT EXISTS ${name} ${(0, transformer_1.getClusterStr)(cluster)} ${(0, transformer_1.getDatabaseEngineStr)(engine)}`;
        (0, log_1.Log)(createDatabaseSql);
        return createDatabaseSql;
    }
    createDatabase() {
        const createDatabaseSql = this.getCreateDatabaseSql();
        return this.client.query(createDatabaseSql).toPromise();
    }
    // get table meta info or table doesn't exist
    getTableMeta(dbTableName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const info = yield this.client
                    .query(`select * from ${dbTableName} limit 0`)["withTotals"]()
                    .toPromise();
                return info.meta;
            }
            catch (err) {
                if (err.code === 60 || err.message.indexOf(`doesn't exist`) !== -1)
                    return false;
            }
        });
    }
    // diff
    diffTableMeta(codeSchema, tableMeta) {
        const tableMetaMap = {};
        tableMeta.forEach((column) => {
            tableMetaMap[column.name] = column.type;
        });
        const addColumns = [], modifyColumns = [];
        Object.keys(codeSchema).map((columnName) => {
            if (tableMetaMap[columnName]) {
                if ((0, utils_1.dataTypeFilterUnnecessarySpace)(codeSchema[columnName].type.columnType) !== (0, utils_1.dataTypeFilterUnnecessarySpace)(tableMetaMap[columnName])) {
                    modifyColumns.push({
                        name: columnName,
                        type: codeSchema[columnName].type.columnType,
                    });
                }
                delete tableMetaMap[columnName];
            }
            else {
                addColumns.push({
                    name: columnName,
                    type: codeSchema[columnName].type.columnType,
                });
            }
        });
        const deleteColumns = Object.keys(tableMetaMap);
        return {
            deleteColumns,
            addColumns,
            modifyColumns,
        };
    }
    syncTable({ deleteColumns, addColumns, modifyColumns, dbTableName }) {
        const list = [];
        const alter = `ALTER TABLE ${dbTableName} ${(0, transformer_1.getClusterStr)(this.db.cluster)}`;
        deleteColumns.forEach((columnName) => {
            const sql = `${alter} DROP COLUMN ${columnName}`;
            list.push(this.client.query(sql).toPromise());
            (0, log_1.Log)(`sync table structure: ${sql}`);
        });
        addColumns.forEach((item) => {
            const sql = `${alter} ADD COLUMN ${item.name} ${item.type}`;
            list.push(this.client.query(sql).toPromise());
            (0, log_1.Log)(`sync table structure: ${sql}`);
        });
        modifyColumns.forEach((item) => {
            const sql = `${alter} MODIFY COLUMN ${item.name} ${item.type}`;
            list.push(this.client.query(sql).toPromise());
            (0, log_1.Log)(`sync table structure: ${sql}`);
        });
        return Promise.all(list);
    }
    // auto create sql string
    autoCreateTableSql(dbTableName, modelConfig) {
        if (!modelConfig.options)
            throw Error("autoCreate or autoSync: `options` is required");
        const { schema, options } = modelConfig;
        return `
      CREATE TABLE IF NOT EXISTS ${dbTableName} ${(0, transformer_1.getClusterStr)(this.db.cluster)}
      (
        ${Object.keys(schema)
            .map((key) => {
            return `${key} ${schema[key].type.columnType}`;
        })
            .join(",")}
      )
      ${options}`;
    }
    createAndSync(modelConfig, dbTableName) {
        return __awaiter(this, void 0, void 0, function* () {
            const tablemeta = yield this.getTableMeta(dbTableName);
            // Table Exists
            if (tablemeta) {
                if (modelConfig.autoSync) {
                    const diff = this.diffTableMeta(modelConfig.schema, tablemeta);
                    if (diff.addColumns.length ||
                        diff.deleteColumns.length ||
                        diff.modifyColumns.length) {
                        try {
                            const syncSqlRes = yield this.syncTable(Object.assign(Object.assign({}, diff), { dbTableName }));
                            if (syncSqlRes.length)
                                (0, log_1.Log)(`Sync table '${dbTableName}' structure complete!`);
                        }
                        catch (e) {
                            const info = `Sync table '${dbTableName}' structure failed and Model create failed:\n ${e}`;
                            (0, log_1.ErrorLog)(info);
                            throw new Error(info);
                        }
                    }
                }
            }
            else {
                // [IF NOT EXISTS] create table
                const { createTable } = modelConfig;
                const createSql = createTable
                    ? createTable(dbTableName, this.db)
                    : this.autoCreateTableSql(dbTableName, modelConfig);
                (0, log_1.Log)(`Create table> ${createSql}`);
                try {
                    yield this.client.query(createSql).toPromise();
                }
                catch (e) {
                    const info = `Create table '${dbTableName}' failed and Model create failed:\n ${e}`;
                    (0, log_1.ErrorLog)(info);
                    throw new Error(info);
                }
            }
        });
    }
    /**
     * @remark
     * The createDatabase must be completed
     */
    model(modelConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tableName, schema } = modelConfig;
            const dbTableName = `${this.db.name}.${tableName}`;
            if (modelConfig.autoCreate ||
                modelConfig.createTable)
                yield this.createAndSync(modelConfig, dbTableName);
            const modelInstance = new model_1.default({
                client: this.client,
                db: this.db,
                dbTableName,
                debug: this.debug,
                schema,
            });
            this.models[tableName] = modelInstance;
            return modelInstance;
        });
    }
}
exports.default = ClickhouseOrm;
