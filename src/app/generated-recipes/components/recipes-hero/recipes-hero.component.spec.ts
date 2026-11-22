import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecipesHeroComponent } from './recipes-hero.component';

describe('RecipesHeroComponent', () => {
  let component: RecipesHeroComponent;
  let fixture: ComponentFixture<RecipesHeroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RecipesHeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipesHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
