import { Component, OnInit, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ComponentBase } from '../../shared/common/component-base';
import { DataTable } from 'primeng/components/datatable/datatable';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { Fieldset } from 'primeng/fieldset';
import { UserService } from '../../services/user.service';
import { PaymentService } from '../../services/payment.service';
import { IpayFeeModel } from '../../models/payFeeModel';
import { Lookups } from '../../shared/lookups';

@Component({
  selector: 'raise-payment',
  templateUrl: './raise-payment.component.html'
})

export class RaisePaymentComponent extends ComponentBase {
  @Output() payed: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('infoFieldset') infoFieldset: Fieldset;
  @ViewChild('feeFieldset') feeFieldset: Fieldset;
  payment: any = {};
  userInfo: any = {};
  display: boolean;
  results = [];
  feeSections = [];
  months = Lookups.MonthOptions;
  selectedMonths: any;

  constructor(injector: Injector,
    private userService: UserService,
    private paymentService: PaymentService
  ) { super(injector); }

  show(evt?: any) {
    this.clear();
    this.display = true;
  }

  onMonthChange(event) {
    if (this.payment.feeSections.length == 0) {
      this.getFeeSectionsForMonths();
    }
    this.getTotalFeeOfMonth();
  }

  getFeeForMonths() {
    var months = [];
    if (this.selectedMonths) {
      months = this.selectedMonths.map(function (item) {
        return parseInt(item['id']);
      });
    }

    return months;
  }

  getTotalFeeOfMonth() {
    this.paymentService.getTotalFeeOfMonth(this.payment.studentId, this.getFeeForMonths())
      .subscribe((response) => {
        if (response && response.result) {
          this.payment.totalDues = response.result.pastDues
        }
      });
  }

  getFeeSectionsForMonths() {
    var thisPayment = this.payment;
    if (this.selectedMonths && this.selectedMonths.length > 0) {
      this.paymentService.getFeeSectionsForMonths(this.userInfo.classId, this.getFeeForMonths())
        .subscribe((response) => {
          if (response && response.result && response.result.feeSectionsWithValues) {
            this.feeSections = response.result.feeSectionsWithValues;
            if (this.feeSections && this.feeSections.length > 0) {
              this.feeSections.forEach((section) =>
                this.payment.feeSections.push({
                  feeSectionID: section.sectionId,
                  paidAmount: section.value
                }));
            }
          }
        });
    }
    else {
      this.feeSections = [];
    }
  }

  getTotalFeeAmount() {
    var totalFee = 0;
    if (this.payment && this.payment.feeSections && this.payment.feeSections.length > 0) {
      for (const section of this.payment.feeSections) {
        if (section && section.paidAmount) {
          totalFee += parseInt(section.paidAmount);
        }
      }
    }

    return totalFee;
  }

  getAmountToPay() {
    var amountToPay = this.getTotalFeeAmount();

    if (this.payment && this.payment.totalDues) {
      amountToPay += parseInt(this.payment.totalDues);
    }

    if (this.payment && this.payment.feeConcessionAmount) {
      amountToPay -= parseInt(this.payment.feeConcessionAmount);
    }

    return amountToPay;
  }

  getBalanceAmount() {
    var balanceAmount = this.getAmountToPay();
    if (this.payment && this.payment.paidAmount) {
      balanceAmount -= parseInt(this.payment.paidAmount);
    }

    return balanceAmount;
  }

  payFee() {
    var fee = {
      paidAmount: this.payment.paidAmount,
      balanceAmount: this.getBalanceAmount(),
      studentId: this.payment.studentId,
      feeForMonths: this.getFeeForMonths(),
      paymentReference: this.payment.paymentMode != '1' ? this.payment.paymentReference : '',
      feeSections: this.payment.feeSections
    };

    this.paymentService.payFees(fee as IpayFeeModel)
      .subscribe(() => {
        this.display = false;
        this.clear();
        this.payed.emit();
        this.messageService.add({ severity: 'success', summary: 'Succss', detail: "Fee details saved successfully" });
      }, (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Error occured while saving fee details" });
      });
  }

  onStudentSelect(event) {
    this.clear();
    this.userInfo = event;
    this.payment.studentId = event.userId;
  }

  onClear(event) {
    this.clear();
  }

  searchStudent(event) {
    this.userService.getPaymentUsers(event.query)
      .subscribe(data => {
        this.results = data;
      });
  }

  private clear() {
    this.payment = { feeSections: [] };
    this.userInfo = {};
    this.selectedMonths = null;
  }
}
