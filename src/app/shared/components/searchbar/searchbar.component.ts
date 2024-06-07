import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {
	@Output() searchTermValue: EventEmitter<string> = new EventEmitter<string>();
	public searchTerm: string = '';

	public handleSearchFilter(event: string) {
		this.searchTermValue.emit(event);
	}
}
