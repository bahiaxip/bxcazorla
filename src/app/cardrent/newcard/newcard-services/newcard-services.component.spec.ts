import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcardServicesComponent } from './newcard-services.component';

describe('NewcardServicesComponent', () => {
  let component: NewcardServicesComponent;
  let fixture: ComponentFixture<NewcardServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewcardServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcardServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
