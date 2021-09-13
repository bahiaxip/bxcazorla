import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Divlevel2Component } from './divlevel2.component';

describe('Divlevel2Component', () => {
  let component: Divlevel2Component;
  let fixture: ComponentFixture<Divlevel2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Divlevel2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Divlevel2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
