import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSFComponent } from './form-sf.component';

describe('FormSFComponent', () => {
  let component: FormSFComponent;
  let fixture: ComponentFixture<FormSFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
