import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubrecipesComponent } from './subrecipes.component';

describe('SubrecipesComponent', () => {
  let component: SubrecipesComponent;
  let fixture: ComponentFixture<SubrecipesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SubrecipesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubrecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
