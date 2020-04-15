import {Component, OnInit, Inject, Optional, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';
// import { DatePipe } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Scheduler} from "../../../model/scheduler.model";
import {ScheduleEvent} from "../../../model/scheduleevent";
import {SchedulerService} from "../../../services/scheduler.service";
import {DatePipe} from "@angular/common";
import { AmazingTimePickerService } from 'amazing-time-picker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import {EmployeeService} from "../../../services/employee.service";
import {map} from "rxjs/operators";
import {Employee} from "../../../model/employee.model";
import {QuoteService} from "../../../services/quote.service";
import {ScheduleModel} from "../../../model/schedule.model";

@Component({
  selector: 'app-create-schedule-dialog',
  templateUrl: './create-schedule-dialog.component.html',
  styleUrls: ['./create-schedule-dialog.component.scss'],
})
export class CreateScheduleDialogComponent implements OnInit {
  calendarEvent: CalendarEvent;
  eventForm: FormGroup;
  startTime = '';
  startDate: Date;
  endDate: Date;
  endTime = '';
  quoteId = 0;
  quoteLineIds: number;
  @ViewChild('beginDate',{static: false }) beginningDate;
  @ViewChild('endDate',{static: false }) endingDate;
  employees: Employee[]=[];

  constructor(
    private datePipe: DatePipe,
    private atp: AmazingTimePickerService,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<CreateScheduleDialogComponent>,
    private schedulerService: SchedulerService,
    private quoteService: QuoteService,
    @Optional() @Inject(MAT_DIALOG_DATA) private schedulerArguments: Scheduler
  ) {
    // tslint:disable-next-line:no-string-literal
    this.calendarEvent = schedulerArguments.event;
    this.quoteId = schedulerArguments.quoteId;
    this.quoteLineIds = schedulerArguments.quoteLineId;
    this.startDate = this.calendarEvent.start;
    this.endDate = this.calendarEvent.end;
    this.endDate = this.calendarEvent.end;
    this.startTime = this.startDate.toTimeString();
    // this.endTime = this.endDate.toTimeString();
    this.endTime = new Date().toTimeString();
  }

  ngOnInit() {
    this.createEventForm();
/*    this.startTime = this.datePipe.transform(this.startDate,'hh:mm');
    this.endTime= this.datePipe.transform(this.endDate,'hh:mm');*/
    // console.log(this.startTime)
    this.employeeService.fetchAllEmployees().subscribe(employee=>{
     this.employees = employee;

    });
  }


  createEventForm() {
    this.eventForm = this.fb.group({
      startDate: [this.startDate, Validators.required],
      endDate: [this.endDate, Validators.required],
      startTime: [this.startTime, Validators.required],
      endTime: [this.endTime, Validators.required],
      timeZone: '',
      title: ['New Event', Validators.required],
      description: this.quoteId ? this.quoteId : '',
      assignee: '',
    });
  }

  saveEvent() {
    // this.beginningDate
    // console.log("Assignee Id: "+this.eventForm.value.assignee.id)
    let schedulerEvent = new ScheduleModel();
    schedulerEvent.start = this.isDST(this.eventForm.value.startDate);
    schedulerEvent.end = this.isDST(this.eventForm.value.endDate);

    // console.log(new Date().getTimezoneOffset());
    schedulerEvent.title = this.eventForm.get('title').value;
    schedulerEvent.description = this.eventForm.get('description').value;
    schedulerEvent.assignedId = this.eventForm.value.assignee.id;
    schedulerEvent.quoteId = this.quoteId;
    schedulerEvent.quoteLineId = this.schedulerArguments.quoteLineId;
    schedulerEvent.optyId = this.schedulerArguments.opportunityId;
    // console.log(schedulerEvent)
    this.schedulerService.createSchedule(schedulerEvent)
      .subscribe(result => {
        console.log("Created Schedule" + result.id);
        this.quoteService.updateQuoteLineWithScheduleId(this.schedulerArguments.quoteLineId, result.id).subscribe(data=>{
          console.log(data);
        })
    });
    this.dialogRef.close(schedulerEvent);
  }

  selectEmployee() {

  }
  openStartTime() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      // console.log(this.time24To12(time))
      this.startTime = this.time24To12(time);
    });
  }
  openEndTime() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      this.endTime = this.time24To12(time);
    });
  }

   time24To12(a) {
    //below date doesn't matter.
    return (new Date("1955-11-05T" + a + "Z")).toLocaleTimeString("bestfit", {
      timeZone: "UTC",
      hour12: !0,
      hour: "numeric",
      minute: "numeric"
    });
  };

  isDST(d) {
    let jan = new Date(d.getFullYear(), 0, 1).getTimezoneOffset();
    let jul = new Date(d.getFullYear(), 6, 1).getTimezoneOffset();
    // return Math.max(jan, jul) != d.getTimezoneOffset();
    if(Math.max(jan, jul) != d.getTimezoneOffset()){
      return new Date(d.setHours(d.getHours()-4));
    }else{
      return new Date(d.setHours(d.getHours()-5))
    }
  }
}
