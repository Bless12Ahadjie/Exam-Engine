import { NgIf } from '@angular/common';
import { Component, OnInit, OnDestroy,  ViewChild, ElementRef} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-confirmation-page-1',
  standalone: true,
  imports: [RouterModule,NgIf],
  templateUrl: './confirmation-page-1.component.html',
  styleUrl: './confirmation-page-1.component.scss'
})
export class ConfirmationPage1Component implements OnInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  videoStream: MediaStream | null = null;
  pictureTaken = false
  capturedImage: string | null = null;
  ngOnInit() {
    this.startCamera();
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
      this.pictureTaken = true;
    }
  }
  takePicture() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');

    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.capturedImage = canvas.toDataURL('image/png');
      this.pictureTaken = true;
    }
  }

}
