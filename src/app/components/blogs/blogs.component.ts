import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../../services/blogs.service';
import { Blog } from '../../models/blog';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
	private blogs:Blog[];

  constructor(private blogService:BlogsService) { }

  ngOnInit() {
  	this.blogService.getBlogs()
  					.then(blogs => this.blogs = blogs)
  					.catch(err => console.log(err));
  }

}
