import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { signin } from '../models/model';
import { ToastrModule } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authError: string = '';
  showLogin: boolean = true;

  constructor(private user: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user.userAuthReload();
  }

    onSubmit(data : signin){
      this.user.signIn(data);
      this.user.inValidUserAuth.subscribe((result) => {
        if (result)
        {
          alert("Login Successfully");
          this.router.navigate(['home/user/aboutme'])
        }
        else
        {
          alert("Invalid Credentials");
          this.router.navigate(['home/user/aboutme'])
        }
      });
    }

  move(): void {
    this.router.navigate(['/signup']);
  }
}
