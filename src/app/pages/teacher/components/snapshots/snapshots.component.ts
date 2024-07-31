import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface ImageData {
  base64: string;
  timestamp: string;
}
@Component({
  selector: 'app-snapshots',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './snapshots.component.html',
  styleUrl: './snapshots.component.scss'
})
export class SnapshotsComponent implements OnInit {
  questionId = signal<string>('');

  imageDataArray = signal<ImageData[]>([])

  _activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.getIdFromQueryParams();
    this.imageDataArray.set([
      {
        base64: 'https://images.pexels.com/photos/26082992/pexels-photo-26082992/free-photo-of-alberoxalbero.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        timestamp: '2024-07-28T14:00:00Z',
      },
      {
        base64: 'https://images.pexels.com/photos/26082992/pexels-photo-26082992/free-photo-of-alberoxalbero.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        timestamp: '2024-07-27T10:30:00Z',
      },
      // Add more objects as needed
    ])
  }

  getIdFromQueryParams(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.questionId.set(id);
      }
    });
  }


}
