import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityHomeComponent } from './opportunity-home.component';

describe('OpportunityHomeComponent', () => {
  let component: OpportunityHomeComponent;
  let fixture: ComponentFixture<OpportunityHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
