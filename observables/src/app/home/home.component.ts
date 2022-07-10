import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { filter, map } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSub: Subscription;

  constructor() {}

  ngOnInit() {
    /* this.firstObsSub = interval(1000).subscribe(count => { //кожну секунду в консоль буде виводитись число починаючи з 0
      console.log(count); //interval() - сервісний метод rxjs
    }) */
    const customIntervalObservable = new Observable((observer) => {
      //кастомний Observable який повторює функціонал метода interval()
      let count = 0;
      setInterval(() => {
        observer.next(count); //?next() створює нову подію з даними, які ми передаємо
        if (count === 2) {
          observer.complete(); //?complete() - метод завершує роботу Observable
        }
        if (count > 3) {
          observer.error(new Error("An error occured!")); //коли виникає помилка, Observable видаляється
        }
        count++;
      }, 1000);
    });

    this.firstObsSub = customIntervalObservable //оператори всередині pipe() будуть виконуватися по черзі
      .pipe(
        filter((data) => {
          return data > 0;
        }),
        map((data: number) => {
          return `Round ${data + 1}`;
        })
      )
      .subscribe(
        //handler functions ---->>>
        (data) => {
          //тут ми підписуємось на цю подію, тобто як тільки викликається метод next() ми отримуємо дані, які були в нього передані і виконуємо з ними потрібні нам дії
          console.log(data);
        },
        (error) => {
          //таким чином ми хендлимо помилку + можемо обробити її так як нам потрібно. Також потрібно пам'ятати, що якщо все ж виникає помилка, то метод completed() вже не спрацює, якщо ми його використовували
          console.log(error);
          alert(error.message);
        },
        () => {
          console.log("Completed!");
        }
      );
  }
  ngOnDestroy(): void {
    this.firstObsSub.unsubscribe(); // важливо скасувати підписку, так як якщо цього не зробити, метод interval() буде працювати безперервно, навіть якщо ми перейдемо по іншому маршруту і відповідно до іншого компоненту. Також при поверненні до компоненту, де ми встановили підписку, якщо її не скасувати, метод спрацює повтрно і почнеться новий відлік, паралельно зі старим.
  }
}
