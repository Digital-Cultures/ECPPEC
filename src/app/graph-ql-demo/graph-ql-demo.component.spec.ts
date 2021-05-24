import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphQLDemoComponent } from './graph-ql-demo.component';

describe('GraphQLDemoComponent', () => {
  let component: GraphQLDemoComponent;
  let fixture: ComponentFixture<GraphQLDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphQLDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphQLDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
