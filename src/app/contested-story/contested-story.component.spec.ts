import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestedStoryComponent } from './contested-story.component';

describe('ContestedStoryComponent', () => {
  let component: ContestedStoryComponent;
  let fixture: ComponentFixture<ContestedStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestedStoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestedStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
