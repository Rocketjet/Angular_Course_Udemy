import { Injectable } from "@angular/core";

// @Injectable({
//   providedIn: "root",
// })
export class CounterService {
  activeToInactiveCounter: number = 0;
  inactiveToActiveCounter: number = 0;

  incrementActiveToInactive() {
    this.activeToInactiveCounter++;
    console.log("file: counter.service.ts ~ line 12 ~ CounterService ~ incrementActiveToInactive ~ this.activeToInactiveCounter", this.activeToInactiveCounter)
  }
  incrementInactiveToActive() {
    this.inactiveToActiveCounter++;
    console.log("file: counter.service.ts ~ line 16 ~ CounterService ~ incrementInactiveToActive ~ this.inactiveToActiveCounter", this.inactiveToActiveCounter)
  }
  constructor() {}
}
