import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Rx';
import { User } from '../models/user';

@Injectable()
export class AuthService {

	private BASE_URL: string = 'http://localhost:8000';
	private headers: Headers = new Headers({'Content-Type': 'application/json'});
	private isAuthenticated = new Subject<boolean>();
	isAuth$ = this.isAuthenticated.asObservable();

	constructor(private http:Http,private router:Router) { }

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

	verify(token:string): Promise<any>{
		let url = `${this.BASE_URL}/verify`;
		let data = {
			'token': `${token}`
		};
		return this.http.post(url,data,{headers : this.headers})
						.toPromise()
						.then(res => {
							if (res.json().token !== token)
								this.logout();
							Promise.resolve(true);
						})
		                .catch(err => {
		                	this.isAuthenticated.next(false);
		                	this.handleError(err);
		                });
	}

	loginSuccess(token:string){
		this.isAuthenticated.next(true);
		localStorage.setItem('token',token);
		this.router.navigate(['/dashboard']);
		return Promise.resolve(true);
	}

	removeUser(token:string): Promise<any>{
		let url = `${this.BASE_URL}/delete`;
		let headers = new Headers({
			'Content-Type': 'application/json',
			Authorization: `${token}`
		});
		return this.http.delete(url,{headers : headers})
						.toPromise()
						.then(res => res.json().status)
		                .catch(this.handleError);
	}

	logout(){
		localStorage.clear();
		window.location.reload();
		return Promise.reject("fail");
	}

	private handleError(err:any):Promise<any> {
	  return Promise.reject(err.message || err);
	}

}