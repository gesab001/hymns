import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnedriveComponent } from './onedrive.component';

describe('OnedriveComponent', () => {
  let component: OnedriveComponent;
  let fixture: ComponentFixture<OnedriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnedriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnedriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
