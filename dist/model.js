"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transformer_1 = require("./transformer");
const schema_1 = require("./schema");
const log_1 = require("./log");
const dataInstance_1 = require("./dataInstance");
class Model {
    constructor({ client, dbTableName, debug, schema, db }) {
        this.client = client;
        this.db = db;
        this.dbTableName = dbTableName;
        this.debug = debug;
        this.schemaInstance = new schema_1.default(schema);
        return this;
    }
    create(data) {
        // new data model
        const instance = new dataInstance_1.default(this, data);
        // do save
        return instance.save();
    }
    build(initData) {
        return new dataInstance_1.default(this, initData);
    }
    find(qObjArray) {
        if (!Array.isArray(qObjArray))
            qObjArray = [qObjArray];
        let sql = "";
        qObjArray.map((qObj, index) => {
            if (index === 0)
                sql = (0, transformer_1.object2Sql)(this.dbTableName, qObj);
            else
                sql = (0, transformer_1.object2Sql)(`(${sql})`, qObj);
        });
        if (this.debug)
            (0, log_1.DebugLog)(`[>>EXECUTE FIND<<] ${sql}`);
        return this.client.query(sql).toPromise();
    }
    delete(deleteObject) {
        let sql = (0, transformer_1.deleteObject2Sql)(this.dbTableName, Object.assign(Object.assign({}, deleteObject), { cluster: this.db.cluster }));
        if (this.debug)
            (0, log_1.DebugLog)(`[>>EXECUTE FIND<<] ${sql}`);
        return this.client.query(sql).toPromise();
    }
    insertMany(dataArray) {
        const datas = [...dataArray].map((item) => {
            let data;
            if (item instanceof dataInstance_1.default) {
                data = (0, transformer_1.getPureData)(this.schemaInstance, item);
            }
            else {
                const _data = new dataInstance_1.default(this, item);
                data = (0, transformer_1.getPureData)(this.schemaInstance, _data);
            }
            return data;
        });
        if (datas && datas.length > 0) {
            const insertHeaders = (0, transformer_1.insertSQL)(this.dbTableName, this.schemaInstance);
            if (this.debug)
                (0, log_1.DebugLog)(`[>>EXECUTE INSERTMANY<<] ${insertHeaders} ${JSON.stringify(datas)}`);
            return this.client.insert(insertHeaders, datas).toPromise();
        }
    }
}
exports.default = Model;
