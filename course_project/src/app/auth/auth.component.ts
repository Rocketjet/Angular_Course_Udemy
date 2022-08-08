import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginMode = false;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) { }
  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const { email, password } = form.value;
    this.isLoading = true;
    if (this.loginMode) {
      //...
    } else {
      this.authService.signUp(email, password)
        .subscribe(
          res => {
            this.isLoading = false;

            console.log(res);
          }, error => {
            this.isLoading = false;
            this.error = 'An error occured!';
          });
    }

    form.reset();
  }

  ngOnInit(): void {
  }

}
