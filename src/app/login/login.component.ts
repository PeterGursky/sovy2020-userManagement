import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../entities/auth';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  auth = new Auth();

  constructor(private userService: UsersService, 
              private router: Router) { }

  ngOnInit(): void {
  }

  get printAuth() {
    return JSON.stringify(this.auth);
  }

  changeName(event) {
    this.auth.name = event.target.value;
  }

  onSubmit() {
    this.userService.login(this.auth).subscribe(
      success => {
        if (success) {
          console.log("Login successful");
          this.router.navigateByUrl("/extended-users");
        } 
      } );
  }
}
