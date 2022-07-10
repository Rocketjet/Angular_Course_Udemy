import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerComponent } from "./servers/server/server.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthGuard } from "./auth-guard.service";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { ErrorPageComponent } from "./error-page-component/error-page.component";
import { ServerResolver } from "./servers/server/server-resolver.service";

//? Модуль, куди ми винесли всі наші маршрути і потім підключили до головного модуля
const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "users",
    component: UsersComponent,
    children: [{ path: ":id/:name", component: UserComponent }],
  },
  {
    path: "servers",
    //? canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
      {
        path: ":id",
        component: ServerComponent,
        resolve: { server: ServerResolver },
      },
      {
        path: ":id/edit",
        canDeactivate: [CanDeactivateGuard],
        component: EditServerComponent,
        // як тільки ми залишимо цей шлях, Angular ініціалізує виконання коду з CanDeactivateGuard
      },
    ],
  },
  // { path: "page-not-found", component: PageNotFoundComponent },
  {
    path: "page-not-found",
    component: ErrorPageComponent,
    data: { message: "Page not found!" }, // властивість data дає можливість передавати статичний контент через додавання пар ключ: значення
  },
  { path: "**", redirectTo: "/page-not-found" },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
