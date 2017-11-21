import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Blog } from '../models/blog';

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

	private handleError(err:any):Promise<any> {
	  return Promise.reject(err.message || err);
	}

}
