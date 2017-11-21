import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedIn:boolean = false;

  constructor() { }

  ngOnInit() {
  	this.loggedIn =  this.checkLogin();
  }

	checkLogin():boolean {
		if (localStorage.getItem('token') !== null)
			return true;
		return false
	};

  logout(){
    localStorage.clear();
    window.location.reload();
  }

}
