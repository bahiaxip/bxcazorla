import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatheaderComponent } from './floatheader.component';

describe('FloatheaderComponent', () => {
  let component: FloatheaderComponent;
  let fixture: ComponentFixture<FloatheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloatheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
