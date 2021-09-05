import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardrentComponent } from './cardrent.component';

describe('CardrentComponent', () => {
  let component: CardrentComponent;
  let fixture: ComponentFixture<CardrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardrentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
