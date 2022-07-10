import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number; name: string; };
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params["id"], //така реалізація дає можливість отримати дані з адресного рядка з відповідних параметрів при першій ініціалізації компонента. Якщо потім ми програмно передамо нові параметри запиту з середини цього компонента, Angular не буде оновлювати компонент. Тому, якщо ми використовували дані з параметрів запиту на сторінці, вони не будуть оновлені.
      name: this.route.snapshot.params["name"],
    };
    this.paramsSubscription = this.route.params
      .subscribe( // цей метод може приймати 3 функції як аргументи
        (params: Params) => {
          this.user.id = params['id'];
          this.user.name = params['name'];
        } // Params - належить до Observables. Це функціонал, який доданий сторонньою бібліотекою rxjs, але широко використовується в Angular. Він реалізує паттерн "асинхронного наглядача", що в даному випадку і відбувається. Observable це легий спосіб підписатись на якусь асинхронну подію, яка може відбутися в певний момент часу.
        // Весь код всередині subscribe() буде виконано лише тоді, коли відбудуться якісь зміни в params
    );
  }
  ngOnDestroy(): void {
    this.paramsSubscription.
      unsubscribe(); //цей метод тут використовувати не обов'язково, так як Angular очищає підписки автоматично, коли компонент видаляється. Але це потрібно буде робити, коли ми будемо створювати свої власні Observables.
  }
}
