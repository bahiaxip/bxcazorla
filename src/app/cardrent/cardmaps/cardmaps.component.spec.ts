import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardmapsComponent } from './cardmaps.component';

describe('CardmapsComponent', () => {
  let component: CardmapsComponent;
  let fixture: ComponentFixture<CardmapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardmapsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardmapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
