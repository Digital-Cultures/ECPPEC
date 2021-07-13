import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataStoriesComponent } from './data-stories.component';

describe('DataStoriesComponent', () => {
  let component: DataStoriesComponent;
  let fixture: ComponentFixture<DataStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataStoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
