import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObschaintestComponent } from './obschaintest.component';

describe('ObschaintestComponent', () => {
  let component: ObschaintestComponent;
  let fixture: ComponentFixture<ObschaintestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObschaintestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObschaintestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
