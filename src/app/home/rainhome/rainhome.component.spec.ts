import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RainhomeComponent } from './rainhome.component';

describe('RainhomeComponent', () => {
  let component: RainhomeComponent;
  let fixture: ComponentFixture<RainhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RainhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RainhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
