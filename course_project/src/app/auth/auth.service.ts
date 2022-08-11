import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, BehaviorSubject, tap, throwError } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {//метод яким ми відправляємо дані для авторизації на бекенд вперше (тобто реєструємось)
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCVIMqFQXDu7aJAiEFzsgar2J4nMHZ4BXw',
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(
        catchError(this.handleError),//аналог такого запису --> error => this.handleError(error)
        tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn))
      );
  }

  signIn(email: string, password: string) { //метод, яким ми логінимось як вже зареєстрований юзер
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCVIMqFQXDu7aJAiEFzsgar2J4nMHZ4BXw',
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(
        catchError(this.handleError),//аналог такого запису --> error => this.handleError(error)
        tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn))
      );
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {//Метод, який приймає відповідь з бекенду після REST колу і як side effect створює новий екземпляр класу User, який потім передається в Subject
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user$.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {//Метод де ми централізовано обробляємо помилки чи то при реєстрації чи то при авторизації
    console.log(errorRes);
    let defError = 'An error occured!';
    if (!errorRes.error || !errorRes.error.error) {//додаткова перевірка, у разі якщо повернеться помилка без ключа/вкладеного ключа error, тоді повернемо весь об'єкти помилки
      return throwError(errorRes);
    }
    switch (errorRes.error.error.message) {
      case ('EMAIL_EXISTS'):
        defError = 'This email does not exist';
        break;
      case ('EMAIL_NOT_FOUND'):
        defError = 'This email not found';
        break;
      case ('INVALID_PASSWORD'):
        defError = 'This password is not correct';
        break;
    }
    return throwError(() => new Error(defError));
  }
}
