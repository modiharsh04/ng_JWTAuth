import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  loggedIn:boolean = false;

  constructor(private auth:AuthService) { 
    this.auth.isAuth$.subscribe(val => this.loggedIn = val);
  }

  ngOnInit() {
  	this.loggedIn =  this.checkLogin();
  }

	checkLogin():boolean {
		if (localStorage.getItem('token') !== null)
			return true;
		return false
	};

  logout(){
    this.auth.logout();
  }

}
