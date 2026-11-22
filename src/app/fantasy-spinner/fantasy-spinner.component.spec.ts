import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FantasySpinnerComponent } from './fantasy-spinner.component';

describe('FantasySpinnerComponent', () => {
  let component: FantasySpinnerComponent;
  let fixture: ComponentFixture<FantasySpinnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FantasySpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FantasySpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
