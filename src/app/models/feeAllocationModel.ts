export interface Header {
    feeType: string;
}

export interface Value {
    valueId: number;
    value: number;
    monthid: number;
}

export interface Result {
    header: Header[];
    values: Value[];
}

export interface ifeemodle {
    result: Result[];
    id: number;
    exception?: any;
    status: number;
    isCanceled: boolean;
    isCompleted: boolean;
    creationOptions: number;
    asyncState?: any;
    isFaulted: boolean;
}
export interface iclassmodel
{
    id: number;
    value:string;
}

export interface iupdaterequest {
    schoolid: number;
    classid:number;
    values: any[];
}
