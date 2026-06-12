import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeaderDesktopComponent } from './header-desktop.component';

describe('HeaderDesktopComponent', () => {
  let component: HeaderDesktopComponent;
  let fixture: ComponentFixture<HeaderDesktopComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HeaderDesktopComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
