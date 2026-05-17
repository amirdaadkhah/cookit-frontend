import { TestBed } from '@angular/core/testing';

import { IngredientCartService } from './ingredient-cart.service';

describe('IngredientCartService', () => {
  let service: IngredientCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
