import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandpitComponent } from './sandpit.component';

describe('SandpitComponent', () => {
  let component: SandpitComponent;
  let fixture: ComponentFixture<SandpitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandpitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandpitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
