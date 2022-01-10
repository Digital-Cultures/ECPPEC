import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoCanVoteStoryComponent } from './who-can-vote-story.component';

describe('WhoCanVoteStoryComponent', () => {
  let component: WhoCanVoteStoryComponent;
  let fixture: ComponentFixture<WhoCanVoteStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhoCanVoteStoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoCanVoteStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
