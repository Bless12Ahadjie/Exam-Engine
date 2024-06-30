import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { ToasterService } from '../../../components/toaster/services/toaster.service';
import { Payload } from '../../../../../Interfaces/interfaces';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  isLoading: boolean = false;

  _formBuilder = inject(FormBuilder);
  _authService = inject(AuthService);
  _toaster = inject(ToasterService);
  _router = inject(Router);

  form: FormGroup;

  constructor() {
    this.form = this._formBuilder.group({
      username: [
        '',
        {
          validators: [Validators.required],
          updateOn: 'blur',
        },
      ],
      password: ['', [Validators.required]],
    });
  }

  get username() {
    return this.form.controls['username'];
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
          if (error.status === 403) {
            console.error('Forbidden: Check your credentials or permissions.');
            this._toaster.showToast({
              message: 'Forbidden: Check your credentials or permissions.',
              type: 'error',
              duration: 3000,
            });
          }
        },
      });
    } else {
      this.isLoading = false;
      this._toaster.showToast({
        message: 'Form is invalid. Please check the errors.',
        type: 'error',
        duration: 3000,
      });
      this.form.markAllAsTouched();
    }
  }

  formIsValid() {
    return this.form.valid;
  }

  responseHandler(response: Payload) {
    this.isLoading = false;

    if (response.status === 200) {
      this._toaster.showToast({
        message: response.message,
        type: 'success',
        duration: 3000,
      });
      this._router.navigate(['/login']);
    } else {
      this._toaster.showToast({
        message: response.message,
        type: 'error',
        duration: 3000,
      });
    }
  }

  errorHandler(error: Error) {
    this.isLoading = false;
    this._toaster.showToast({
      message: error.message,
      type: 'error',
      duration: 3000,
    });
  }
}
