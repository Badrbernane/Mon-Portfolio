import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeExperComponent } from './change-exper.component';

describe('ChangeExperComponent', () => {
  let component: ChangeExperComponent;
  let fixture: ComponentFixture<ChangeExperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeExperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeExperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
