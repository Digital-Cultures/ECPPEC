import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestedSparkLineComponent } from './contested-spark-line.component';

describe('ContestedSparkLineComponent', () => {
  let component: ContestedSparkLineComponent;
  let fixture: ComponentFixture<ContestedSparkLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestedSparkLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestedSparkLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
