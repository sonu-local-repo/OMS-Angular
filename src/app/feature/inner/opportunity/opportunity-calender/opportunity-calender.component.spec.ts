import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityCalenderComponent } from './opportunity-calender.component';

describe('OpportunityCalenderComponent', () => {
  let component: OpportunityCalenderComponent;
  let fixture: ComponentFixture<OpportunityCalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityCalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
