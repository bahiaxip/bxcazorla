import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoArroyoFrioComponent } from './info-arroyo-frio.component';

describe('InfoArroyoFrioComponent', () => {
  let component: InfoArroyoFrioComponent;
  let fixture: ComponentFixture<InfoArroyoFrioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoArroyoFrioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoArroyoFrioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
