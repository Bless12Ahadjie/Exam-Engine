import {NgClass, NgIf} from '@angular/common';
import {Component, ElementRef, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {StudentService} from "../../../services/student/student.service";

@Component({
  selector: 'app-confirmation-page-1',
  standalone: true,
  imports: [RouterModule, NgIf, NgClass],
  templateUrl: './confirmation-page-1.component.html',
  styleUrl: './confirmation-page-1.component.scss'
})
export class ConfirmationPage1Component implements OnInit, OnDestroy {
  studentService = inject(StudentService)
  route = inject(Router)
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  videoStream: MediaStream | null = null;
  pictureTaken = false
  isPictureTaken = false
  capturedImage: string | null = null;
  Question_Id: string | null = '';

  ngOnInit() {
    this.Question_Id = localStorage.getItem('idQ')
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

  goToNext(){
    this.studentService.sendPictureToBackend(this.capturedImage,this.Question_Id).subscribe(
      {
        next: value => {
          console.log(value)
          this.route.navigate(['/student/confirm-2']).then()
        }
      }
    )
  }



}
