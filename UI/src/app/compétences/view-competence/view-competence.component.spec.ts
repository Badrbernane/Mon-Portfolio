import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompetenceComponent } from './view-competence.component';

describe('ViewCompetenceComponent', () => {
  let component: ViewCompetenceComponent;
  let fixture: ComponentFixture<ViewCompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCompetenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
