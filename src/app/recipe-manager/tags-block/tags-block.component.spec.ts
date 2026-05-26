import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TagsBlockComponent } from './tags-block.component';

describe('TagsBlockComponent', () => {
  let component: TagsBlockComponent;
  let fixture: ComponentFixture<TagsBlockComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TagsBlockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TagsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
