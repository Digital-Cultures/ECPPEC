import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningDialogueComponent } from './warning-dialogue.component';

describe('WarningDialogueComponent', () => {
  let component: WarningDialogueComponent;
  let fixture: ComponentFixture<WarningDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
