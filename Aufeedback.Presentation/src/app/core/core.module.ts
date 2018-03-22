import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthGuard } from './services/auth.guard';
import { TokenInterceptor } from './services/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { AlertService } from './services/alert.service'
import { ModalService } from './services/modal.service';
import { SpinnerService } from './services/spinner.service';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        AlertService,
        ModalService,
        SpinnerService,
  ]
})

export class CoreModule {}
