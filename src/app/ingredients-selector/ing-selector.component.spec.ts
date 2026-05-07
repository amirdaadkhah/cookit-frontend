import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddIngredientsComponent } from './ing-selector.component';

describe('AddIngredientsComponent', () => {
  let component: AddIngredientsComponent;
  let fixture: ComponentFixture<AddIngredientsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AddIngredientsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
