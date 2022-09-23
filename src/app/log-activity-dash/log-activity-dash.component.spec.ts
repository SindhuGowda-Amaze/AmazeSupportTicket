import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogActivityDashComponent } from './log-activity-dash.component';

describe('LogActivityDashComponent', () => {
  let component: LogActivityDashComponent;
  let fixture: ComponentFixture<LogActivityDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogActivityDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogActivityDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
