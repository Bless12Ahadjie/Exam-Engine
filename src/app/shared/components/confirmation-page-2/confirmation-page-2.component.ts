import { CommonModule } from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import {StudentService} from "../../../services/student/student.service";

@Component({
  selector: 'app-confirmation-page-2',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './confirmation-page-2.component.html',
  styleUrl: './confirmation-page-2.component.scss'
})
export class ConfirmationPage2Component implements OnInit{
  studentService = inject(StudentService)
  Question_Id: string | null = '';
  mediaRecorder: MediaRecorder | null = null;
  audioStream: MediaStream | null = null;
  screenStream: MediaStream | null = null;
  cameraStream: MediaStream | null = null

  istoggleRecord = false
  istoggleSurrounding = false;
  isRecording = false;
  istoggleVoiceRecorder = false
  private screenshotInterval!: number;
  private cameraInterval!: number;

  ngOnInit() {
    this.Question_Id = localStorage.getItem('idQ')
  }


  async toggleRecordScreen() {
    this.istoggleRecord = !this.istoggleRecord;

    if (this.istoggleRecord) {
      try {
        this.screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        this.mediaRecorder = new MediaRecorder(this.screenStream);

        const chunks: BlobPart[] = [];
        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };

        this.mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'video/webm' });
          const url = URL.createObjectURL(blob);
          this.studentService.sendPictureToBackend(url,this.Question_Id).subscribe(
            {
              next: () => {
              }
            }
          )
          this.isRecording = false;
        };

        this.mediaRecorder.start();
        this.isRecording = true;

        // Take screenshots every 2 minutes
        this.screenshotInterval = setInterval(async () => {
          // Screenshot logic
        }, 10000);

        // Add event listener for visibilitychange
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
      } catch (err) {
        console.error('Error starting screen recording:', err);
        this.istoggleRecord = false;
      }
    } else {
      this.stopScreenRecording();
    }
  }

  handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      this.stopScreenRecording();
    }
  };

  stopScreenRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
    if (this.screenStream) {
      this.screenStream.getTracks().forEach(track => track.stop());
      this.screenStream = null;
    }
    if (this.screenshotInterval) {
      clearInterval(this.screenshotInterval);
    }
    this.isRecording = false;
    console.log('Screen recording stopped');

    // Remove event listener for visibilitychange
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  }







  async toggleVoiceRecorder() {
    this.istoggleVoiceRecorder = !this.istoggleVoiceRecorder;

    if (this.istoggleVoiceRecorder) {
      try {
        this.audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('Audio recording started');
        // You can do something with the audio stream here, like creating an audio element
      } catch (err) {
        console.error('Error accessing microphone:', err);
        this.istoggleVoiceRecorder = false;
      }
    } else {
      if (this.audioStream) {
        this.audioStream.getTracks().forEach(track => track.stop());
        this.audioStream = null;
        console.log('Audio recording stopped');
      }
    }
  }


  async toggleRecordSurrouding() {
    this.istoggleSurrounding = !this.istoggleSurrounding;

    if (this.istoggleSurrounding) {
      try {
        this.cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
        this.cameraInterval = setInterval(async () => {
          const canvas = document.createElement('canvas');
          // @ts-ignore
          canvas.width = this.cameraStream.getTracks()[0].getSettings().width;
          // @ts-ignore
          canvas.height = this.cameraStream.getTracks()[0].getSettings().height;
          const ctx = canvas.getContext('2d');
          const videoElement = document.createElement('video');
          // @ts-ignore
          videoElement.srcObject = new MediaStream(this.cameraStream.getTracks());
          await videoElement.play();
          // @ts-ignore
          ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
          const cameraUrl = canvas.toDataURL('image/png');
          this.studentService.sendPictureToBackend(cameraUrl,this.Question_Id).subscribe(
            {
              next: () => {
              }
            }
          )
        }, 10000);
      } catch (err) {
        console.error('Error accessing camera:', err);
        this.istoggleSurrounding = false;
      }
    } else {
      if (this.cameraStream) {
        this.cameraStream.getTracks().forEach(track => track.stop());
        this.cameraStream = null;
      }
      if (this.cameraInterval) {
        clearInterval(this.cameraInterval);
      }
      console.log('Camera recording stopped');
    }
  }

}
