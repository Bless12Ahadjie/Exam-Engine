import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostExamScreenComponent } from './post-exam-screen.component';

describe('PostExamScreenComponent', () => {
  let component: PostExamScreenComponent;
  let fixture: ComponentFixture<PostExamScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostExamScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostExamScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
