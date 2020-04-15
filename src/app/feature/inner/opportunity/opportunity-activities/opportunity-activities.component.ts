import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-opportunity-activities',
  templateUrl: './opportunity-activities.component.html',
  styleUrls: ['./opportunity-activities.component.scss']
})
export class OpportunityActivitiesComponent implements OnInit {

  @Input() opportunityId: number;
  constructor() { }

  ngOnInit(): void {
  }

}
