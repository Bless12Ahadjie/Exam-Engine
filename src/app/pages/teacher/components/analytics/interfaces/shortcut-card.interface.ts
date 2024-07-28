export type IShortcutCard = {
	iconSrc: string;
	label: string;
	value: string;
	link: 'total-students'
	| 'completed-students'
	| 'pass-students'
	| 'fail-students' | '';
};