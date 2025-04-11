import DataInstance from "./dataInstance";
import Schema from "./schema";
/**
 * Get a pure data instead of a model instance
 */
export declare const getPureData: (schemaInstance: Schema, dataInstance: DataInstance) => {};
export declare const insertSQL: (tableName: string, schemaInstance: Schema) => string;
export interface SqlObject {
    select?: string;
    where?: string;
    limit?: number;
    skip?: number;
    orderBy?: string;
    groupBy?: string;
}
export declare const object2Sql: (table: string, qObj: SqlObject) => string;
export declare const getClusterStr: (cluster: string) => string;
export declare const getDatabaseEngineStr: (engine: string) => string;
export interface DeleteSqlObject {
    where: string;
}
export declare const deleteObject2Sql: (table: string, qObj: DeleteSqlObject & {
    cluster?: string;
}) => string;
