import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IToast } from './toast.interface';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private toastsSubject = new BehaviorSubject<IToast[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  /**
   * Shows a toast message with the provided details.
   *
   * @param toast - The toast object containing the message, type, and optional duration.
   * @returns {void}
   */
  public showToast(toast: IToast): void {
    const toasts = this.toastsSubject.value;
    toasts.push(toast);
    this.toastsSubject.next(toasts);

    if (toast.duration) {
      setTimeout(() => this.removeToast(toast), toast.duration);
    }

    this.toasts$.subscribe((toast) => console.log(toast));
  }

  /**
   * Removes a toast message from the list of active toasts.
   *
   * @param toast - The toast object to be removed.
   * @returns {void}
   *
   * @remarks
   * This method filters out the provided toast from the list of active toasts and updates the toastsSubject.
   * If the toast has a duration, it will be removed automatically after the specified duration.
   *
   */
  public removeToast(toast: IToast) {
    const toasts = this.toastsSubject.value.filter((t) => t !== toast);
    this.toastsSubject.next(toasts);
  }
}
