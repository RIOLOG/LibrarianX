import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SinglebookComponent } from './singlebook/singlebook.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddBookComponent } from './addbook/addbook.component';
import { SignupComponent } from './signup/signup.component';
import { authguardGuard } from './authguard.guard';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent  },
  { path: '', component: LoginComponent},
  { path: 'home/details/:bookid', component: SinglebookComponent },
  {path:'home/user/aboutme', component:UserProfileComponent},
  {path:'home/user/addbook', component:AddBookComponent},
  {path:'signup', component:SignupComponent},
  {path:'home/user/dashboard', component:MyDashboardComponent}
];


@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
})
export class AppRoutingModule { }
