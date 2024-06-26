import { Component, signal } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { teacherNavLinks } from './teacher.navlinks';
import { INavLinks } from './components/sidebar/sidebar.interface';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, RouterOutlet],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.scss',
})
export class TeacherComponent {
  isSidebarVisible = signal<boolean>(false);

  links: INavLinks = teacherNavLinks;

  public toggleSidebar() {
    this.isSidebarVisible.update((prev) => !prev);
  }
}
