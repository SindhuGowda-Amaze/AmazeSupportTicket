import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceptionLogDashComponent } from './exception-log-dash.component';

describe('ExceptionLogDashComponent', () => {
  let component: ExceptionLogDashComponent;
  let fixture: ComponentFixture<ExceptionLogDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExceptionLogDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExceptionLogDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
