import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanDeactivateComponent } from 'src/guards/can-deactivate.guard';
import { Auth } from '../entities/auth';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, CanDeactivateComponent {
  auth = new Auth();
  originalAuth = new Auth();
  submitted = false;

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
          this.submitted = true;
          console.log("Login successful");
          this.router.navigateByUrl(this.userService.redirectAfterLogin);
          this.userService.setDefaultRedirect();
        } 
      } );
  }

  canDeactivate(): boolean | Observable<boolean> {
    console.log("Deactivate guard v login komponente použitý");
    if (this.originalAuth.name === this.auth.name && 
        this.originalAuth.password === this.auth.password)
      return true;
    if (this.submitted)
      return true;
    return window.confirm("Vyplnili ste údaje. Naozaj chcete odísť?");
  }
}
