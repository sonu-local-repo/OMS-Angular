import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Opportunity} from "../../../model/opportunity-model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ContactService} from "../../../services/contact.service";

@Component({
  selector: 'app-opportunity-contact',
  templateUrl: './opportunity-contact.component.html',
  styleUrls: ['./opportunity-contact.component.scss']
})
export class OpportunityContactComponent implements OnInit {

  @Input() opportunityDetails: Opportunity;
  contact;

  contatList:MatTableDataSource<any> = new MatTableDataSource([]);
  displayedColumns: string[] = ['id', 'name',  'source', 'dueDate', 'priority', 'type','status', 'createdAt'];
  // screenName = ScreenName;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.addressModification(this.opportunityDetails.accounts)
    this.contatList.data = this.opportunityDetails.accounts;
  }

}
