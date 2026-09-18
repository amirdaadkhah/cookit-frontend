import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GeneratedRecipesComponent } from './generated-recipes.component';

describe('GeneratedRecipesComponent', () => {
  let component: GeneratedRecipesComponent;
  let fixture: ComponentFixture<GeneratedRecipesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [GeneratedRecipesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneratedRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
