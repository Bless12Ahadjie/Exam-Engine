import { Component } from '@angular/core';
import {TitleCasePipe, UpperCasePipe} from "@angular/common";

@Component({
  selector: 'app-recent-test-result',
  standalone: true,
  imports: [
    TitleCasePipe,
    UpperCasePipe
  ],
  templateUrl: './recent-test-result.component.html',
  styleUrl: './recent-test-result.component.scss'
})
export class RecentTestResultComponent {
  tableHead = [
    {
      name: 'test',
      id: 'id',
      time: 'completed on',
      expire: 'score',
    }
  ]

  tablebody = [
    {
      test: 'Mathematical prediction',
      id: '085236850',
      expired: 'May 31, 2024',
      score: 'pending'
    },
    {
      test: 'Mathematical prediction',
      id: '085236850',
      expired: 'May 31, 2024',
      score: 'pending'
    }
  ]
}
