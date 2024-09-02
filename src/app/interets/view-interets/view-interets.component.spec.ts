import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInteretsComponent } from './view-interets.component';

describe('ViewInteretsComponent', () => {
  let component: ViewInteretsComponent;
  let fixture: ComponentFixture<ViewInteretsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewInteretsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewInteretsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
