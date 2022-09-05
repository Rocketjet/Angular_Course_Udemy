import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginMode = false;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    const { email, password } = form.value;
    let authObservable: Observable<AuthResponseData>; //Ця змінна потрібна, аби ми могли в одному місці підписатися на результат REST колу, чи то авторизації чи реєстрації

    if (this.loginMode) {
      authObservable = this.authService.signIn(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }

    authObservable.subscribe({
      next: (res) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (errorMessage) => {
        this.error = errorMessage;//ця змінна непотрібна, якщо викор. showAErrorAlert()
        this.showAErrorAlert(errorMessage);
        this.isLoading = false;
      }
    });

    form.reset();//для очистки полів форми
  }

  onHandleError() {
    this.error = null;
  }

  private showAErrorAlert(message: string) {//Метод, в якому ми програмно, з коду, будемо викликати наш компонент AlertComponent

  }

  ngOnInit(): void {
  }

}
