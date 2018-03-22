import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from '../shared/simplemodal/modal.module';

import { AlertModule } from '../shared/alert/alert.module';

import { OverviewComponent } from './overview/overview.component';
import { GreenComponent } from './green/green.component';
import { RedComponent } from './red/red.component';
import { DashboardRoutes } from './dashboard.routing';
import { ModalheaderModule } from '../shared/modalheader/modalheader.module';
import { FeedbackModule } from '../shared/feedback/feedback.module';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DashboardRoutes),
        FormsModule,
        ModalModule,
        AlertModule,
        ModalheaderModule,
        FeedbackModule

    ],
    declarations: [
        OverviewComponent,
        GreenComponent,
        RedComponent,
    ]
})

export class DashboardModule {}
