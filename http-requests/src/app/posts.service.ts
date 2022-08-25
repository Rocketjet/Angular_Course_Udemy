import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  error = new Subject<string>();
  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title, content };
    this.http
      .post<{ name: string; }>(
        'https://ng-complete-guide-f6bd5-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        postData,
        {//!Інколи, коли нам потрібен весь об'єкт Response, a не лише тіло відповіді, ми можемо його отримати, вказавши в POST запиті потрібу опцію для OBSERVE 
          // observe: 'body' body - дефолтне значення, яке говорить повернути як RESPONSE лише його тіло
          observe: 'response' // Повертатиметься весь об'єкт HttpResponse
          /* 
            body: {name: '-N8YHgdhfxV0aRkR3rpL'}
            headers: HttpHeaders {normalizedNames: Map(0), lazyUpdate: null, lazyInit: ƒ}
            ok: true
            status: 200
            statusText: "OK"
            type: 4
            url: "https://ng-complete-guide-f6bd5-default-rtdb.europe-west1.firebasedatabase.app/posts.json"
          */
        }
      )//!Також потрібно пам'ятати, що якщо ми не підписуємось на відповідь, колл робитися не буде. Так це задумано розробниками Angular
      .subscribe(responseData => {
        console.log(responseData);
      }, error => { //!ERROR Handling with Subject
        this.error.next(error.message);
      });
  }

  fetchPosts() {
    /* let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key'); */
    //!Код вище дає можливість додати більше одного параметра в params. При цьому додано буде обидва параметра, вони не замінятимуть один одного
    // params: searchParams
    return this.http.get<{ [key: string]: Post; }>(
      'https://ng-complete-guide-f6bd5-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      {
      headers: new HttpHeaders({ 'Custon-Header': 'Hello' }),
      params: new HttpParams().set('print', 'pretty') //до URL буде додано вкінці ?print=pretty. Цей параметр форматує Response
    })
      .pipe(
        map(responseData => {
          const postArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({ ...responseData[key], id: key });
            }
          }
          return postArray;
        }),
        catchError(errorRes => { //!Another way of handling ERRORS
          return throwError(errorRes); //throwError yield a new Observable by wrapping an error
        }));
  }

  clearPosts() {
    return this.http.delete(
      'https://ng-complete-guide-f6bd5-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      {
        observe: 'events', //!Observe цього типу дає можливість дізнатись, на якій стадії зараз наш запит, наприклад
        responseType: 'json' //json - дефолтне значення, що означає, що дані в тілі відповіді будуть типу json і це говорить Ангуляру, що він повинен автоматично спарсити його і перетворити в JS об'єкт
        // 'text' - залишити як текст
        // 'blob' - якщо це файл наприклад
        //Є і нші значення. Ця опція корисна, коли нам потрібно сказати Ангуляру, у випадку коли ми справді у відповідь отримуємо наприклад текст, що ми не хочемо, щоб він парсив тіло відповіді у JS об'єкт, або якщо ми таки отримуємо у відповідь JS об'єкт, але не хочемо, щоб Ангуляр його парсив, бо ми хочемо це зробити потім в якийсь інший момент виконання коду
      }
    ).pipe(
      tap(event => {
        console.log(event);
        //при надсиланні запиту вище, спочатку прийде подія типу 0 - {type: 0}, що є HttpEventType.SENT, після HttpEventType.Response = type: 4, тобто event повертає нам тип події, а при порівнняні його з HttpEventType ми можемо точно знати яка подія відбувається на данному етапі і відповідно далі робити потрібні нам дії 
        if (event.type === HttpEventType.Response) {
          console.log(event.body);
        }
      }));
  }
}
