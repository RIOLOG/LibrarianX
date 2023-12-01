import { Injectable, EventEmitter } from '@angular/core';
import {signin, signup, User }  from '../models/model'
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

private users: any[] = [];
private currentUser: any = null;


inValidUserAuth = new EventEmitter<Boolean>(false);
private baseUrl = 'https://localhost:7193/api';
constructor(private http: HttpClient, private route: Router, private toastr: ToastrService) { }

signUp(data: signup)
{
  return this.http.post('https://localhost:7193/api/User', data);
}


// https://localhost:7193/api/User/signin?username=chiku&password=12345
signIn(data: signin) 
{
  // console.log(data);
  this.http.get<signup[]>(`${this.baseUrl}/User?username=${data.username}&password=${data.password}`, { observe: 'response' })
    .subscribe(
      (result: HttpResponse<signup[]>) => {
        // const us = (JSON.stringify(result.body));
        // const v = JSON.parse(us);
        // const Id = v.id;
        // console.log(Id);

        if (result && result.body) {
          const us = (JSON.stringify(result.body));
          const v = JSON.parse(us);
          const Id = v.id;
          console.log(Id);
          localStorage.setItem('user', (Id));
          this.toastr.success("Login Successfully");
          // alert("Login Successfully");
          this.route.navigate(['home']);
        }
        else
        {
          // alert("Invalid Credentials");
          this.toastr.error('Invalid Credentials', 'Error');
        }
      },
      (error) => {
        // alert("Invalid Credentials");
        this.toastr.error('Invalid Credentials', 'Error');
        // console.error('Error during sign-in', error);
      }
    );
}

// https://localhost:7193/api/User/8'
getUserbyId(id: number)
{
  return this.http.get<User>(`${this.baseUrl}/User/${id}`);
}

// https://localhost:7193/api/User/return/2/1
returnBook(userId: number, lentId: number) {
  return this.http.get(`${this.baseUrl}/User/return/${userId}/${lentId}`);
}

// https://localhost:7193/api/User/borrow/2/1
borrowBook(userId: number, lentId: number) {
  // console.log("book boroowed use id: ", userId);
  // console.log("book lent user id: ", lentId)
  return this.http.get(`${this.baseUrl}/User/borrow/${userId}/${lentId}`);
}

userAuthReload() {
  if (localStorage.getItem('user')) {
    this.route.navigate(['/']);
  }
}

getCurrentUser(): any {
  return this.currentUser;
}

isLoggedIn(): boolean {
  return this.currentUser !== null;
}

signOut(): void {
  this.currentUser = null;
}



private handleError(error: any) {
  console.error('API error:', error);
  return throwError('Something went wrong. Please try again later.');
}


}
