import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsSettingsComponent } from './questions-settings.component';

describe('QuestionsSettingsComponent', () => {
  let component: QuestionsSettingsComponent;
  let fixture: ComponentFixture<QuestionsSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionsSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
