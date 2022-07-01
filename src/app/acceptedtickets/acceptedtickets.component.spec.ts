import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedticketsComponent } from './acceptedtickets.component';

describe('AcceptedticketsComponent', () => {
  let component: AcceptedticketsComponent;
  let fixture: ComponentFixture<AcceptedticketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptedticketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
