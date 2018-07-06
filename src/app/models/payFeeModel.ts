export interface IpayFeeModel {
  paidAmount: number,
  balanceAmount: number,
  paidBy: number,
  cashierId: number,
  studentId: number,
  schoolId: string,
  feeForMonths: any,
  paymentReference: string,
  feeSections: number
}
