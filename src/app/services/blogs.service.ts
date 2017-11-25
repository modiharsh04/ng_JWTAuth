import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Blog } from '../models/blog';
import { User } from '../models/user';

@Injectable()
export class BlogsService {
	private BASE_URL: string = 'http://localhost:8000';
	private headers: Headers = new Headers({'Content-Type': 'application/json'});

	constructor(private http:Http) { }

	getBlogs(): Promise<Blog[]> {
		let url = `${this.BASE_URL}/blogs`;
		return this.http.get(url,{headers:this.headers})
				.toPromise()
				.then(res => res.json().blogs as Blog[])
				.catch(this.handleError);
	}

	getUser(token:string):Promise<User>{
		let url = `${this.BASE_URL}/user`;
		let headers = new Headers({
			'Content-Type': 'application/json',
			Authorization: `${token}`
		});
		return this.http.get(url,{headers : headers})
						.toPromise()
						.then(res => {
							if (res.json().status === 'success'){
								return res.json().data as User
							} else {throw Error(res.json().data)}
						})
		                .catch(err => this.handleError);
	}

	private handleError(err:any):Promise<any> {
	  return Promise.reject(err.message || err);
	}

}
