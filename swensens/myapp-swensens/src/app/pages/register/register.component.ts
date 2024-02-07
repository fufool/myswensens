import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { emailValidator } from '../../theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public registerForm!: UntypedFormGroup;
  public hide = true;
  private API_URL = environment.apiUrl;

  returnUrl!: string;
  birthdayChanged!: string;
  userGendered?: string;
  userGender: string[] = ['ชาย', 'หญิง', 'ไม่ระบุ'];
  acceptTerm?: boolean;
  receiveNewsletter?: boolean;
  constructor(
    public fb: UntypedFormBuilder,
    public router:Router,
    private routeActive: ActivatedRoute,
    public snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private authService: AuthService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstname : ['', Validators.required],
      lastname : ['', Validators.required],
      phone_number : ['', Validators.compose([Validators.required, Validators.minLength(9)])],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.required],
      gender: [this.userGendered, Validators.required],
      birthday: ['', Validators.required],
      acceptTerm: [this.acceptTerm, Validators.requiredTrue],
      receiveNewsletter : [this.receiveNewsletter]
                      
    });

    this.returnUrl = this.routeActive.snapshot.queryParams['returnUrl'] || '/';
  }

  onRegisterFormSubmit(values:Object):void {
    if (this.registerForm.valid) {      
        this.authService.registerUser(this.registerForm.value).subscribe({
          next: (res) => {
            console.log(res)
            this.snackBar.open('สมัครสมาชิกเรียบร้อย!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            this.router.navigate(['/login'])
          }
        });
    } else {
      console.log('Form Invalid', this.registerForm.value);
      this.snackBar.open('กรอกข้อมูลให้ครบถ้วน', '×', { panelClass: 'warn', verticalPosition: 'top', duration: 3000 });
    }
  }

  genderChange(value : any){
    this.userGendered = value.value;
  }

  updateBirthday(event: any) {
    const formattedDate = this.datePipe.transform(event.value, 'dd/MM/yyyy');
    this.registerForm.patchValue({
      birthday: formattedDate
    });
  }
}
