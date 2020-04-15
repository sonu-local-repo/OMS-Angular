import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {QuoteService} from "../../../services/quote.service";
import {QuoteLineItem} from "../../../model/quote-line-model";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {OpportunityActivitiesComponent} from "../opportunity-activities/opportunity-activities.component";
import {OpportunityQuoteDescriptionComponent} from "../opportunity-quote-description/opportunity-quote-description.component";
import {SelectionModel} from "@angular/cdk/collections";
import {Scheduler} from "../../../model/scheduler.model";
import {OpportunityCalenderComponent} from "../opportunity-calender/opportunity-calender.component";
import {NgxSpinnerService} from "ngx-spinner";


@Component({
  selector: 'app-opportunity-quotes',
  templateUrl: './opportunity-quotes.component.html',
  styleUrls: ['./opportunity-quotes.component.scss']
})
export class OpportunityQuotesComponent implements OnInit {

  @Input() opportunityId: number;
  quoteLines = null;
  selection = new SelectionModel<QuoteLineItem>(true, []);
  selectedIsEmpty = true;
  selectedQuoteLineItems: number[] = [];
  quoteList:MatTableDataSource<QuoteLineItem> = new MatTableDataSource([]);
  displayedColumns: string[] = ['select','id', 'name',  'source', 'dueDate', 'type','status', 'createdAt','description','schedulerId','schedulerStartDt',
    'schedulerEndDt','assignedTo','actions'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private quoteService: QuoteService,private dialog: MatDialog,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.fetchQuoteByOpportunityId(this.opportunityId)
  }

  fetchQuoteByOpportunityId(id: number){
    this.spinner.show();
    this.quoteService.fetchQuoteByOptyId(id).subscribe(data=>{
      this.quoteList.data = data;
      this.quoteLines = data;
      this.spinner.hide();

    }, error => {
      this.spinner.hide();
    })
  }

  openDescription(description: string ) {
  //  console.log(description)
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.width = '120%';
    matDialogConfig.height = '120%';
    matDialogConfig.autoFocus = true;
    matDialogConfig.disableClose = true;
    matDialogConfig.panelClass = 'my-dialog';
    matDialogConfig.data = description;
    const dialogRef = this.dialog.open(OpportunityQuoteDescriptionComponent, matDialogConfig);
  }

  cbChanged($event, row, masterToggle) {
    if (this.quoteLines) {
      if (masterToggle) {
        this.masterToggle();
      }
      const checked = $event ? this.selection.toggle(row) : null;
      this.selectedIsEmpty = this.selection.selected.length === 0 ? true : false;
      return checked;
    }
  }
  masterToggle() {
    if (this.quoteLines) {
      this.isAllSelected()
        ? this.selection.clear()
        : this.quoteList.data.forEach(row => this.selection.select(row));
      this.selectedIsEmpty = this.selection.selected.length === 0 ? true : false;
    }
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.quoteList.data.length;
    return numSelected === numRows;
  }


  checkboxLabel(row?: QuoteLineItem): string {
    if (this.quoteLines) {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
    }

  }

  openScheduler(contact) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minHeight = '50%';
    dialogConfig.maxHeight = '640px';
    const ids = this.selection.selected.map(item => {
      return item.id;
    });
    const schedulerArguments = new Scheduler();
    schedulerArguments.quoteId = contact.quoteId;
    schedulerArguments.quoteLineId = contact.id;
    schedulerArguments.opportunityId = this.opportunityId;
    dialogConfig.data = schedulerArguments;
    // console.log(schedulerArguments)
    this.dialog.open(OpportunityCalenderComponent, dialogConfig).afterClosed().subscribe(data=>{
        this.fetchQuoteByOpportunityId(this.opportunityId);
    }

    );
  }

}


