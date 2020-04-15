import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-opportunity-jobs',
  templateUrl: './opportunity-jobs.component.html',
  styleUrls: ['./opportunity-jobs.component.scss']
})
export class OpportunityJobsComponent implements OnInit {

  @Input() opportunityId: number;
  constructor() { }

  ngOnInit(): void {
  }

}
