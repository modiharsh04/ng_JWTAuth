import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	private user:User = new User();
	alrt:boolean = false;

	constructor(private router: Router,private auth:AuthService) { }

	ngOnInit() {}

	login(){
		this.alrt = false
		this.auth.login(this.user)
					.then(token => {
						localStorage.setItem('token',token);
						this.router.navigate(['/dashboard']);
					})
					.catch(err => this.alrt = true);
	}

}
