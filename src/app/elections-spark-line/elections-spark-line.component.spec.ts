import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionsSparkLineComponent } from './elections-spark-line.component';

describe('ElectionsSparkLineComponent', () => {
  let component: ElectionsSparkLineComponent;
  let fixture: ComponentFixture<ElectionsSparkLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectionsSparkLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionsSparkLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
