import {Component, Input, OnInit} from '@angular/core';
import {Opportunity} from "../../../model/opportunity-model";
import {ActivatedRoute} from "@angular/router";
import {ApiResponse} from "../../../model/api-response";
import {OpportunityService} from "../../../services/opportunity.service";

@Component({
  selector: 'app-opportunity-details',
  templateUrl: './opportunity-details.component.html',
  styleUrls: ['./opportunity-details.component.scss']
})
export class OpportunityDetailsComponent implements OnInit {

  opportunityId: number;
  opportunityDetails: Opportunity;

  constructor(private activatedRoute: ActivatedRoute, private opportunityService: OpportunityService) { }

  ngOnInit(): void {
    this.opportunityId = +this.activatedRoute.snapshot.paramMap.get("opportunityId");
    this.getOpportunityDetails();
  }

  private getOpportunityDetails() {
    if (this.opportunityId) {
      this.opportunityService.fetchOpportunityById(this.opportunityId)
        .subscribe(
          (data) => {
            this.opportunityDetails = data;
            // console.log(this.opportunityDetails.accounts)
          },
          (error) => {
            // this.errorService.showSomeThingWentWrongMessage();
          }
        );
    }
  }

}
