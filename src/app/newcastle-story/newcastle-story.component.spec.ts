import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcastleStoryComponent } from './newcastle-story.component';

describe('NewcastleStoryComponent', () => {
  let component: NewcastleStoryComponent;
  let fixture: ComponentFixture<NewcastleStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewcastleStoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcastleStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
