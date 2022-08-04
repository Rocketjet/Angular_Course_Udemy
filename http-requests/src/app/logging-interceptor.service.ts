import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
export class LoggingInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Outgoing Request');
    console.log(req.url);
    console.log(req.headers);
    return next.handle(req).pipe(
      tap(event => { //!Але потрібно пам'ятати, що в перехоплювачі ми завжди отримуємо EVENT
        if (event.type === HttpEventType.Response) {
          console.log('Incoming Response');
          console.log(event.body);
        }
      })
    );//тут ми можемо також отримати доступ до Response у вигляді Observable і взаємодіяти з ним
  }
}
