import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionsMapComponent } from './elections-map.component';

describe('ElectionsMapComponent', () => {
  let component: ElectionsMapComponent;
  let fixture: ComponentFixture<ElectionsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectionsMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
