import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { ValidGuard } from './guard/valid.guard';
import { LoginGuard } from './guard/loginRedirect.gaurd';


const routes: Routes = [
	{ 
		path:'dashboard',
		component:DashboardComponent,
		canActivate:[ValidGuard]
	},
	{ 
		path:'register', 
		component:RegisterComponent,
		canActivate: [LoginGuard]
	},
	{ 
		path:'login',
		component:LoginComponent,
		canActivate : [LoginGuard]
	},
	{ 
		path:'blogs',
		component:BlogsComponent
	},
	{ path:'', redirectTo: 'dashboard',pathMatch:'full'}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes)],
	exports: [ RouterModule ]
})

export class AppRoutingModule {}