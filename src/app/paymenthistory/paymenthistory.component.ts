import { Component, OnInit, ViewChild, Injector} from '@angular/core';
import { DataTable } from 'primeng/components/datatable/datatable';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { PrimengDatatableHelper } from '../shared/helpers/PrimengDatatableHelper';
import { PaymentHistoryService } from '../services/paymenthistory.service';
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { CommonService } from '../services/common.service';
import { StudentPaymentHistoryComponent } from './student-payment-history.component';
import { ComponentBase } from '../shared/common/component-base';

@Component({
  selector: 'app-paymenthistory',
  templateUrl: './paymenthistory.component.html',
  styleUrls: ['./paymenthistory.component.scss']
})
export class PaymentHistoryComponent extends ComponentBase implements OnInit {
  
  @ViewChild('dataTable') dataTable: DataTable;
  @ViewChild('studentDataTable') studentDataTable: DataTable;
  @ViewChild('paginator') paginator: Paginator;
  @ViewChild('studentpaginator') studentpaginator: Paginator;
  primengDatatableHelper: PrimengDatatableHelper;
  primengStudentDatatableHelper: PrimengDatatableHelper;
  admin: boolean = false;
  sections: any;
  classes: any;
  classid = "";
  usercode = "";
  sectionid = "";
  searchText = "";

  userCodes = [
    {
      "id": "",
      "value": "Search Type"
    },
    {
      "id": "1",
      "value": "User Code"
    },
    {
      "id": "2",
      "value": "First Name"
    },
    {
      "id": "3",
      "value": "Last Name"
    }
  ]    

  constructor(private paymentService: PaymentHistoryService, private commonService: CommonService, injector: Injector) {
    super(injector);
    this.primengDatatableHelper = new PrimengDatatableHelper();
    this.primengStudentDatatableHelper = new PrimengDatatableHelper();
  }
  checked: boolean = true;
  ngOnInit() {
    this.getClasses();
    this.getSections();
  }

  getPaymenthistory(event?: LazyLoadEvent) {    
    if (this.primengDatatableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);

      return;
    }
    this.primengDatatableHelper.showLoadingIndicator();

    let filter = { searchField: "", searchString: "", searchClass: this.classid, searchSection: this.sectionid };
    let paging = { pageIndex: this.primengDatatableHelper.getPageIndex(this.paginator, event), pageSize: this.primengDatatableHelper.getMaxResultCount(this.paginator, event), Sort: { sortBy: "paymentDate", sortDirection: "desc" } };
        
      
    this.paymentService.getPayments(filter, paging)
      .finally(() => this.primengDatatableHelper.hideLoadingIndicator())
      .subscribe(res => {
        if (res && res.length>0) {          
          this.primengDatatableHelper.totalRecordsCount = res[0].totalCount;
          this.primengDatatableHelper.records =res;
        }
        else {
          this.primengDatatableHelper.totalRecordsCount = 0;
          this.primengDatatableHelper.records = null;          
        }

      },
      err => {
        console.info(err);
        this.messageService.add({ severity: 'fail', summary: 'Succss', detail: "an error ocuured." });
      })
    
  }

  getStudenthistory(event?: LazyLoadEvent) {
    if (this.primengStudentDatatableHelper.shouldResetPaging(event)) {
      this.studentpaginator.changePage(0);

      return;
    }
    this.primengStudentDatatableHelper.showLoadingIndicator();

    let filter = { searchField: this.usercode, searchString: this.searchText, searchClass: "", searchSection: "" };
    let paging = { pageIndex: this.primengStudentDatatableHelper.getPageIndex(this.studentpaginator, event), pageSize: this.primengStudentDatatableHelper.getMaxResultCount(this.studentpaginator, event), Sort: { sortBy: "paymentDate", sortDirection: "desc" } };

    

    this.paymentService.getPayments(filter, paging)
      .finally(() => this.primengStudentDatatableHelper.hideLoadingIndicator())
      .map(res => {
        if ((this.usercode === "" && this.searchText === "") || this.searchText === "" || this.usercode === "") {
          res = [];       
        }
        return res;
      })
      .subscribe(res => {
        if (res && res.length > 0) {         
          this.primengStudentDatatableHelper.totalRecordsCount = res[0].totalCount;
          this.primengStudentDatatableHelper.records = res;
        }
        else {
          this.primengStudentDatatableHelper.totalRecordsCount = 0;
          this.primengStudentDatatableHelper.records = null;
        }

      },
      err => {
        console.info(err);
        this.messageService.add({ severity: 'fail', summary: 'Succss', detail: "an error ocuured." });
      })

  }

  getRecords(evt) {
    console.info(evt);
  }

  onClassSelect(evt) {
    this.classid = evt;
    this.getPaymenthistory();
  }
  onSectionSelect(evt) {
    this.sectionid = evt;
    this.getPaymenthistory();
  }

  onUserCodeSelect(evt) {
    this.usercode = evt;
  }

  searchStudentRecords() {
    this.getStudenthistory();
  }

  
  getSections() {

    this.commonService.getSections().subscribe(res => {
      res.push({ "id": "", "value": "All Sections" })
      this.sections = res;
    })
  }

  getClasses() {

    this.commonService.getClasses().subscribe(res => {
      res.push({ "id": "", "value": "All Classes" })
      this.classes = res;
    })
  }

}
