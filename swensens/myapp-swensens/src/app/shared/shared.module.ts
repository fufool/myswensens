import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import {provideNativeDateAdapter} from '@angular/material/core';

import { PromotionsFeaturedComponent } from './promotions-featured/promotions-featured.component';

@NgModule({
  declarations: [
    PromotionsFeaturedComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    RouterModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule
  ],
  exports: [
    MatSidenavModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    RouterModule,
    PromotionsFeaturedComponent,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'th-TH' },
    provideNativeDateAdapter(),
    DatePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
