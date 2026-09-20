import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FullRecipeComponent } from './full-recipe.component';

describe('FullRecipeComponent', () => {
  let component: FullRecipeComponent;
  let fixture: ComponentFixture<FullRecipeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FullRecipeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FullRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
