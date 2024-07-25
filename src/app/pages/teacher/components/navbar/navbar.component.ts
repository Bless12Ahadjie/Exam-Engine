import { Component, inject, OnInit, output } from '@angular/core';
import { BrandComponent } from '../../../../shared/components/brand/brand.component';
import { UserService } from '../../../../services/user/user.service';
import { UserStore } from '../../../../store/user/user.store';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [BrandComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  toggleSidebar = output<void>();

  userStore = inject(UserStore);
  _userService = inject(UserService);

  public onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    this._userService.getUserDetails().subscribe({
      next: (user) => {
        this.userStore.setUserEmail(user.email);
        this.userStore.setUserRole(user.role);
      },
      error: (error) => [console.log('Error: ', error)],
    });
  }
}
