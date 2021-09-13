import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcardPricesComponent } from './newcard-prices.component';

describe('NewcardPricesComponent', () => {
  let component: NewcardPricesComponent;
  let fixture: ComponentFixture<NewcardPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewcardPricesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcardPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
