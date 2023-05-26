import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTicketsComponent } from './assign-tickets.component';

describe('AssignTicketsComponent', () => {
  let component: AssignTicketsComponent;
  let fixture: ComponentFixture<AssignTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
