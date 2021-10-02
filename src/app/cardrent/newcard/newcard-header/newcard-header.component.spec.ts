import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcardHeaderComponent } from './newcard-header.component';

describe('NewcardHeaderComponent', () => {
  let component: NewcardHeaderComponent;
  let fixture: ComponentFixture<NewcardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewcardHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
