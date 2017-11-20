import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User } from '../models/user';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

	private BASE_URL: string = 'http://localhost:8000';
	private headers: Headers = new Headers({'Content-Type': 'application/json'});

	constructor(private http:Http) { }

	login(user:User): Promise<any> {
		let url = `${this.BASE_URL}/login`;
		return this.http.post(url, user, {headers: this.headers})
		                .toPromise()
		                .then(res => res.json().token)
		                .catch(this.handleError);
	}

	register(user:User): Promise<any> {
		let url = `${this.BASE_URL}/register`;
		return this.http.post(url, user, {headers: this.headers})
		                .toPromise()
		                .then(res => res.json().token)
		                .catch(this.handleError);
	}

	verify(token:string): Promise<any>{
		let url = `${this.BASE_URL}/verify`;
		let headers = new Headers({
			'Content-Type': 'application/json',
			Authorization: `${token}`
		});
		return this.http.post(url,{headers : headers})
						.toPromise()
						.then(res => res.json())
		                .catch(this.handleError);
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

	private handleError(err:any):Promise<any> {
	  return Promise.reject(err.message || err);
	}

}