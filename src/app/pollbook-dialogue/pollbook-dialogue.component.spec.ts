import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PollbookDialogueComponent } from './pollbook-dialogue.component';

describe('PollbookDialogueComponent', () => {
  let component: PollbookDialogueComponent;
  let fixture: ComponentFixture<PollbookDialogueComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PollbookDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollbookDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
