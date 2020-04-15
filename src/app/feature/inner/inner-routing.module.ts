import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {InnerComponent} from "./inner.component";
import {OpportunityCalenderComponent} from "./opportunity/opportunity-calender/opportunity-calender.component";

const route: Routes = [
  {
    path: '', component: InnerComponent,
    children:[
      {
        path:'opportunity', loadChildren: ()=>import('./opportunity/opportunity.module').then(m=>m.OpportunityModule)
      },
      {
        path: 'calender', component: OpportunityCalenderComponent
      }
    ]
  }

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  exports:[RouterModule]
})
export class InnerRoutingModule { }
