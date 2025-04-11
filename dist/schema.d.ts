import { DATA_TYPE_DEFINE } from "./dataType";
import DataInstance from "./dataInstance";
export type SchemaConfig<T = undefined> = T extends undefined ? {
    [x: string]: {
        type: DATA_TYPE_DEFINE;
        default?: any;
    };
} : {
    [x in keyof T]-?: {
        type: DATA_TYPE_DEFINE;
        default?: any;
    };
};
export default class Schema {
    schemaConfig: any;
    columns: any;
    constructor(schemaConfig: SchemaConfig);
    proxyAttr(obj: SchemaConfig, data: DataInstance, column: string): void;
}
