import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejetcedTicketsComponent } from './rejetced-tickets.component';

describe('RejetcedTicketsComponent', () => {
  let component: RejetcedTicketsComponent;
  let fixture: ComponentFixture<RejetcedTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejetcedTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejetcedTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
