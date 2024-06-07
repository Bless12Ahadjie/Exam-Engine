import { Component } from '@angular/core';
import { INavlinks } from '../navbar/navbar.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  public cardItems: INavlinks[] = [
    {
      label: 'Your Profile',
      link: '/profile'
    },
    {
      label: 'Settings',
      link: '/settings'
    }
  ];
}
