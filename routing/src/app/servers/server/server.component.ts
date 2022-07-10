import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data, Params, Router } from "@angular/router";
import { AuthService } from "src/app/auth.service";

import { ServersService } from "../servers.service";

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.css"],
})
export class ServerComponent implements OnInit {
  server: { id: number; name: string; status: string; };

  constructor(
    private router: Router,
    private serversService: ServersService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => { 
          this.server = data['server']; //data['server'] ---> resolve: { server: ServerResolver } з app-routing.module.ts
         } //використовуємо альтернативний варіант отримання ID через клас Resolve from "@angular/router";
      );
    // const id = +this.route.snapshot.params["id"]; //приводимо до числа, бо метод, в який ми передаємо ці дані, приймає тип number
    // this.server = this.serversService.getServer(id);
    // this.route.params.subscribe((params: Params) => {
    //   this.server = this.serversService.getServer(+params["id"]);
    // });
  }
  onEdit() {
    this.router.navigate(["edit"], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }
}
 