import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot }
    from '@angular/router';
import { AuthService } from './auth.service';
  
@Injectable({
  providedIn: 'root'
})
 
export class AuthGuard implements CanActivate {
  
    constructor(
      private authService: AuthService, 
      private router: Router) { }
  
    canActivate(): boolean {
        if(this.authService.isLoggedIn){
          return true;
        }else{
          this.router.navigate(['/login']);
          return false;
        }
    }
  
    // checkLogin(url: string): boolean {
    //     if (this.authService.isLoggedIn) { return true; }
    //     this.authService.redirectUrl = url;
    //     this.router.navigate(['/login']);
  
    //     return false;
    // }
}     
