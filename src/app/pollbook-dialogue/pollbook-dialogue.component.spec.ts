import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollbookDialogueComponent } from './pollbook-dialogue.component';

describe('PollbookDialogueComponent', () => {
  let component: PollbookDialogueComponent;
  let fixture: ComponentFixture<PollbookDialogueComponent>;

  beforeEach(async(() => {
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
