import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsPreviewComponent } from './questions-preview.component';

describe('QuestionsPreviewComponent', () => {
  let component: QuestionsPreviewComponent;
  let fixture: ComponentFixture<QuestionsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionsPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
