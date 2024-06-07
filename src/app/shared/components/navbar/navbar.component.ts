import { Component } from '@angular/core';
import { BrandComponent } from '../brand/brand.component';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { INavlinks } from './navbar.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileCardComponent } from '../profile-card/profile-card.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [BrandComponent, SearchbarComponent, ProfileCardComponent, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  public isMenuToggled: boolean = false;
  public isProfileToggled: boolean = false;
  public navlinks: INavlinks[] = [
      {
        label: 'Home',
        link: '/home'
      },
      {
        label: 'My Exam',
        link: '/exam'
      }
    ];

    public toggleMenu(): void {
    this.isMenuToggled =!this.isMenuToggled;
  }

  public toggleProfile(): void {
    this.isProfileToggled =!this.isProfileToggled;
  }

  public getProfileMenu(menu: string): void {
    console.log(menu);
    
  }
}
