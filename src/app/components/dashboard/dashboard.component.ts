import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit() {
  }

  removeUser(){
    console.log(localStorage.getItem('token'))
    this.auth.removeUser(localStorage.getItem('token'))
              .then(res => {
                if (res === 'success'){
                  localStorage.clear();
                  window.location.reload();
                }
              }).catch(err => console.log(err));
  }
}
