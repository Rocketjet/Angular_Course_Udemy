import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  serverElements = [
    { type: "server", name: "Test server", content: "Just a test server!" },
  ];
  oddNumbers: number[] = [];
  evenNumbers: number[] = [];

  onServerAdded(serverData: { serverName: string; serverContent: string }) {
    this.serverElements.push({
      type: "server",
      name: serverData.serverName,
      content: serverData.serverContent,
    });
  }

  onBlueprintAdded(blueprintData: {
    serverName: string;
    serverContent: string;
  }) {
    this.serverElements.push({
      type: "blueprint",
      name: blueprintData.serverName,
      content: blueprintData.serverContent,
    });
  }

  onIntervalInit(lastNumber: number) {
    if (lastNumber % 2 === 0) {
      this.evenNumbers.push(lastNumber);
    }
    this.oddNumbers.push(lastNumber);
  }

  ngOnInit(): void {}
}
