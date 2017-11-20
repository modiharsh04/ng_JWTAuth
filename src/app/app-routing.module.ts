import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ValidGuard } from './guard/valid.guard';
import { LoginGuard } from './guard/loginRedirect.gaurd';


const routes: Routes = [
	{ 
		path:'dashboard',
		component:DashboardComponent,
		canActivate:[ValidGuard]
	},
	{ 
		path:'login',
		component:LoginComponent,
		canActivate : [LoginGuard]
	},
	{ 
		path:'register', 
		component:RegisterComponent,
		canActivate: [LoginGuard]
	},
	{ path:'', redirectTo: 'dashboard',pathMatch:'full'}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes)],
	exports: [ RouterModule ]
})

export class AppRoutingModule {}