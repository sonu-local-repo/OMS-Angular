import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {OpportunityHomeComponent} from "./opportunity-home/opportunity-home.component";
import {OpportunityDetailsComponent} from "./opportunity-details/opportunity-details.component";
import {OpportunityCalenderComponent} from "./opportunity-calender/opportunity-calender.component";


const route: Routes = [
  {
    path:'', component: OpportunityHomeComponent,
  },
  {
    path: ':opportunityId', component: OpportunityDetailsComponent
  },
  {
    path: 'calender', component: OpportunityCalenderComponent
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  exports: [RouterModule]
})
export class OpportunityRoutingModule { }
