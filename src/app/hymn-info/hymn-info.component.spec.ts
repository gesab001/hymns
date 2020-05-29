import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HymnInfoComponent } from './hymn-info.component';

describe('HymnInfoComponent', () => {
  let component: HymnInfoComponent;
  let fixture: ComponentFixture<HymnInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HymnInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HymnInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
