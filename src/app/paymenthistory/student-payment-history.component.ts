import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTable } from 'primeng/components/datatable/datatable';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { PrimengDatatableHelper } from '../shared/helpers/PrimengDatatableHelper';
import { PaymentHistoryService } from '../services/paymenthistory.service';
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { CommonService } from '../services/common.service';

@Component({
  selector: 'student-payment-history',
  templateUrl: './student-payment-history.component.html'
})
export class StudentPaymentHistoryComponent implements OnInit {

  @ViewChild('dataTable') dataTable: DataTable;
  @ViewChild('paginator') paginator: Paginator;
  primengDatatableHelper: PrimengDatatableHelper;
  admin: boolean = false; 
  userCode: any;
  display: boolean = false;
  header: any;
  rowdetails: any = {};
  constructor(private paymentService: PaymentHistoryService) {
    this.primengDatatableHelper = new PrimengDatatableHelper();
  }
  checked: boolean = true;
  ngOnInit() {
  
  }

  show(evt) {
    this.display = true;
    this.rowdetails = evt;
    this.userCode = evt.userCode;
    this.header = evt.firstName + " " + evt.lastName + " Payment History";
    this.getPaymenthistory();
  }
  getPaymenthistory(event?: LazyLoadEvent) {
    if (this.primengDatatableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);

      return;
    }
    this.primengDatatableHelper.showLoadingIndicator();

    let filter = { searchField: "1", searchString: this.userCode, searchClass: "", searchSection: "" };
    let paging = { pageIndex: this.primengDatatableHelper.getPageIndex(this.paginator, event), pageSize: this.primengDatatableHelper.getMaxResultCount(this.paginator, event), Sort: { sortBy: "paymentDate", sortDirection: "desc" } };


    this.paymentService.getPayments(filter, paging)
      .finally(() => this.primengDatatableHelper.hideLoadingIndicator())
      .subscribe(res => {
        if (res && res.length > 0) {
          this.primengDatatableHelper.totalRecordsCount = res[0].totalCount;
          this.primengDatatableHelper.records = res;
        }
        else {
          this.primengDatatableHelper.totalRecordsCount = 0;
          this.primengDatatableHelper.records = null;
        }

      })
  }
  

  

}
