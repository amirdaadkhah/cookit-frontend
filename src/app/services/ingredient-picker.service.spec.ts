import { TestBed } from '@angular/core/testing';

import { IngredientPickerService } from './ingredient-picker.service';

describe('IngredientPickerService', () => {
  let service: IngredientPickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientPickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
