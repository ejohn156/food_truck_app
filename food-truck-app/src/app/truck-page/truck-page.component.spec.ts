import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckPageComponent } from './truck-page.component';

describe('TruckPageComponent', () => {
  let component: TruckPageComponent;
  let fixture: ComponentFixture<TruckPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruckPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
