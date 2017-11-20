import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
  	if (localStorage.getItem('token')) {
      this.router.navigate(['/dashboard']);
  	  return false;
  	}
  	else {
  	  return true;
  	}
  }
}
