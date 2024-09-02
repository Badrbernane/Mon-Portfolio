import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLanguesComponent } from './change-langues.component';

describe('ChangeLanguesComponent', () => {
  let component: ChangeLanguesComponent;
  let fixture: ComponentFixture<ChangeLanguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeLanguesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeLanguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
