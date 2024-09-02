import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCompetenceComponent } from './change-competence.component';

describe('ChangeCompetenceComponent', () => {
  let component: ChangeCompetenceComponent;
  let fixture: ComponentFixture<ChangeCompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeCompetenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
