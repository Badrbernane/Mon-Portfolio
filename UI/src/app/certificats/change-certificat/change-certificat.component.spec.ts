import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCertificatComponent } from './change-certificat.component';

describe('ChangeCertificatComponent', () => {
  let component: ChangeCertificatComponent;
  let fixture: ComponentFixture<ChangeCertificatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeCertificatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeCertificatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
