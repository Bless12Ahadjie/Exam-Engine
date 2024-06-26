import {Component, EventEmitter,Output,OnDestroy} from '@angular/core';
import { Router  } from '@angular/router';


@Component({
  selector: 'app-start-mosal',
  standalone: true,
  imports: [],
  templateUrl: './start-mosal.component.html',
  styleUrl: './start-mosal.component.scss'
})
export class StartMosalComponent implements OnDestroy {
  @Output() closeModalEvent = new EventEmitter<boolean>();
  videoStream: MediaStream | null = null;


  constructor(private router: Router ) {}
  closeModal(){
    this.closeModalEvent.emit(false);
  }
  ngOnDestroy() {
    this.stopCamera();
  }

  startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.videoStream = stream;
        const videoElement = document.getElementById('camera-feed') as HTMLVideoElement;
        videoElement.srcObject = stream;
      })
      .catch(err => console.error('Error accessing camera:', err));
  }

  stopCamera() {
    if (this.videoStream) {
      this.videoStream.getTracks().forEach(track => track.stop());
    }
  }

  onNextclick(){
    this.startCamera();
    setTimeout(() => this.router.navigate(['/student/confirm-1']), 1000);
}
}




