import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //модифікувати запит напряму всередині перехоплювача не можна, так як він іммутабельний
    //це робить через клонування методом clone()
  
    const modifiedRequest = req.clone({
      //url: 'some-new-url' - як приклад модифікації запиту
      headers: req.headers.append('Auth', 'secure_key') // - таким чином можна в клон запиту передати заголовки з оригінального запиту і додати нові 
    });//всередині цього об'єкта можна перезаписати потрібні нам параметри запиту
    return next.handle(modifiedRequest);
  }
}
//Interceptor - перехоплювач. Що він робить? Він, так би мовити, перехоплює наш запит, і дає можливість виконанти певні дії до того, як запит буде відправлено і прям перед тим як відповідь буде передано до subscribe().
//Для того, щоб дозволити запиту продовжити свій рух, потрібно викликати метод next() і повернути результат