import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[appUnless]",
})
export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
    //appUnless() це властивість, хоч і є методом, до якої ми прив'язуємось, спрацює, коли зміниться параметр, який передається в цей метод. Ключове слово set це setter
    console.log('appUnless @Input triggered', condition);
    if (condition) {
      this.vcRef.createEmbeddedView(this.templateRef); //цей метод створює розмітку у ViewContainer до якого ми звертаємось
    } else {
      this.vcRef.clear(); //цей метод видаляє розмітку з ViewContainer
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef
  ) {
    console.log('appUnless directive created');
  }
  //в templateRef буде посилання на наш HTML код, тобто те, ЩО потрібно відобразити, в vcRef буде вказано ДЕ це треба відобразити
}
