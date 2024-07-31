import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ManageExamsService } from '../../services/manage-exams/manage-exams.service';
import { ImageData } from '../../manage-exams/manage-exams.interface';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-snapshots',
  standalone: true,
  imports: [CommonModule, RouterLink, SpinnerComponent],
  templateUrl: './snapshots.component.html',
  styleUrl: './snapshots.component.scss',
})
export class SnapshotsComponent implements OnInit {
  studentId = signal<string>('');
  questionId = signal<string>('');
  isLoading: boolean = false;

  imageDataArray = signal<ImageData[]>([]);

  _activatedRoute = inject(ActivatedRoute);
  _manageExamService = inject(ManageExamsService);

  ngOnInit(): void {
    this.getIdFromQueryParams();
    this.getSnapshots();
  }

  getIdFromQueryParams(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      const studentId = params.get('id');
      const questionId = params.get('questionId');

      if (studentId && questionId) {
        this.studentId.set(studentId);
        this.questionId.set(questionId);
      }
    });
  }

  getSnapshots() {
    this.isLoading = true;

    this._manageExamService
      .getStudentSnapshots(this.studentId(), this.questionId())
      .subscribe((response) => {
        this.isLoading = false;
        this.imageDataArray.set(response.snapshots);
      });
  }
}
