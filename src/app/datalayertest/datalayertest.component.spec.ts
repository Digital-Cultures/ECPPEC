import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatalayertestComponent } from './datalayertest.component';

describe('DatalayertestComponent', () => {
  let component: DatalayertestComponent;
  let fixture: ComponentFixture<DatalayertestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatalayertestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatalayertestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
