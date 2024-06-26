import { INavLinks } from './components/sidebar/sidebar.interface';

export const teacherNavLinks: INavLinks = {
  links: [
    {
      title: 'Dashboard',
      defaultIconSrc: '/assets/icons/dashboard.svg',
      routerLink: 'analytics',
    },
    {
      title: 'Create Question',
      defaultIconSrc: '/assets/icons/create-question.svg',
      routerLink: 'projects',
      children: [{ title: '', routerLink: '' }],
    },
    {
      title: ' Study Materials',
      defaultIconSrc: '/assets/icons/study.svg',
      routerLink: 'manage-users',
      children: [{ title: '', routerLink: '' }],
    },
    {
      title: 'Settings',
      defaultIconSrc: '/assets/icons/settings.svg',
      routerLink: 'account-settings',
    },
  ],
};
