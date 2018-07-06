import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, CanActivate, RouterStateSnapshot } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthGaurd implements CanActivate {

    private jwtHelper: JwtHelper = new JwtHelper();
    constructor(private router: Router) {
       
    }

    canActivate(): boolean {
        const routerStateSnapshot: RouterStateSnapshot = this.router.routerState.snapshot;
        var result: boolean = false;
        if (this.router.navigated) {
            result = this.checkAuthentications();
        }
        else {
            result = this.checkAuthentications();
        }
        return result;
    }

    checkAuthentications(): boolean {
        let result: boolean = true;  
        
        //code here authentication stuffs
        
        return result;
        
    }
}