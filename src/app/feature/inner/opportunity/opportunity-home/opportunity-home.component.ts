import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Opportunity} from "../../../model/opportunity-model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {SearchParam} from "../../../model/search-param";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, map, switchMap} from "rxjs/operators";
import {NgxSpinnerService} from "ngx-spinner";
import {OpportunityService} from "../../../services/opportunity.service";

@Component({
  selector: 'app-opportunity-home',
  templateUrl: './opportunity-home.component.html',
  styleUrls: ['./opportunity-home.component.scss']
})
export class  OpportunityHomeComponent implements OnInit {

  opportunityList:MatTableDataSource<Opportunity> = new MatTableDataSource([]);
  displayedColumns: string[] = ['id', 'name', 'status', 'source', 'dueDate', 'priority', 'type', 'createdAt', 'actions'];
  // screenName = ScreenName;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('searchRef', { static: true }) searchRef: ElementRef;
  isLoadingResults = true;
  length = 0;
  pageSize = 15;
  pageSizeOptions: number[] = [15, 25, 50];

  constructor(private opportunityService: OpportunityService, private router: Router, private spinner: NgxSpinnerService) { }
  ngOnInit(): void {
    this.fetchAllOpportunity('');
  }

  ngAfterViewInit() {
    this.getOpportunity();
  }
  getOpportunity(){

    const data = this.paginator.page.subscribe((data)=>{
      this.fetchAllOpportunity('');
    });

    fromEvent<any>(this.searchRef.nativeElement, 'keyup')
      .pipe(

        map(event => event.target.value),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(searchParam => {
          this.spinner.show();
          this.paginator.pageIndex = 0;
          return this.mapParameters(searchParam);
        })
      ).subscribe(data => {

      // console.log(data);
      this.opportunityList.data = data.content

      this.length = data.totalElements;
      this.spinner.hide();
      });
  }

  private fetchAllOpportunity(searchString: string){
    this.spinner.show();

    this.mapParameters(searchString).subscribe(data=>{
      this.length = data.totalElements;
      this.opportunityList.data = data.content;
      this.spinner.hide();
      // console.log(this.opportunityList)
    });
  }
  private mapParameters(searchString: string) {
    const searchParams = new SearchParam();
    searchParams.searchString = searchString;
    searchParams.sortBy = 'id';
    searchParams.sortDirection = 'desc';
    searchParams.page = this.paginator === undefined ? 0 : this.paginator.pageIndex;
    searchParams.size = this.paginator === undefined ? this.pageSize : this.paginator.pageSize;
    this.isLoadingResults = true;
    return this.opportunityService.fetchAllOpportunityByPage(searchParams);
  }
  navigateTo(opty: any) {
    this.router.navigateByUrl(`opportunity/${opty.id}`);
  }

}
