import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityQuoteDescriptionComponent } from './opportunity-quote-description.component';

describe('OpportunityQuoteDescriptionComponent', () => {
  let component: OpportunityQuoteDescriptionComponent;
  let fixture: ComponentFixture<OpportunityQuoteDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityQuoteDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityQuoteDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
