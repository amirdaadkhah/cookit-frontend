import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutUsHeaderComponent } from './about-us-header.component';

describe('AboutUsHeaderComponent', () => {
  let component: AboutUsHeaderComponent;
  let fixture: ComponentFixture<AboutUsHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AboutUsHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutUsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
