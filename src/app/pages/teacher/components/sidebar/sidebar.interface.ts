export interface INavLinks {
	links: NavLink[];
}

type NavLink = {
	defaultIconSrc: string;
	title: string;
	routerLink: string;
	children?: {
		activeIconSrc?: string;
		defaultIconSrc?: string;
		title: string;
		routerLink: string;
	}[];
};
