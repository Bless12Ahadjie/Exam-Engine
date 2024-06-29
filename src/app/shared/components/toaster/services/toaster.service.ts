import { Injectable } from '@angular/core';
const TIME_OUT: number = 4000;

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  isSuccess: boolean = false;
  isError: boolean = false;
  message: string = '';


  showSuccess(message: string): void {
    this.isSuccess = true;
    this.message = message;

    setTimeout(() => {
      this.isSuccess = false;
    }, TIME_OUT);
  }

  showError(message: string): void {
    this.isError = true;
    this.message = message;

    setTimeout(() => {
      this.isError = false;
    }, TIME_OUT);
  }

  closeSuccessToaster(): void {
    this.isSuccess = false;
  }

  closeErrorToaster(): void {
    this.isError = false;
  }
}
