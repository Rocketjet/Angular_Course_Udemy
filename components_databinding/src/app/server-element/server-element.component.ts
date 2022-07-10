import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ContentChild,
  AfterContentInit,
} from "@angular/core";

@Component({
  selector: "app-server-element",
  templateUrl: "./server-element.component.html",
  styleUrls: ["./server-element.component.css"],
  encapsulation: ViewEncapsulation.Emulated, //None, Native (Shadow DOM - not supported with all browsers), Emulated - Angular technology, default value
})
export class ServerElementComponent implements OnInit, AfterViewInit, AfterContentInit {
  @Input("srvElement") element: { type: string; name: string; content: string };
  @ViewChild("heading", { static: true }) header: ElementRef; //отримуємо доступ до елемента, що знаходиться в теймплейті цього компонента
  @ContentChild('contentParagraph' ,{ static: true }) paragraph: ElementRef; //отримуємо доступ до елемента, що знаходиться в темплейті, але вставлений через <ng-content></ng-content>

  constructor() {}

  ngAfterViewInit(): void {
    console.log("Text content: " + this.header.nativeElement.textContent); // доступ до контенту елемента ми отримаємо лише після того, як спрацює цей хук, не раніше
  };
  ngAfterContentInit(): void {
    console.log("Text content: " + this.paragraph.nativeElement.textContent);
    //будь-які дані з властивості __paragraph__ ми зможемо отримати лише після того, як буде викликано цей хук
  }

  ngOnInit(): void {}
}
