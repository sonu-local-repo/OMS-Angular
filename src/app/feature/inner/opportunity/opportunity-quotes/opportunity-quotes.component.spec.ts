import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityQuotesComponent } from './opportunity-quotes.component';

describe('OpportunityQuotesComponent', () => {
  let component: OpportunityQuotesComponent;
  let fixture: ComponentFixture<OpportunityQuotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityQuotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
