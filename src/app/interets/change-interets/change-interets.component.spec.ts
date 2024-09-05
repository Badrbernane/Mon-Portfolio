import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeInteretsComponent } from './change-interets.component';

describe('ChangeInteretsComponent', () => {
  let component: ChangeInteretsComponent;
  let fixture: ComponentFixture<ChangeInteretsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeInteretsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeInteretsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
