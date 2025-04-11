export type FunctionValidation = (...value: any) => boolean;
interface DataTypeValidation {
    [key: string]: string | FunctionValidation;
    ['FixedString']: FunctionValidation;
}
export declare const dataTypeValidation: DataTypeValidation;
export {};
