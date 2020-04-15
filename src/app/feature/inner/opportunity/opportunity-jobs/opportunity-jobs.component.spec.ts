import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityJobsComponent } from './opportunity-jobs.component';

describe('OpportunityJobsComponent', () => {
  let component: OpportunityJobsComponent;
  let fixture: ComponentFixture<OpportunityJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
