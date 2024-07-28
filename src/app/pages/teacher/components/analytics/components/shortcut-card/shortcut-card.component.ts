import { Component, Input, output } from '@angular/core';
import { IShortcutCard } from '../../interfaces/shortcut-card.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-shortcut-card',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './shortcut-card.component.html',
  styleUrl: './shortcut-card.component.scss',
})
export class ShortcutCardComponent {
  emitView = output<
    | 'total-students'
    | 'completed-students'
    | 'pass-students'
    | 'fail-students'
    | ''
  >();
  @Input({ required: true }) props: IShortcutCard = {
    iconSrc: '',
    label: '',
    value: '',
    link: '',
  };

  setView(
    view:
      | 'total-students'
      | 'completed-students'
      | 'pass-students'
      | 'fail-students'
      | ''
  ) {
    this.emitView.emit(view);
  }
}
