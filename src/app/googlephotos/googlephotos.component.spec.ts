import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GooglephotosComponent } from './googlephotos.component';

describe('GooglephotosComponent', () => {
  let component: GooglephotosComponent;
  let fixture: ComponentFixture<GooglephotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GooglephotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GooglephotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
