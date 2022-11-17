import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private api: ApiService) {}

  signup(credentials) {
    this.api.signup(credentials).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {}
    );
  }

  login(credentials) {
    this.api.login(credentials).subscribe((res) => console.log(res));
  }
}
