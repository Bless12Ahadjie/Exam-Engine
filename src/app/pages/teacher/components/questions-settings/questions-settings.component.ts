import { Component, inject, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ExamSettings } from '../../interfaces/question.interface';
import { ToasterService } from '../../../../shared/components/toaster/services/toaster.service';
import {
  persistedGet,
  persistedSave,
} from '../../../../shared/helpers/constants.helper';

@Component({
  selector: 'app-questions-settings',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './questions-settings.component.html',
  styleUrl: './questions-settings.component.scss',
})
export class QuestionsSettingsComponent {
  settingsChanged = output<ExamSettings>();
  settingsForm!: FormGroup;

  private fb = inject(FormBuilder);
  private _toaster = inject(ToasterService);

  ngOnInit(): void {
    this.initSettingsForm();
    this.loadSettingsFromStorage();
  }

  initSettingsForm() {
    this.settingsForm = this.fb.group({
      questionTitle: ['', Validators.required],
      questionInstruction: ['', Validators.required],
      passMark: ['', Validators.required],
      questionStartTime: ['', Validators.required],
      questionEndTime: ['', Validators.required],
      questionReceivers: [
        '',
        [Validators.required, Validators.pattern('[^,]+(,[^,]+)*')],
      ],
    });
  }

  saveSettings() {
    if (this.settingsForm.valid) {
      const settingsData: ExamSettings = {
        ...this.settingsForm.value,
        questionReceivers: this.settingsForm.value.questionReceivers.trim(), // Ensure no leading/trailing spaces
      };
      this.saveToStorage(settingsData);
      this.settingsChanged.emit(settingsData);
      this.showToast('Settings saved successfully.', 'success');
    } else {
      this.showToast('Please fill in all settings fields.', 'error');
    }
  }

  saveToStorage(settingsData: ExamSettings) {
    persistedSave('exam_engine_settings', JSON.stringify(settingsData));
  }

  loadSettingsFromStorage() {
    const savedSettings = persistedGet('exam_engine_settings');
    if (savedSettings) {
      const settingsData: ExamSettings = JSON.parse(savedSettings);
      this.settingsForm.patchValue(settingsData);
    }
  }

  private showToast(message: string, type: 'error' | 'success') {
    this._toaster.showToast({
      message,
      type,
      duration: 3000,
    });
  }
}
