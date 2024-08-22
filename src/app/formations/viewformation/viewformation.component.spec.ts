import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewformationComponent } from './viewformation.component';

describe('ViewformationComponent', () => {
  let component: ViewformationComponent;
  let fixture: ComponentFixture<ViewformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
