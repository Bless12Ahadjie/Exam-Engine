import { Component, inject, OnInit, signal } from '@angular/core';
import { IResponseData, TableData } from '../../../../manage-exams/manage-exams.interface';
import { ManageExamsService } from '../../../../services/manage-exams/manage-exams.service';
import { ToasterService } from '../../../../../../shared/components/toaster/services/toaster.service';
import { TableComponent } from '../../../../../../shared/components/table/table.component';

@Component({
  selector: 'app-manage-exams-table',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './manage-exams-table.component.html',
  styleUrl: './manage-exams-table.component.scss'
})
export class ManageExamsTableComponent implements OnInit {
  columns: string[] = [
    'Title',
    'Status',
    'Start Time',
    'End Time',
    'Pass Mark',
  ];
  questions = signal<TableData[]>([]);
  isLoading: boolean = false;

  _manageExamsService = inject(ManageExamsService);
  _toaster = inject(ToasterService);

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;

    this._manageExamsService.getManageExamsQuestions().subscribe({
      next: (data) => {
        this.isLoading = false;
        this.responseHandler(data);
      },
      error: (error) => {
        this.isLoading = false;

        const errorMessage = `Something went wrong in getting the table data. ${error.message}`;
        this.showToast(errorMessage, 'error');
        console.error(error);
      },
    });
  }

  responseHandler(response: IResponseData) {
    if (response.status === 200) {
      this.questions.set(response.questions);
    } else {
      this.showToast(response.message, 'error');
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
