import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectedIngredientPanelComponent } from './selected-ingredient-panel.component';

describe('SelectedIngredientPanelComponent', () => {
  let component: SelectedIngredientPanelComponent;
  let fixture: ComponentFixture<SelectedIngredientPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SelectedIngredientPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectedIngredientPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
