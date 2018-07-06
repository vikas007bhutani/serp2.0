import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTable } from 'primeng/components/datatable/datatable';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { PrimengDatatableHelper } from '../../shared/helpers/PrimengDatatableHelper';
import { LedgerService } from '../../services/ledger.service';
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";


@Component({
  selector: 'ladgerhistory',
  templateUrl: './ledgerhistory.popup.html'
})
export class LedgerHistoryPopUpComponent implements OnInit {

  @ViewChild('dataTable') dataTable: DataTable;
  @ViewChild('paginator') paginator: Paginator;
  primengDatatableHelper: PrimengDatatableHelper;  
  display: boolean = false;
  ledgerModel: any = {};
  header: any = "Ledger History";
  


  constructor(private ledgerService: LedgerService) {
    this.primengDatatableHelper = new PrimengDatatableHelper();
  }
  checked: boolean = true;
  ngOnInit() {

  }

  getLedgersHistory(event?: LazyLoadEvent) {

    if (this.primengDatatableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);

      return;
    }
    this.primengDatatableHelper.showLoadingIndicator();

    let pageIndex = this.primengDatatableHelper.getPageIndex(this.paginator, event);
    let pageSize = this.primengDatatableHelper.getMaxResultCount(this.paginator, event);
    let queryFilter = ""; 



    this.ledgerService.getLedger(pageIndex, pageSize, queryFilter, this.ledgerModel)
      .finally(() => this.primengDatatableHelper.hideLoadingIndicator())
      .subscribe(res => {
        if (res && res.length > 0) {
          this.primengDatatableHelper.totalRecordsCount = res[0].totalCount;
          this.primengDatatableHelper.records = res;
          this.primengDatatableHelper.hideLoadingIndicator();
        }
        else {
          this.primengDatatableHelper.totalRecordsCount = 0;
          this.primengDatatableHelper.records = null;
        }

      })
  }  


  show(evt?: any) {
    this.display = true;
    this.ledgerModel.cashierId = null;
    this.ledgerModel.parentLedgerId = evt.id;
    this.getLedgersHistory();
  }

}
