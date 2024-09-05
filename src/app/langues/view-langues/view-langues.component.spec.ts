import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLanguesComponent } from './view-langues.component';

describe('ViewLanguesComponent', () => {
  let component: ViewLanguesComponent;
  let fixture: ComponentFixture<ViewLanguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewLanguesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLanguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
