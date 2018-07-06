import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTable } from 'primeng/components/datatable/datatable';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { PrimengDatatableHelper } from '../shared/helpers/PrimengDatatableHelper';
import { LedgerService } from '../services/ledger.service';
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { EditAddLedger } from './create-edit-ledgermodel/edit-add-ledger';
import { LedgerHistoryPopUpComponent } from './ledgerhistory/ledgerhistory.popup';

@Component({
  selector: 'ladger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent implements OnInit {

  @ViewChild('dataTable') dataTable: DataTable;
  @ViewChild('paginator') paginator: Paginator;
  primengDatatableHelper: PrimengDatatableHelper;  
  selectedItem: any;
  display: boolean = false;
  ledgerModel: any = {};
  actions: boolean = true;
  userId: any;
  
  ledgerOptions = [
  {
    "Id": "all",
    "Label": "All"
    },
  {
    "Id": "self",
    "Label": "Self"
  } 
]    
  

  constructor(private ledgerService: LedgerService) {
    this.primengDatatableHelper = new PrimengDatatableHelper();
    this.selectedItem = "self";
    this.userId = this.ledgerService.getUserId();
  }
  checked: boolean = true;
  ngOnInit() {

  }

  getLedgers(event?: LazyLoadEvent) {
    
    if (this.primengDatatableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);

      return;
    }
    this.primengDatatableHelper.showLoadingIndicator();

    let pageIndex = this.primengDatatableHelper.getPageIndex(this.paginator, event);
    let pageSize = this.primengDatatableHelper.getMaxResultCount(this.paginator, event);
    let queryFilter = "";
    if (this.selectedItem === "self")
      this.ledgerModel.cashierId = this.userId;
    else
      this.ledgerModel.cashierId = null;
    this.ledgerModel.parentLedgerId = null;

    

    this.ledgerService.getLedger(pageIndex, pageSize, queryFilter, this.ledgerModel)
      .finally(() => this.primengDatatableHelper.hideLoadingIndicator())
      .map(res => {


        return res;
      })
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
  onSelect(evt) {
    this.selectedItem = evt;
    this.getLedgers();
  }

 
}
