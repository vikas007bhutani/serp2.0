export interface invoicedetails {
    rowNumber: number;
    studentId: number;
    totalFees: number;
    lateCharges: number;
    rollNumber: string;
    gstNumber?: any;
    studentName: string;
    fatherName: string;
    class: string;
    section: string;
    paymentMonths: string[];
    totalCount: number;
    schoolName?: any;
    schoolAddress?: any;
    affiliationNo:string;
    schoolEmail:string;
    schoolContactNumber:string;
    schoolFullName?: any;
    schoolId: number;
    cashierName?: any;
    invoiceNumber: string;
    invoiceId: number;
    billingDate: Date;
    paidBy: number;
    cashierId: number;
    igst: number;
    cgst: number;
    sgst: number;
    month: number;
    totalAmount: number;
    totalAmountWithTax: number;
}
    export interface Sectionwithvalue {
        ftype: string;
        feevalue: number;
    }

    export interface Section {
        sectionwithvalue: Sectionwithvalue[];
    }

    export interface Result {
        result: Section;
        id: number;
        exception?: any;
        status: number;
        isCanceled: boolean;
        isCompleted: boolean;
        creationOptions: number;
        asyncState?: any;
        isFaulted: boolean;
    }



