
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  profile: User | undefined;

  constructor(private router: Router, private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void
  {
    this.Login();
  }

  private Login(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('user')) {
          this.isLoggedIn = true;
          let user = localStorage.getItem('user');
          let userdata = user && JSON.parse(user);
          let id = userdata;
          this.userService.getUserbyId(id).subscribe((result) => {
            this.profile = result;
          });
        } 
        else
        {
          this.isLoggedIn = false;
        }
      }
    });
  }

  logout(): void {
    localStorage.removeItem('user');
    this.toastr.success("User Logout Successfully");
    this.router.navigate(['']);
  }
}
