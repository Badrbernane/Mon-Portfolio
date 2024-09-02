import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCertificatComponent } from './view-certificat.component';

describe('ViewCertificatComponent', () => {
  let component: ViewCertificatComponent;
  let fixture: ComponentFixture<ViewCertificatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCertificatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCertificatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
