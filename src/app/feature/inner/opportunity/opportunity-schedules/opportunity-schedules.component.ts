import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
import {QuoteLineItem} from "../../../model/quote-line-model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ScheduleEvent} from "../../../model/scheduleevent";
import {SchedulerService} from "../../../services/scheduler.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-opportunity-schedules',
  templateUrl: './opportunity-schedules.component.html',
  styleUrls: ['./opportunity-schedules.component.scss']
})
export class OpportunitySchedulesComponent implements OnInit {

  @Input() opportunityId: number;
  quoteLines = null;
  selection = new SelectionModel<ScheduleEvent>(true, []);
  selectedIsEmpty = true;
  selectedQuoteLineItems: number[] = [];
  scheduleList:MatTableDataSource<ScheduleEvent> = new MatTableDataSource([]);
  displayedColumns: string[] = ['id', 'assignedTo','start','end', 'description'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private schedulerService: SchedulerService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.fetchAllScheduleByOpportunityId();
  }


  fetchAllScheduleByOpportunityId(){
    this.spinner.show();
    this.schedulerService.getScheduleByOpportunity(this.opportunityId).subscribe(data=>{
      this.scheduleList.data = data;
      this.spinner.hide();
    },error => {
      this.spinner.hide();
    });
  }



}
