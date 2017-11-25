import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(): Promise<boolean> | boolean {
  	if (tokenNotExpired()) {
      this.router.navigate(['/dashboard']);
  	  return false;
  	}
  	return true;
  }
}
