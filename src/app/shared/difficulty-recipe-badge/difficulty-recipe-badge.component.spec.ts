import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DifficultyRecipeBadgeComponent } from './difficulty-recipe-badge.component';

describe('DifficultyRecipeBadgeComponent', () => {
  let component: DifficultyRecipeBadgeComponent;
  let fixture: ComponentFixture<DifficultyRecipeBadgeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DifficultyRecipeBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DifficultyRecipeBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
