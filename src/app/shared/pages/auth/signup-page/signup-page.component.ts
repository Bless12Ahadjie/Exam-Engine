import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from "../../../../services/auth/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {ToasterService} from "../../../components/toaster/services/toaster.service";


@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
  providers:[HttpClientModule]
})
export class SignupPageComponent {
  _formBuilder = inject(FormBuilder)
  authService = inject(AuthService)
  route = inject(Router)
  toast = inject(ToasterService)



  form = this._formBuilder.group({
    username: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(3),

        ],
        updateOn: 'blur',
      },
    ],
    email:['',
      {
        validators: [
          Validators.required,
          Validators.minLength(3),

        ],
        updateOn: 'blur',

      }
    ],
    gender:[
      '',
      [
        Validators.required
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
      ],
    ],
    confirmPassword: [
      '',
      [Validators.required,],
    ],
    agreedTermsAndConditions: [
      false,
      [Validators.required, Validators.requiredTrue],
    ],
  });


  get username() {
    return this.form.controls['username'];
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


  register(){
    if(this.form.controls['password'].value === this.form.controls['confirmPassword'].value){
      const registerDetails = {
        username:this.form.controls['username'].value,
        email:this.form.controls['email'].value,
        gender:this.form.controls['gender'].value,
        password:this.form.controls['confirmPassword'].value
      }
      this.authService.registerUser(registerDetails).subscribe(
        {
          next:(res)=> {
            setTimeout(()=>{
              this.toast.showSuccess("success")
            },2000)
            this.route.navigate(['/login'])
          },
          error:(err)=> {
            console.log(err)
            setTimeout(()=>{
              this.toast.showError(err.message)
            },2000)
          }
        }
      )
    }
    else return


  }

}
