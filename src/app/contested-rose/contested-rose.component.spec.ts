import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestedRoseComponent } from './contested-rose.component';

describe('ContestedRoseComponent', () => {
  let component: ContestedRoseComponent;
  let fixture: ComponentFixture<ContestedRoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestedRoseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestedRoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
