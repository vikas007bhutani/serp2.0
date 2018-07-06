import { Component, OnInit, ViewChild, Input, EventEmitter, Output, Injector} from '@angular/core';
import { DataTable } from 'primeng/components/datatable/datatable';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { LedgerService } from '../../services/ledger.service';
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { ComponentBase } from '../../shared/common/component-base';

@Component({
  selector: 'edit-add-ledger',
  templateUrl: './edit-add-ledger.html'
})
export class EditAddLedger extends ComponentBase implements OnInit {
  
  @Output() onSaved: EventEmitter<any> = new EventEmitter<any>();
  display: boolean = false;
  id: any = 1;
  departments: any;
  ledger: any = {};
  date: any;
  header: any = "Edit Ledger";
  enabledisabled: boolean = true;
  today:any = new Date();


  constructor(private ledgerService: LedgerService, injector: Injector) {
    super(injector);
  }
  
  ngOnInit() {    
    
    this.getDepatments();
  } 

  getDepatments() {

    this.ledgerService.getDepartments().subscribe(res => {
      this.departments = res;
    })
  }

  onSelect(evt) { this.id = evt;}
  show(evt?:any) {
    this.display = true;
    if (evt) {
      this.enabledisabled = true;
      this.header = "Edit Ledger";
      this.ledger = evt;
      this.id = this.ledger.departmentID;
      let parts = this.ledger.paymentDate.split(/[- T]/);
     let formatedate = `${parts[1]}/${parts[2]}/${parts[0]}`;
     this.date = formatedate;
      this.ledger.parentLedgerId = this.ledger.id;
    }
    else {
      this.date = this.today.getMonth() + 1 + '/' + this.today.getDate() + '/' + this.today.getFullYear();
      this.enabledisabled = false;
      this.header = "Create Ledger";
      this.ledger = {};
      this.ledger.totalPaidAmount = "";
      this.ledger.totalAllocatedAmount = "";
      this.ledger.activity = "";
      this.ledger.remarks = "";

    }
  }
  createLedger() {
    let msg = "";
    if (this.ledger.id)
      msg = "Ledger updated successfully.";
    else
      msg = "Ledger added successfully.";
    this.ledger.departmentID = this.id;
    this.ledger.paymentDate =this.date;
    this.ledgerService.createorUpdateLedger(this.ledger)
      .subscribe(res => {
        if (res.result) {
          this.messageService.add({ severity: 'success', summary: 'Succss', detail: msg });
          this.display = false;
          this.onSaved.emit(null);
        }
        else {
          this.messageService.add({ severity: 'fail', summary: 'Succss', detail: "an error ocuured." });
        }

      });
    
  }
}
