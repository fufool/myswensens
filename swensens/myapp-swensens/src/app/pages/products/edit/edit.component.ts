import { HttpClient } from '@angular/common/http';
import { Component,Inject,OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  productlist!: UntypedFormGroup;
  submitted = false;
  categoryList: string[] = [
    'Ice Screem Cake',
    'Ice Screem Quart',
    'Topping',
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: any,
    private fb: UntypedFormBuilder,
    private dialogRef: MatDialogRef<EditComponent>,
    private http: HttpClient
  ) {
    this.productlist = this.fb.group({
      nameProducts: ['',[Validators.required]],
      priceProducts: ['', [Validators.required]],
      imageProducts: [''],
      category: ['', [Validators.required]],
      descriptionProducts: ['']
    })
  }

  ngOnInit(){
    this.productlist.patchValue(this.data)
    console.log(this.data)
  }

updateProducts(id: number, data: any): Observable<any> {
  return this.http.put(`${environment.apiUrl}/products/${id}`, data);
}

onSubmit() {
  this.submitted = true;
  if (this.productlist.valid) {
    console.log(this.productlist.value)
    if(this.data){
      this.updateProducts(this.data.id, this.productlist.value)
      .subscribe({
        next: (res) => {
          console.log('success', res)
          alert("Products Edited Successfully!");
          location.reload();
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  } else {
    console.log("Form is invalid!");
  }
}

  onCancel(){
    this.dialogRef.close();
  }
}
