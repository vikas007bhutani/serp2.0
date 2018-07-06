import {Inject, Component,Pipe,PipeTransform, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeeService } from '../services/fee.service';
import { Observable } from "rxjs/Observable";
import {ifeemodle,Header,Value,Result, iclassmodel, iupdaterequest } from '../models/feeAllocationModel';
import {TableModule} from 'primeng/table';
import {EditorModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/button';
import {SelectItem} from 'primeng/api';
import {MessageService} from 'primeng/components/common/messageservice';
import { PrimengDatatableHelper } from '../shared/helpers/PrimengDatatableHelper';
// import { InvoiceComponent } from '../print/invoice/invoice.component';

@Component({
  selector: 'app-fees',
  providers: [FeeService,TableModule,ButtonModule],
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.scss']
})
export class FeesComponent implements OnInit {
  ifee: ifeemodle[]=[];
  iclass: iclassmodel[];
  selectedclass: any;
  body: any = {};
  primengDatatableHelper: PrimengDatatableHelper; 
  display: boolean = false;
  constructor(public Feesrv: FeeService,private messageService:MessageService) {
    this.selectedclass=1;
    this.primengDatatableHelper = new PrimengDatatableHelper();
    
   }
  
  ngOnInit() {
    this.loadData(this.selectedclass);
  }
  loadData(selectedclass) {
    this.primengDatatableHelper.showLoadingIndicator();
    this.Feesrv.getclasses().finally(() => this.primengDatatableHelper.hideLoadingIndicator()).subscribe(data =>{this.iclass= data,error=> 
      this.messageService.add({ severity: 'fail', summary: 'Failed', detail: "an error ocuured." });});
    
    this.Feesrv.getItems(this.selectedclass).finally(() => this.primengDatatableHelper.hideLoadingIndicator()).subscribe(data =>{this.ifee= data,error=> 
      this.messageService.add({ severity: 'fail', summary: 'Failed', detail: "an error ocuured." });});
  }
  onSelect(val)
  {
    this.selectedclass = val;
    
    if (this.selectedclass>0)
    {
    this.loadData(this.selectedclass);
    }
    
  }
  OnUpdate(json)
  {
    let msg = "Records Updated Successfully.... ";
    this.primengDatatableHelper.showLoadingIndicator();
      this.body=json;
      this.Feesrv.UpdateFeeAllocation(this.body).finally(() => this.primengDatatableHelper.hideLoadingIndicator()).subscribe(res => { 
      if (res>0) {
        this.messageService.add({ severity: 'success', summary: 'Succss', detail: msg });
      }
      else {
        this.messageService.add({ severity: 'fail', summary: 'Failed', detail: "an error ocuured." });
      }

    });
    
  }

  // openPopup() {
  //   this.display = true;
  // }



}
