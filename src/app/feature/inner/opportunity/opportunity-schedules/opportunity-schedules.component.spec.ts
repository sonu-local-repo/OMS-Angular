import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitySchedulesComponent } from './opportunity-schedules.component';

describe('OpportunitySchedulesComponent', () => {
  let component: OpportunitySchedulesComponent;
  let fixture: ComponentFixture<OpportunitySchedulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunitySchedulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunitySchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
