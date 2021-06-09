import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestedScatterplotComponent } from './contested-scatterplot.component';

describe('ContestedScatterplotComponent', () => {
  let component: ContestedScatterplotComponent;
  let fixture: ComponentFixture<ContestedScatterplotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestedScatterplotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestedScatterplotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
