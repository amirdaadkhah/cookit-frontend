import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecipesModeSegmentComponent } from './recipes-mode-segment.component';

describe('RecipesModeSegmentComponent', () => {
  let component: RecipesModeSegmentComponent;
  let fixture: ComponentFixture<RecipesModeSegmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RecipesModeSegmentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipesModeSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
