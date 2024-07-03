import { Component, output } from '@angular/core';
import { BrandComponent } from '../../../../shared/components/brand/brand.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [BrandComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  toggleSidebar = output<void>();

  public onToggleSidebar() {
    this.toggleSidebar.emit();
  }
}
