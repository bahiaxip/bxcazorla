import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcardInputsComponent } from './newcard-inputs.component';

describe('NewcardInputsComponent', () => {
  let component: NewcardInputsComponent;
  let fixture: ComponentFixture<NewcardInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewcardInputsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcardInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
