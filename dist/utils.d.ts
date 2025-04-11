export declare const isObject: (value: any) => boolean;
export declare const isObjectDate: (value: any) => boolean;
/**
 *
 * @param string
 * @description Eliminate unnecessary spaces in data type strings to ensure accurate comparison
 * `Enum8('enum1' = 1, 'enum2' = 2, 'enum3' = 3)` -> `Enum8('enum1'=1,'enum2'=2,'enum3'=3)`
 * @returns string
 */
export declare const dataTypeFilterUnnecessarySpace: (str: string) => string;
