import { Component, OnInit } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit() {

  }
}
