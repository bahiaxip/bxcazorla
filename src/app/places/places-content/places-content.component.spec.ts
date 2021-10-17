import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesContentComponent } from './places-content.component';

describe('PlacesContentComponent', () => {
  let component: PlacesContentComponent;
  let fixture: ComponentFixture<PlacesContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacesContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
