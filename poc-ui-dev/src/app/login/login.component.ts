import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';

const errorMap = {
  404: 'Incorrect user or password ',
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  credentials;
  errorMsg;

  constructor(
    private api: ApiService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.credentials = {
      email: 'ddev@equanimity-ai.com',
      password: '12345678',
    };

    this.api.login(this.credentials).subscribe(
      (res) => {
        console.log(res);

        if (res.userId) {
          this.userService.setUser(res);
          this.userService.logIn();
          if (res.userRole == 'therapist') {
            this.router.navigate(['/patients']);
          } else {
          }
        }
      },
      (error) => {
        this.errorMsg = errorMap[error];
      }
    );
  }
}
