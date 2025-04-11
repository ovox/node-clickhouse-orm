import { ClickHouse } from "clickhouse";
import Model from "./model";
import { SchemaConfig } from "./schema";
export interface DbConfig {
    name: string;
    /**
     * default: Atomic
     */
    engine?: string;
    cluster?: string;
}
export interface OrmConfig {
    /**
     * TimonKK/clickhouse config
     */
    client: any;
    db: DbConfig;
    debug: boolean;
}
export interface ModelConfig<T = any> {
    tableName: string;
    schema: SchemaConfig<T>;
}
export interface ModelSyncTableConfig<T = any> {
    tableName: string;
    schema: SchemaConfig<T>;
    autoCreate: boolean;
    options: string;
    autoSync?: boolean;
}
export interface ModelSqlCreateTableConfig<T = any> {
    tableName: string;
    schema: SchemaConfig<T>;
    createTable?: (dbTableName: string, db: DbConfig) => string;
}
type TableMeta = {
    name: string;
    type: string;
}[];
type ModelConfigs<T> = ModelConfig<T> | ModelSyncTableConfig<T> | ModelSqlCreateTableConfig<T>;
/** {a:unknown,b:string,c:unknown} >>> 'a'|'c' */
type GetUnknownAttr<T> = {
    [a in keyof T]: unknown extends T[a] ? a : never;
}[keyof T];
/** {a:unknown,b:string,c:unknown} >>> {b:string} */
type GetDefinedAttr<T> = Pick<T, Exclude<keyof T, GetUnknownAttr<T>>>;
export default class ClickhouseOrm {
    client: ClickHouse;
    db: DbConfig;
    debug: boolean;
    models: {};
    constructor({ client, db, debug }: OrmConfig);
    getCreateDatabaseSql(): string;
    createDatabase(): Promise<Object[]>;
    getTableMeta(dbTableName: string): Promise<any>;
    diffTableMeta(codeSchema: SchemaConfig, tableMeta: TableMeta): {
        deleteColumns: string[];
        addColumns: any[];
        modifyColumns: any[];
    };
    syncTable({ deleteColumns, addColumns, modifyColumns, dbTableName }: {
        deleteColumns: any;
        addColumns: any;
        modifyColumns: any;
        dbTableName: any;
    }): Promise<any[]>;
    autoCreateTableSql(dbTableName: string, modelConfig: ModelSyncTableConfig): string;
    createAndSync(modelConfig: ModelSyncTableConfig | ModelSqlCreateTableConfig, dbTableName: string): Promise<void>;
    P: any;
    /**
     * @remark
     * The createDatabase must be completed
     */
    model<T = any>(modelConfig: ModelConfigs<T>): Promise<Model<(GetDefinedAttr<T> extends infer T_1 ? { [f in keyof T_1]: GetDefinedAttr<T>[f]; } : never) & { [f_1 in GetUnknownAttr<T>]?: any; }>>;
}
export {};
