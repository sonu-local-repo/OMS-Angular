import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-opportunity-estimates',
  templateUrl: './opportunity-estimates.component.html',
  styleUrls: ['./opportunity-estimates.component.scss']
})
export class OpportunityEstimatesComponent implements OnInit {
  @Input() opportunityId: number;
  constructor() { }

  ngOnInit(): void {
  }

}
