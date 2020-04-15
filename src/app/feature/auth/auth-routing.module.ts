import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "./auth.component";
import {LoginComponent} from "./login/login.component";

const authRouting: Routes =[
  {
    path: '', component:AuthComponent,
    children:[
      {
        path: 'login', component: LoginComponent
      },
      {
        path: '**', component: LoginComponent
      }
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(authRouting)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
