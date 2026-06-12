import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StepsBlockComponent } from './steps-block.component';

describe('StepsBlockComponent', () => {
  let component: StepsBlockComponent;
  let fixture: ComponentFixture<StepsBlockComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StepsBlockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
