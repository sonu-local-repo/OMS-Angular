import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityActivitiesComponent } from './opportunity-activities.component';

describe('OpportunityActivitiesComponent', () => {
  let component: OpportunityActivitiesComponent;
  let fixture: ComponentFixture<OpportunityActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
