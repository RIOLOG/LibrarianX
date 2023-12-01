import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { signup } from '../models/model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent {
  username: string | undefined;
  password: string | undefined;
  name : string | undefined;

  constructor(private user: UserService, private router: Router, private toastr: ToastrService) { }

  signUp(data: signup) {
    this.user.signUp(data).subscribe((result) => {
      if (result) {
        this.toastr.success("User Registered Successfully");
        this.router.navigate(['']);
      }
    })
  }

  movelogin(): void {
    this.router.navigate(['']);
  }
}