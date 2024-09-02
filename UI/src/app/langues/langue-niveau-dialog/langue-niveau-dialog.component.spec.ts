import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangueNiveauDialogComponent } from './langue-niveau-dialog.component';

describe('LangueNiveauDialogComponent', () => {
  let component: LangueNiveauDialogComponent;
  let fixture: ComponentFixture<LangueNiveauDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LangueNiveauDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LangueNiveauDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
