import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PresentHeaderComponent } from './present-header.component';

describe('PresentHeaderComponent', () => {
  let component: PresentHeaderComponent;
  let fixture: ComponentFixture<PresentHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PresentHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PresentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
