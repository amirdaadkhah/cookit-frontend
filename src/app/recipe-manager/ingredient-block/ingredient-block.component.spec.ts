import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IngredientBlockComponent } from './ingredient-block.component';

describe('IngredientBlockComponent', () => {
  let component: IngredientBlockComponent;
  let fixture: ComponentFixture<IngredientBlockComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IngredientBlockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
