import Orm, { OrmConfig } from "./orm";
export { setLogService } from "./log";
export { DATA_TYPE } from "./dataType";
export * from "./orm";
export { default as ClickHouseORM } from "./orm";
export { default as ClickhouseOrmModel } from "./model";
export declare const ClickhouseOrm: ({ client, db, debug }: OrmConfig) => Orm;
