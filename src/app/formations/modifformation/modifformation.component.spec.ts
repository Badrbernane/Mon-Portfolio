import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifformationComponent } from './modifformation.component';

describe('ModifformationComponent', () => {
  let component: ModifformationComponent;
  let fixture: ComponentFixture<ModifformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
