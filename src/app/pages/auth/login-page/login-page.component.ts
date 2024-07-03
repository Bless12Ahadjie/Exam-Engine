import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../../../services/token/token.service';
import { AuthService } from '../../../services/auth/auth.service';
import { ToasterService } from '../../../shared/components/toaster/services/toaster.service';
import { LoginPayload } from '../../../../Interfaces/interfaces';
import { UserStore } from '../../../store/user/user.store';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  isLoading: boolean = false;

  private readonly userStore = inject(UserStore);

  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _tokenService = inject(TokenService);
  private _toaster = inject(ToasterService);
  private _router = inject(Router);

  form: FormGroup;

  constructor() {
    this.form = this._formBuilder.group({
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          updateOn: 'blur',
        },
      ],
      password: ['', Validators.required],
    });
  }

  get email() {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }

  login() {
    this.isLoading = true;

    let formData = this.form.value;

    if (this.formIsValid()) {
      this._authService.loginUser(formData).subscribe({
        next: (res) => {
          this.responseHandler(res);
        },
        error: (error) => {
          this.errorHandler(error);
        },
      });
    } else {
      this.isLoading = false;
      this.showToast('Form is invalid. Please check the errors.', 'error');

      this.form.markAllAsTouched();
    }
  }

  formIsValid() {
    return this.form.valid;
  }

  responseHandler(response: LoginPayload) {
    this.isLoading = false;

    if (response.status === 200) {
      this._tokenService.saveToken(response.token);
      this.setUserDetails(response);

      this.showToast(response.message, 'success');

      this.routeToDashboard(response.roles);
    } else {
      this.showToast(response.message, 'error');
    }
  }

  errorHandler(error: Error) {
    this.isLoading = false;
    this.showToast(error.message, 'error');
  }

  private showToast(message: string, type: 'error' | 'success') {
    this._toaster.showToast({
      message,
      type,
      duration: 3000,
    });
  }

  private routeToDashboard(role: string) {
    switch (role) {
      case 'STUDENT':
        this._router.navigate(['/student/dashboard']);
        break;
      case 'TEACHER':
        this._router.navigate(['/teacher']);
        break;
      default:
        break;
    }
  }

  private setUserDetails(details: LoginPayload) {
    this.userStore.setUserId(details.userId);
    this.userStore.setUserRole(details.roles);
    this.userStore.setUserEmail(details.username);
  }
}
