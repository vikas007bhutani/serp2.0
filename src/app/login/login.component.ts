import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';
import { AuthService } from '../services/auth.service';
import {LoginRequest} from '../models/loginRequestModel';
import {MessageService} from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(100%)', opacity: 0}),
        animate('200ms ease-in', style({transform: 'translateX(0%)', opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translateX(0)', opacity: 1}),
        animate('200ms ease-in', style({transform: 'translateX(100%)', opacity: 0}))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  
  userName:string;
  password:string;
  schoolId:string;
  loginForm: FormGroup;


  userNameForSignUp:string;
  passwordForSignUp:string;
  schoolIdForSignUp:string;
  signUpForm: FormGroup;

  loginVisible:boolean;
  signUpVisible:boolean;
  
    constructor(private fb: FormBuilder,private router:Router,private authService:AuthService,private messageService:MessageService) {
        this.loginForm = fb.group({
            schoolId:['',Validators.required],
            userName: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });

        this.signUpForm = fb.group({
          schoolIdForSignUp:['',Validators.required],
          userNameForSignUp: ['', Validators.required],
          passwordForSignUp: ['', [Validators.required, Validators.minLength(8)]]
      });
      }
  
  ngOnInit() 
  {
       this.loginVisible = true;
  }

  onLogin()
  {
    var requestModel = new LoginRequest();
    requestModel.userName = this.userName;
    requestModel.password = this.password;
    this.authService.login(this.schoolId,requestModel).subscribe(data=>
    {
      var i = window.btoa(requestModel.userName+":"+requestModel.password);
      localStorage.setItem("authorizationData",i);
      localStorage.setItem("auth", JSON.stringify(data));
      this.router.navigate(['landing']);
    },
    error=>{
      this.messageService.add({severity:'error', summary:'Logon Failure', detail:"error"});
    });
  }

  onSignUp()
  {
    
  }
    
  showSignUp()
  {
    this.loginVisible = false;
    this.signUpVisible = true;
  }

  showLogin()
  {
    this.loginVisible = true;
    this.signUpVisible = false;
  }
}
