import {Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {AuthService} from "../../../../services/auth/auth.service";

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule


  ],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent {
  authService = inject(AuthService)
  

}
