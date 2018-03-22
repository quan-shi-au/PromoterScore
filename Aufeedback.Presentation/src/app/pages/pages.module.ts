import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutes } from './pages.routing';

import { LoginComponent } from './login/login.component';

import { AlertComponent } from '../shared/alert/alert.component';
import { AlertModule } from '../shared/alert/alert.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PagesRoutes),
        FormsModule,
        ReactiveFormsModule,
        AlertModule
    ],
    declarations: [
        LoginComponent
    ]

})

export class PagesModule {}
