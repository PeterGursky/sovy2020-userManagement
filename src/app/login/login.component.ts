import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Auth } from '../entities/auth';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  auth = new Auth();
  errorMessage = "";

  constructor(private userService: UsersService) { }

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
        } else {
          this.errorMessage="Zlý login alebo heslo";
          setTimeout(() => this.errorMessage ="", 3000);
        }
      },
      error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 0) {
            this.errorMessage = "Server je nedostupný";
          } else {
            if (error.status >= 400 && error.status < 500) {  
              this.errorMessage = error.error.errorMessage;
            } else {
              this.errorMessage = "chyba servera: " + error.message;
            }
          }
        } else {
          this.errorMessage = "Chyba programátora : " + JSON.stringify(error);
        }
        console.error("Chyba zo servera: ", error)
      } );
  }
}
