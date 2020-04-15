import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-opportunity-quote-description',
  templateUrl: './opportunity-quote-description.component.html',
  styleUrls: ['./opportunity-quote-description.component.scss']
})
export class OpportunityQuoteDescriptionComponent implements OnInit {

  constructor( private matDialogRef: MatDialogRef<OpportunityQuoteDescriptionComponent>,
               @Inject(MAT_DIALOG_DATA) public inputData: any) { }

  ngOnInit(): void {

    console.log(this.inputData)
  }

  close() {
    this.matDialogRef.close();
  }
}
