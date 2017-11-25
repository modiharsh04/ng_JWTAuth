import { BrowserModule,Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { AuthModule } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service'
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ValidGuard } from './guard/valid.guard'
import { LoginGuard } from './guard/loginRedirect.gaurd';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpModule,
    AuthModule
  ],
  providers: [
    AuthService,
    ValidGuard,
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }