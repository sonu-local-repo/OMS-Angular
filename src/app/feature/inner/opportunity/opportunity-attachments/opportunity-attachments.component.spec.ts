import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityAttachmentsComponent } from './opportunity-attachments.component';

describe('OpportunityAttachmentsComponent', () => {
  let component: OpportunityAttachmentsComponent;
  let fixture: ComponentFixture<OpportunityAttachmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityAttachmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
