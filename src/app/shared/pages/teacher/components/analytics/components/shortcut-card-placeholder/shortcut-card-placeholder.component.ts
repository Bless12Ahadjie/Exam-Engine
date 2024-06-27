import { Component, Input } from '@angular/core';
import { IShortcutCard } from '../../interfaces/shortcut-card.interface';

@Component({
  selector: 'app-shortcut-card-placeholder',
  standalone: true,
  imports: [],
  templateUrl: './shortcut-card-placeholder.component.html',
  styleUrl: './shortcut-card-placeholder.component.scss'
})
export class ShortcutCardPlaceholderComponent {
	@Input({ required: true }) props: Omit<IShortcutCard, 'value' | 'link'> = {
		iconSrc: '',
		label: '',
	};
}
