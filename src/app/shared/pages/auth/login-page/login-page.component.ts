import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from "../../../../services/auth/auth.service";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule


  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  _formBuilder = inject(FormBuilder)
  route = inject(Router)
  authService =inject(AuthService)


  form = this._formBuilder.group({
    username: [
      '',
      {
        validators: [Validators.required, ],
        updateOn: 'blur',
      },
    ],
    password: ['', [Validators.required]],
  });


  get username() {
    return this.form.controls['username'];
  }

  get password() {
    return this.form.controls['password'];
  }


  login(){
    let formData = this.form.value;
    console.log(formData)
    this.authService.loginUser(formData).subscribe(
      {
        next:(res)=>{
          this.route.navigate(['/student/dashboard'])

        },
        error:(err)=>{
          console.log(err)
        }
      }
    )
  }
}
