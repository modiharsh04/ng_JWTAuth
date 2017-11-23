import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	private user:User = new User();
	alrt:string = "";

	constructor(private auth:AuthService) { }

	ngOnInit() {}

	login(){
		this.alrt = ""
		this.auth.login(this.user)
					.then()
					.catch(err => {
						if (err.status!==400)
							this.alrt = "Server error";
						else
							this.alrt = "Wrong credentials";
					});
	}

}
