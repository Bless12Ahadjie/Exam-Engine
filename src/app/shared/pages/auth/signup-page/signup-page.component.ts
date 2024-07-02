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
import { HttpClientModule } from '@angular/common/http';
import { ToasterService } from '../../../components/toaster/services/toaster.service';
import { Payload } from '../../../../../Interfaces/interfaces';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [FormsModule, RouterModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
  providers: [HttpClientModule],
})
export class SignupPageComponent {
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
          validators: [Validators.required, Validators.minLength(3)],
          updateOn: 'blur',
        },
      ],
      email: [
        '',
        {
          validators: [Validators.required, Validators.minLength(3), Validators.email],
          updateOn: 'blur',
        },
      ],
      gender: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  get username() {
    return this.form.controls['username'];
  }

  get email() {
    return this.form.controls['email'];
  }

  get gender() {
    return this.form.controls['gender'];
  }

  get password() {
    return this.form.controls['password'];
  }

  get confirmPassword() {
    return this.form.controls['confirmPassword'];
  }

  register() {
    if(this.formIsValid()){
      if (
        this.form.controls['password'].value ===
        this.form.controls['confirmPassword'].value
      ) {
        this.isLoading = true;
  
        this._authService.registerUser(this.form.value).subscribe({
          next: (res: Payload) => {
            this.responseHandler(res);
          },
          error: (err: Error) => {
            this.errorHandler(err);
          },
        });
      } else {
        this._toaster.showToast({
          message: 'Passwords do not match',
          type: 'error',
          duration: 3000,
        });
      }
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

    if (response.status === 201) {
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

  errorHandler(response: Error) {
    this.isLoading = false;
    this._toaster.showToast({
      message: response.message,
      type: 'error',
      duration: 3000,
    });
  }
}
