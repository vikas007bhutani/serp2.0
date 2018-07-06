import { Component, Injector, ViewChild } from '@angular/core';
import { ComponentBase } from '../shared/common/component-base';
import { DataTable } from 'primeng/components/datatable/datatable';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { PrimengDatatableHelper } from '../shared/helpers/PrimengDatatableHelper';
import { PaymentService } from '../services/payment.service';
import { Lookups } from '../shared/lookups';
import { InvoiceComponent } from '../print/invoice/invoice.component';
import {ButtonModule} from 'primeng/button';

@Component({
  templateUrl: './payments.component.html'
})

export class PaymentsComponent extends ComponentBase {
  @ViewChild('dataTable') dataTable: DataTable;
  @ViewChild('paginator') paginator: Paginator;
  primengDatatableHelper: PrimengDatatableHelper;
  viewOptions = Lookups.ViewOptions;
  selectedViewOption: any;

  constructor(injector: Injector,
    private paymentService: PaymentService) {
    super(injector);
    this.selectedViewOption = this.viewOptions[0].id;
    this.primengDatatableHelper = new PrimengDatatableHelper();
  }

  confirmCancelPayment(invoiceId) {
    this.confirmationService.confirm({
      message: 'You want to cancel the payment?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Succss', detail: "Transaction cancelled successfully" });
      }
    });
  }

  changeView() {
    this.getPayments();
  }

  getPayments(event?: LazyLoadEvent) {
    if (this.primengDatatableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);

      return;
    }

    this.primengDatatableHelper.showLoadingIndicator();
    var pageIndex = this.primengDatatableHelper.getPageIndex(this.paginator, event);
    var pageSize = this.primengDatatableHelper.getMaxResultCount(this.paginator, event);
    this.paymentService.getPayments(this.selectedViewOption, pageIndex, pageSize)
      .finally(() => this.primengDatatableHelper.hideLoadingIndicator())
      .subscribe(result => {
        if (result && result.length > 0) {
          this.primengDatatableHelper.totalRecordsCount = result[0].totalCount;
        }

        this.primengDatatableHelper.records = result;
      });
  }

  onPayed(event) {
    this.getPayments();
  }

  displayCancel(rowData) {
    return rowData.cashierId == this.paymentService.getUserId()
      && (!rowData.paymentReference || rowData.paymentReference == 'undefined');
  }
}
