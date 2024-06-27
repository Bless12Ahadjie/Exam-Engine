import { INavLinks } from './components/sidebar/sidebar.interface';

export const teacherNavLinks: INavLinks = {
  links: [
    {
      title: 'Home',
      defaultIconSrc: '/assets/icons/home.svg',
      routerLink: 'home',
    },
    {
      title: 'Manage Exams',
      defaultIconSrc: '/assets/icons/manage-exams.svg',
      routerLink: 'manage-exams',
      // children: [{ title: '', routerLink: '' }],
    },
    {
      title: 'Analytics',
      defaultIconSrc: '/assets/icons/analytics.svg',
      routerLink: 'analytics',
      // children: [{ title: '', routerLink: '' }],
    },
    {
      title: 'Settings',
      defaultIconSrc: '/assets/icons/settings.svg',
      routerLink: 'settings',
    },
  ],
};
