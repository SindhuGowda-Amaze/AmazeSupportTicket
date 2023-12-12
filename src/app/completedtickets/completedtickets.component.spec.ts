import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedticketsComponent } from './completedtickets.component';

describe('CompletedticketsComponent', () => {
  let component: CompletedticketsComponent;
  let fixture: ComponentFixture<CompletedticketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedticketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
