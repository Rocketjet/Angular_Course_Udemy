import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AlertComponent } from './alert/alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  content!: SafeHtml;

  constructor(injector: Injector, domSanitizer: DomSanitizer) {//Injector - класс, який реалізує можливість додавання залежностей і дає змогу компоненту бути доданим динамічно в html і мати зв'язок за нашим angular застосунком
    //Так як наш кастомний компонент це врешті-решт js код, ми не можемо його просто так відрендерити всередині HTML. Цьому запобігає спеціальний захисний механізм. Але в даному випадку ми знаємо, що наш контент безпечний, тому щоб обійти його, викор. DomSanitizer
    const AlertElement = createCustomElement(AlertComponent, { injector: injector });
    customElements.define('alert-component', AlertElement);//customElements - клас, який надається JS API, не є частиною  Angular. Метод define дає можливість зареєструвати наш кастомний web component
    setTimeout(() => {
      this.content = domSanitizer.bypassSecurityTrustHtml("<alert-component message='This is normal angular component!'></alert-component>");
        //"<app-alert message='This is normal angular component!'></app-alert>";відрендерити всередині нашого компонента інший компонент динамічно таким чином неможливо, бо після компіляції застосунку (етап, коли Ангуляр вміє розрізняти звичайні html елементи від наших компонентів), Ангуляр не розуміє, що це за елемент app-alert.
      //Для таких цілей і потрібна фіча Angular Elements
    }, 1000);
  }
}
