import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArroyofrioComponent } from './arroyofrio.component';

describe('ArroyofrioComponent', () => {
  let component: ArroyofrioComponent;
  let fixture: ComponentFixture<ArroyofrioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArroyofrioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArroyofrioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
