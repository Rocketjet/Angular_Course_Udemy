import { Component, OnInit, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-game-control",
  templateUrl: "./game-control.component.html",
  styleUrls: ["./game-control.component.css"],
})
export class GameControlComponent implements OnInit {
  interval;
  @Output() intervalInit = new EventEmitter<number>();
  lastNumber = 0;
  alertWindow = false;
  constructor() {}

  onStartGame(): void {
    if (!this.alertWindow) {
      alert("look into the console");
    }
    this.alertWindow = !this.alertWindow;
    this.interval = setInterval(() => {
      this.intervalInit.emit(this.lastNumber + 1);
      this.lastNumber++;
    }, 1000);
  }

  onStopGame(): void {
    clearInterval(this.interval);
  }

  ngOnInit(): void {}
}
