import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivlevelComponent } from './divlevel.component';

describe('DivlevelComponent', () => {
  let component: DivlevelComponent;
  let fixture: ComponentFixture<DivlevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivlevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivlevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
