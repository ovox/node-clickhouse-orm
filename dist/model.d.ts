import { ClickHouse } from "clickhouse";
import { SqlObject, DeleteSqlObject } from "./transformer";
import Schema, { SchemaConfig } from "./schema";
import { DbConfig } from "./orm";
import DataInstance from "./dataInstance";
import { ClickhouseClientInsertPromise, ClickhouseClientToPromise } from "./constants";
export interface ModelOptions {
    client: ClickHouse;
    dbTableName: string;
    debug: boolean;
    schema: SchemaConfig;
    db: DbConfig;
}
export default class Model<T = any> {
    client: any;
    dbTableName: any;
    debug: any;
    db: any;
    schemaInstance: Schema;
    schema: SchemaConfig;
    constructor({ client, dbTableName, debug, schema, db }: ModelOptions);
    create(data: T): ClickhouseClientInsertPromise;
    build(initData?: Partial<T>): DataInstance & Partial<T>;
    find(qObjArray: SqlObject[] | SqlObject): ClickhouseClientToPromise;
    delete(deleteObject: DeleteSqlObject): ClickhouseClientToPromise;
    insertMany(dataArray: Array<T> | Array<DataInstance & T>): ClickhouseClientInsertPromise;
}
