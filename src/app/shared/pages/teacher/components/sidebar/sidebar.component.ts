import {
  Component,
  InputSignal,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { BrandComponent } from '../../../../components/brand/brand.component';
import { INavLinks } from './sidebar.interface';
import { Subscription, filter } from 'rxjs';
import { Event, NavigationEnd, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [BrandComponent, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  closeEvent = output<void>();
  toggled = input.required<boolean>();
  links: InputSignal<INavLinks> = input.required();

  currentRoute = signal<string>('');
  dropdownState: { [key: string]: boolean } = {};

  private _router = inject(Router);
  private _routerSubscription!: Subscription;

  constructor() {
    this._routerSubscription = this._router.events
      .pipe(filter((event: Event) => event instanceof NavigationEnd))
      .subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute.set(event.url);
        }
      });
  }

  public closeSidebar() {
    this.closeEvent.emit();
  }

  ngOnInit(): void {
		this.links().links.forEach((navLink) => {
			this.dropdownState[navLink.routerLink] = false;
		});
	}

	isDropdownOpen(navLinkId: string) {
		return this.dropdownState[navLinkId];
	}

	public openDropDownOnClick(navLinkId: string) {
		this.dropdownState[navLinkId] = !this.dropdownState[navLinkId];
	}

  ngOnDestroy(): void {
		this._routerSubscription.unsubscribe();
	}
}
