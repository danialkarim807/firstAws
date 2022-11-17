import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';
import { AuthService } from './auth.service';

const errorMap = {
  404: 'Incorrect user or password ',
};

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  switchTarget = 'sign up';
  email = new FormControl('', [Validators.required, Validators.email]);
  credentials;
  errorMsg;
  hide = true;
  loginForm: FormGroup;

  //for development
  dev_email = 'ddev@equanimity-ai.com';
  dev_password = '12345678';

  constructor(
    private authService: AuthService,
    private api: ApiService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(this.dev_email, [
        Validators.email,
        Validators.required,
      ]),
      password: new FormControl(this.dev_password, [Validators.required]),
    });
  }

  signup() {
    // this.authService.signup(this.email.value, password);
  }

  login(form: FormGroup) {
    if (!this.loginForm.valid) {
      return;
    }
    const formValue = form.value;
    console.log(formValue);

    const email = this.loginForm;
    this.authService.login(formValue);
    // const password;
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.switchTarget = this.isLoginMode ? 'Sign Up' : 'Login';
  }

  onSubmit() {
    console.log(this.loginForm);
    this.isLoginMode ? this.login(this.loginForm) : this.signup();
  }

  // login() {
  //   console.log(this.loginForm.controls['email'].value);
  //   this.api.login(this.credentials).subscribe(
  //     (res) => {
  //       console.log(res);

  //       if (res.userId) {
  //         this.userService.setUser(res);
  //         this.userService.logIn();
  //         if (res.userRole == 'therapist') {
  //           this.router.navigate(['/patients']);
  //         } else {
  //         }
  //       }
  //     },
  //     (error) => {
  //       this.errorMsg = errorMap[error];
  //     }
  //   );
  // }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
