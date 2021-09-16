import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInfoservicesComponent } from './card-infoservices.component';

describe('CardInfoservicesComponent', () => {
  let component: CardInfoservicesComponent;
  let fixture: ComponentFixture<CardInfoservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardInfoservicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardInfoservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
