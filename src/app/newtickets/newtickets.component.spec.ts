import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewticketsComponent } from './newtickets.component';

describe('NewticketsComponent', () => {
  let component: NewticketsComponent;
  let fixture: ComponentFixture<NewticketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewticketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
