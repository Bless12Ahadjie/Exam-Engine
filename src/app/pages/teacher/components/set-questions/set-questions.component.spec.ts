import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetQuestionsComponent } from './set-questions.component';

describe('SetQuestionsComponent', () => {
  let component: SetQuestionsComponent;
  let fixture: ComponentFixture<SetQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetQuestionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
