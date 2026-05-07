import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IngredientsSearchComponent } from './ingredients-search.component';

describe('IngredientsSearchComponent', () => {
  let component: IngredientsSearchComponent;
  let fixture: ComponentFixture<IngredientsSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IngredientsSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
