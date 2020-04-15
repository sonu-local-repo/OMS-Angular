import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpportunityRoutingModule } from './opportunity-routing.module';
import { OpportunityDetailsComponent } from './opportunity-details/opportunity-details.component';
import {MaterialModule} from "../../shared/material/material.module";
import {FlexModule} from "@angular/flex-layout";
import { OpportunityContactComponent } from './opportunity-contact/opportunity-contact.component';
import {  OpportunityQuotesComponent} from './opportunity-quotes/opportunity-quotes.component';
import { OpportunitySchedulesComponent } from './opportunity-schedules/opportunity-schedules.component';
import { OpportunityJobsComponent } from './opportunity-jobs/opportunity-jobs.component';
import { OpportunityInvoicesComponent } from './opportunity-invoices/opportunity-invoices.component';
import { OpportunityAttachmentsComponent } from './opportunity-attachments/opportunity-attachments.component';
import { OpportunityActivitiesComponent } from './opportunity-activities/opportunity-activities.component';
import { OpportunityEstimatesComponent } from './opportunity-estimates/opportunity-estimates.component';
import { OpportunityQuoteDescriptionComponent } from './opportunity-quote-description/opportunity-quote-description.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import {NgxSpinnerModule} from "ngx-spinner";
import {CalendarModule, DateAdapter} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { OpportunityCalenderComponent } from './opportunity-calender/opportunity-calender.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CreateScheduleDialogComponent} from "./create-schedule-dialog/create-schedule-dialog.component";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {NgxMatDatetimePickerModule} from "@angular-material-components/datetime-picker";




@NgModule({
  declarations: [
    OpportunityDetailsComponent,
    OpportunityContactComponent,
    OpportunityQuotesComponent,
    OpportunitySchedulesComponent,
    OpportunityJobsComponent,
    OpportunityInvoicesComponent,
    OpportunityAttachmentsComponent,
    OpportunityActivitiesComponent,
    OpportunityEstimatesComponent,
    OpportunityQuoteDescriptionComponent,
    OpportunityCalenderComponent,
    CreateScheduleDialogComponent

  ],
  imports: [
    CommonModule,
    OpportunityRoutingModule,
    MaterialModule,
    FlexModule,
    NgxFileDropModule,
    NgxSpinnerModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    NgxMatDatetimePickerModule


  ]

})
export class OpportunityModule { }
