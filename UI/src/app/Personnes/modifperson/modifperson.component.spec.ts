import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifpersonComponent } from './modifperson.component';

describe('ModifpersonComponent', () => {
  let component: ModifpersonComponent;
  let fixture: ComponentFixture<ModifpersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifpersonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifpersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
