import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityEstimatesComponent } from './opportunity-estimates.component';

describe('OpportunityEstimatesComponent', () => {
  let component: OpportunityEstimatesComponent;
  let fixture: ComponentFixture<OpportunityEstimatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityEstimatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityEstimatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
