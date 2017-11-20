import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ValidGuard implements CanActivate{
  constructor(private router:Router){}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
  	if (localStorage.getItem('token')) {
  	  return true;
  	}
  	else {
  	  this.router.navigate(['/login']);
  	  return false;
  	}
  }
}
