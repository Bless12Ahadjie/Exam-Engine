import { Component, input } from '@angular/core';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss',
})
export class BrandComponent {
  size = input<string>('');

  textClasses(): string {
    return `bg-gradient-to-r from-[#D428E1F5] to-[#39558E] bg-clip-text text-transparent text-[${this.size()}] font-bold`;
  }
}
