import { ClickhouseClientInsertPromise } from "./constants";
export default class DataInstance {
    [key: string]: any;
    model: any;
    constructor(model: any, initData?: any);
    private setInitData;
    private checkColumnExist;
    private proxyApply;
    save(): ClickhouseClientInsertPromise;
}
