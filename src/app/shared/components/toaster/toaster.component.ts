import { Component, OnInit, inject, signal } from '@angular/core';
import { ToasterService } from './services/toaster.service';
import { IToast } from './services/toast.interface';
import { truncateString } from '../../pages/auth/signup-page/string.helper';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss'
})
export class ToasterComponent implements OnInit {
  public toasts = signal<IToast[]>([]);
	private readonly stringMaxLength: number = 100;


	private _toaster = inject(ToasterService);

	ngOnInit() {
		this._toaster.toasts$.subscribe((toasts) => this.toasts.set(toasts));

    console.log("Toaster component: ", this.toasts);
    
	}

	public removeToast(toast: IToast) {
		this._toaster.removeToast(toast);
	}

	public truncate(text: string): string {
		return truncateString(text, this.stringMaxLength);
  }
}
