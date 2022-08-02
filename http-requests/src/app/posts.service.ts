import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.interface';
import { catchError, map } from 'rxjs/operators';
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
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      }, error => { //!ERROR Handling with Subject
        this.error.next(error.message);
      });
  }

  fetchPosts() {
    return this.http.get<{ [key: string]: Post; }>('https://ng-complete-guide-f6bd5-default-rtdb.europe-west1.firebasedatabase.app/posts.json',)
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
        catchError(errorRes => { //!Another way of handling error
          return throwError(errorRes); //throwError yield a new Observable by wrapping an error
        }));
  }

  clearPosts() {
    return this.http.delete('https://ng-complete-guide-f6bd5-default-rtdb.europe-west1.firebasedatabase.app/posts.json');
  }
}
