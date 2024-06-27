import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-confirmation-page-2',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './confirmation-page-2.component.html',
  styleUrl: './confirmation-page-2.component.scss'
})
export class ConfirmationPage2Component {
  mediaRecorder: MediaRecorder | null = null;
  audioStream: MediaStream | null = null;
  screenStream: MediaStream | null = null;

  istoggleRecord = false
  isRecording = false;
  istoggleVoiceRecorder = false
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
          console.log('Screen recording finished. Video URL:', url);
          this.isRecording = false;
        };

        this.mediaRecorder.start();
        this.isRecording = true;
      } catch (err) {
        console.error('Error starting screen recording:', err);
        this.istoggleRecord = false;
      }
    } else {
      if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
        this.mediaRecorder.stop();
      }
      if (this.screenStream) {
        this.screenStream.getTracks().forEach(track => track.stop());
        this.screenStream = null;
      }
      this.isRecording = false;
      console.log('Screen recording stopped');
    }
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


}
