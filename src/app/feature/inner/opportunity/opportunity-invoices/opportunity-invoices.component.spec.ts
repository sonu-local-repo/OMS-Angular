import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityInvoicesComponent } from './opportunity-invoices.component';

describe('OpportunityInvoicesComponent', () => {
  let component: OpportunityInvoicesComponent;
  let fixture: ComponentFixture<OpportunityInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
