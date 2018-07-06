import {Inject, Component,Pipe,PipeTransform, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../../services/invoice.service';
import { Observable } from "rxjs/Observable";
import {MessageService} from 'primeng/components/common/messageservice';
import {invoicedetails,Result,Section,Sectionwithvalue} from '../../models/invoice';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  paymentsection: Result[]=[];
  sectionvalue: Sectionwithvalue[]=[];
  display: boolean = false; 
  invoiceid:number;
  studentid:number;
  studentname:string;
  fathername:string;
  stuclass:string;
  section:string;
  rollnumber:string;
  invoicenumber:string;
  billingdate:Date;
  invoicemode:string;
  schoolname:string;
  schoolemail:string;
  schoolphone:string;
  affiliationno:string;
  schooladdress:string;
  paymentmonth:string[];
  record:invoicedetails;
  cashiername:string;
  totalamount:number;

  constructor(public InvService: InvoiceService,private messageService:MessageService) { }

  ngOnInit() {
  }
  show(detail?:invoicedetails) {
    
    this.display = true;
    this.invoiceid=detail.invoiceId;
    this.studentid=detail.studentId;
    this.studentname=detail.studentName;
    this.fathername=detail.fatherName;
    this.rollnumber=detail.rollNumber;
    this.stuclass=detail.class;
    this.section=detail.section;
    this.schoolname=detail.schoolFullName;
    this.schooladdress=detail.schoolAddress;
    this.invoicenumber=detail.invoiceNumber;
    this.billingdate=detail.billingDate;
    this.paymentmonth=detail.paymentMonths;
    this.cashiername=detail.cashierName;
    this.affiliationno=detail.affiliationNo;
    this.schoolemail=detail.schoolEmail;
    this.schoolphone=detail.schoolContactNumber;
    this.totalamount=detail.totalAmountWithTax;
   //this.rollnumber=detail[0].schoolFullName;

 
    this.getInvoice(this.invoiceid);
    
  }
  
  getInvoice(invoiceid) {
   
    this.InvService.getInvoicedetails(this.invoiceid)
      .subscribe((response) => {
        if (response && response.result) {
       
          this.paymentsection = response;
          this.sectionvalue=response.result.sectionwithvalue;
        }
      });
  }
    print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-content').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <link type=\"text/css\" rel=\"stylesheet\" href=\"../../../assets/Print/css/bootstrap.min.css\" media=\"print\">
          <link type=\"text/css\" rel=\"stylesheet\" href=\"../../../assets/Print/css/invoice.css\" media=\"print\">
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}

}
