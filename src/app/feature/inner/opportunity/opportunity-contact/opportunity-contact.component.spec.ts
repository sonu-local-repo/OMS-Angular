import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityContactComponent } from './opportunity-contact.component';

describe('OpportunityContactComponent', () => {
  let component: OpportunityContactComponent;
  let fixture: ComponentFixture<OpportunityContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
