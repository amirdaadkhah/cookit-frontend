import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutAlgorithmComponent } from './about-algorithm.component';

describe('AboutAlgorithmComponent', () => {
  let component: AboutAlgorithmComponent;
  let fixture: ComponentFixture<AboutAlgorithmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AboutAlgorithmComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutAlgorithmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
