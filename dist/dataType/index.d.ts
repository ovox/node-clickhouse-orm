import { FunctionValidation } from "./validation";
export { FunctionValidation } from "./validation";
export type DATA_TYPE_DEFINE = {
    validation?: string | FunctionValidation;
    columnType: string;
};
export type DATA_TYPE_FUNCTION_DEFINE = (dateTypeDefine: any) => DATA_TYPE_DEFINE;
export interface I_DATA_TYPES {
    UInt8: DATA_TYPE_DEFINE;
    UInt16: DATA_TYPE_DEFINE;
    UInt32: DATA_TYPE_DEFINE;
    /**
     *
     * @description be careful of Number.MAX_SAFE_INTEGER
     */
    UInt64: DATA_TYPE_DEFINE;
    Int8: DATA_TYPE_DEFINE;
    Int16: DATA_TYPE_DEFINE;
    Int32: DATA_TYPE_DEFINE;
    /**
     *
     * @description be careful of Number.MAX_SAFE_INTEGER
     */
    Int64: DATA_TYPE_DEFINE;
    Float32: DATA_TYPE_DEFINE;
    Float64: DATA_TYPE_DEFINE;
    Boolean: DATA_TYPE_DEFINE;
    String: DATA_TYPE_DEFINE;
    UUID: DATA_TYPE_DEFINE;
    Date: DATA_TYPE_DEFINE;
    Date32: DATA_TYPE_DEFINE;
    DateTime: DATA_TYPE_DEFINE;
    DateTime64: DATA_TYPE_DEFINE;
    /**
     *
     * @param Number
     * @example DATA_TYPE.FixedString(3)
     */
    FixedString: DATA_TYPE_FUNCTION_DEFINE;
    /**
     *
     * @param DATA_TYPE
     * @example DATA_TYPE.LowCardinality(DATA_TYPE.String)
     */
    LowCardinality: DATA_TYPE_FUNCTION_DEFINE;
    /**
     *
     * @param string
     * @example DATA_TYPE.Enum8(`'hello' = 1, 'world' = 2`)
     * @description number [-128, 127]
     * @description Don't just change the enumeration order, because the orm will think that the field structure has changed
     */
    Enum8: DATA_TYPE_FUNCTION_DEFINE;
    /**
     *
     * @param string
     * @example DATA_TYPE.Enum16(`'hello' = 3000, 'world' = 3500`)
     * @description number [-32768, 32767]
     * @description Don't just change the enumeration order, because the orm will think that the field structure has changed
     */
    Enum16: DATA_TYPE_FUNCTION_DEFINE;
    /**
     *
     * @param columnType
     * Clickhouse dataTypes: Array(T), JSON, Map(key, value), IPv4, Nullable(), more...
     * @example DATA_TYPE.Other('Array(String)') , DATA_TYPE.Other('Int8')
     * @description No `INSERT` data validation provided
     */
    Other: DATA_TYPE_FUNCTION_DEFINE;
}
export declare const DATA_TYPE: I_DATA_TYPES;
