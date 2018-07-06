import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { FormControl, FormGroup, Validators, NgModel } from '@angular/forms';
import { DataTable } from 'primeng/components/datatable/datatable';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { PrimengDatatableHelper } from '../shared/helpers/PrimengDatatableHelper';
import { UserService } from '../services/user.service';
import { UserProfileDetail } from '../models/userProfileModel';
import { CommonService } from '../services/common.service';
import { ComponentBase } from '../shared/common/component-base';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends ComponentBase implements OnInit {

  @ViewChild('dataStudentTable') studentdataTable: DataTable;
  @ViewChild('studentpaginator') studentpaginator: Paginator;

  @ViewChild('dataStaffTable') staffdataTable: DataTable;
  @ViewChild('staffpaginator') staffpaginator: Paginator;
  primengDatatableHelper: PrimengDatatableHelper;
  primengDatatableHelperStaff: PrimengDatatableHelper;
  isAdmin: boolean = false;
  roleId: number;
  showUpdateUser: boolean = false;
  userProfileDetails: UserProfileDetail;
  updateUserForm: FormGroup;
  classes: any[];
  sections: any[];
  constructor(injector: Injector, private userService: UserService, private commonService: CommonService) {
    super(injector);
    this.primengDatatableHelper = new PrimengDatatableHelper();
    this.primengDatatableHelperStaff = new PrimengDatatableHelper();
  }

  ngOnInit() {
    this.userProfileDetails = new UserProfileDetail();
    this.classes = new Array();
    this.sections = new Array();
    this.primengDatatableHelper.resizableColumns = true;
    this.primengDatatableHelperStaff.resizableColumns = true;
    this.roleId = this.userService.CurrentUserRoleId;
    this.isAdmin = this.userService.CurrentUserRoleId == 1 || this.userService.CurrentUserRoleId == 2
    this.initializeUpdateForm();
  }

  initializeUpdateForm() {
    this.updateUserForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      middleName: new FormControl(),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      studentClass: new FormControl('', [Validators.required]),
      facultyClass: new FormControl('', [Validators.required]),
      studentSection: new FormControl('', [Validators.required]),
      facultySection: new FormControl('', [Validators.required]),
      rollNumber: new FormControl('', [Validators.required]),
      email: new FormControl(),
      contact: new FormControl(),
      dateOfBirth: new FormControl('', [Validators.required])
    });
  }

  getAllStudents(event?: LazyLoadEvent) {

    if (this.primengDatatableHelper.shouldResetPaging(event)) {
      this.studentpaginator.changePage(0);

      return;
    }
    this.primengDatatableHelper.showLoadingIndicator();
    let pageIndex = this.primengDatatableHelper.getPageIndex(this.studentpaginator, event);
    let pageSize = this.primengDatatableHelper.getMaxResultCount(this.studentpaginator, event);
    this.userService.getAllStudents(pageIndex, pageSize)
      .subscribe(res => {

        if (res) {
          this.primengDatatableHelper.totalRecordsCount = res[0].totalCount;
          this.primengDatatableHelper.records = res;
          this.primengDatatableHelper.hideLoadingIndicator();
        }
        else {
          this.primengDatatableHelper.records = null;
        }
      })
  }

  getAllStaffs(event?: LazyLoadEvent) {

    if (this.primengDatatableHelperStaff.shouldResetPaging(event)) {
      this.staffpaginator.changePage(0);

      return;
    }
    this.primengDatatableHelperStaff.showLoadingIndicator();
    let pageIndex = this.primengDatatableHelperStaff.getPageIndex(this.staffpaginator, event);
    let pageSize = this.primengDatatableHelperStaff.getMaxResultCount(this.staffpaginator, event);
    this.userService.getAllStaffs(pageIndex, pageSize)
      .subscribe(res => {
        if (res) {
          this.primengDatatableHelperStaff.totalRecordsCount = res[0].totalCount;
          this.primengDatatableHelperStaff.records = res;
          this.primengDatatableHelperStaff.hideLoadingIndicator();
        }
        else {
          this.primengDatatableHelperStaff.records = null;
        }
      })
  }

  showUserProfile(userId: number) {
    this.userService.getUserProfile(userId).subscribe(data => {
      this.userProfileDetails = data;
      let parts = this.userProfileDetails.dob.split(/[- T]/);
      let formatedDate = `${parts[1]}/${parts[2]}/${parts[0]}`;
      this.userProfileDetails.dob = formatedDate;
      this.getAllClasses();
      this.getAllSections();
      this.showUpdateUser = true;
    }, error => {

    });
  }

  getAllClasses() {
    this.commonService.getClasses().subscribe(data => {
      this.classes = data;
    });
  }
  getAllSections() {
    this.commonService.getSections().subscribe(data => {
      this.sections = data;
    });
  }
  updateUser() {
    this.userService.updateUserProfile(this.userProfileDetails).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Update User', detail: data });
      this.showUpdateUser = false;
      this.updateUserForm.reset();
      this.getAllStudents();
      this.getAllStaffs();
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Update User', detail: error._body });
    })
  }

  cancelUpdate() {
    this.showUpdateUser = false;
    this.updateUserForm.reset();
  }

  userStatusChanged(e,userId) {
    let isChecked: boolean = e.checked;
    var currentUserId = this.userService.getUserId();
    this.userService.updateExistingUserStatus(userId, isChecked, currentUserId).subscribe(data => {
      if (data) {
        this.messageService.add({ severity: 'success', summary: 'User Status', detail: 'User Status Updated Successfully' });
      }
    });
  }
}
