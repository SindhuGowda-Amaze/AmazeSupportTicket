import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevalidationticketsComponent } from './revalidationtickets.component';

describe('RevalidationticketsComponent', () => {
  let component: RevalidationticketsComponent;
  let fixture: ComponentFixture<RevalidationticketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevalidationticketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevalidationticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
