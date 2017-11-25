import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class ValidGuard implements CanActivate{
  constructor(private router:Router){}
  canActivate(): Promise<boolean> | boolean {
  	if (tokenNotExpired())
  	  return true;
	this.router.navigate(['/login']);
	return false;
  }
}
