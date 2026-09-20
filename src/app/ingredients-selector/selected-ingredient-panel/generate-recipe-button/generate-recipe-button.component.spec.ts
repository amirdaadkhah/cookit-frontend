import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GenerateRecipeButtonComponent } from './generate-recipe-button.component';

describe('GenerateRecipeButtonComponent', () => {
  let component: GenerateRecipeButtonComponent;
  let fixture: ComponentFixture<GenerateRecipeButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [GenerateRecipeButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateRecipeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
