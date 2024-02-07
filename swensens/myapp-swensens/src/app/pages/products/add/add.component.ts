import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {
  productlist!: UntypedFormGroup;
  submitted = false;
  categoryList: string[] = [
    'Ice Screem Cake',
    'Ice Screem Quart',
    'Topping',
  ];
  constructor(
    private fb: UntypedFormBuilder,
    private dialogRef: MatDialogRef<AddComponent>,
    private http: HttpClient
  ) {}

  ngOnInit(){
    this.productlist = this.fb.group({
      name: ['',[Validators.required]],
      price: ['', [Validators.required]],
      image: [''],
      category: ['', [Validators.required]],
      description: ['']
    })
  }

onSubmit() {
  this.submitted = true;
  if (this.productlist.valid) {
    this.http.post(`${environment.apiUrl}/products`, this.productlist.value)
      .subscribe({
        next: (res) => {
          alert("Products Added Successfully!");
          location.reload();
        },
        error: (err) => {
          console.error(err);
        }
      });
  } else {
    console.log("Form is invalid!");
  }
}

  onCancel(){
    this.dialogRef.close();
  }
}
