import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InnerRoutingModule } from './inner-routing.module';
import { OpportunityHomeComponent } from './opportunity/opportunity-home/opportunity-home.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MaterialModule} from "../shared/material/material.module";
import {NgxSpinnerModule} from "ngx-spinner";




@NgModule({
  declarations: [OpportunityHomeComponent],
  imports: [
    CommonModule,
    InnerRoutingModule,
    MatFormFieldModule,
    MaterialModule,
    NgxSpinnerModule
  ]
})
export class InnerModule { }
