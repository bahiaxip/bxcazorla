import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcardImagesComponent } from './newcard-images.component';

describe('NewcardImagesComponent', () => {
  let component: NewcardImagesComponent;
  let fixture: ComponentFixture<NewcardImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewcardImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcardImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
