import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Rx';
import { User } from '../models/user';

@Injectable()
export class AuthService {

	private BASE_URL: string = 'http://localhost:8000';
	private headers: Headers = new Headers({'Content-Type': 'application/json'});
	private isAuthenticated = new Subject<boolean>();
	isAuth$ = this.isAuthenticated.asObservable();

	constructor(
		private http:Http,
		private router:Router,
		private jwh:JwtHelper
		) { }

	login(user:User): Promise<any> {
		let url = `${this.BASE_URL}/login`;
		return this.http.post(url, user, {headers: this.headers})
		                .toPromise()
		                .then(res => this.loginSuccess(res.json().token))
		                .catch(this.handleError);
	}

	register(user:User): Promise<any> {
		let url = `${this.BASE_URL}/register`;
		return this.http.post(url, user, {headers: this.headers})
		                .toPromise()
		                .then(res => this.loginSuccess(res.json().token))
		                .catch(this.handleError);
	}

	refresh(token:string){
		let url = `${this.BASE_URL}/refresh`;
		let data = { 'token':token }
		this.http.post(url,data,{headers:this.headers})
				.toPromise()
				.then(res => res.json().token)
				.then(token => this.loginSuccess(token))
				.catch(err => this.logout())
				.catch(err => this.handleError);
	}

	loginSuccess(token:string){
		this.isAuthenticated.next(true);
		localStorage.setItem('token',token);
		this.delay(new JwtHelper().getTokenExpirationDate(token).getTime() - Date.now()-5000)
			.then(()=>{
				if (tokenNotExpired())
					this.refresh(localStorage.getItem('token'));
			})
			.catch(err => this.handleError);
		return Promise.resolve(true);
	}

	logout(){
		localStorage.clear();
		this.isAuthenticated.next(false);
		this.router.navigate(['/blogs']);
	}

	private handleError(err:any):Promise<any> {
	  console.log(err.message || err.data.message || err);
	  return Promise.reject(err.message || err);
	}

	private delay(ms: number) {
	    return new Promise(resolve => setTimeout(resolve, ms));
	}
}