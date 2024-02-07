import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router'; 
import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm!: UntypedFormGroup;
  public hide = true;
  error = '';
  constructor(public fb: UntypedFormBuilder, public router:Router, private authService: AuthService) { 

  }

  ngOnInit(){
    this.loginForm = this.fb.group({
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      rememberMe: false
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  public onLoginFormSubmit(values:Object):void {
    // if (this.loginForm.valid) {
    //   this.router.navigate(['/']);
    // }
    if (this.loginForm.invalid) {
      this.error = 'email and Password not valid !';
      return;
    } else {
      this.authService
        .login(this.f['email'].value, this.f['password'].value)
        .subscribe({
          next: (res) => {
            if (res) {
              if (res) {
                console.log(res)
                const token = res.token;
                if (token) {
                  this.router.navigate(['/dashboard']);
                }
              } else {
                this.error = 'Invalid Login';
              }
            } else {
              this.error = 'Invalid Login';
            }
          },
          error: (error) => {
            this.error = error;
          },
        });
    }
  }
}
