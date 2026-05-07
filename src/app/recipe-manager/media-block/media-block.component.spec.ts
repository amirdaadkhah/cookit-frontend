import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MediaBlockComponent } from './media-block.component';

describe('MediaBlockComponent', () => {
  let component: MediaBlockComponent;
  let fixture: ComponentFixture<MediaBlockComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MediaBlockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
