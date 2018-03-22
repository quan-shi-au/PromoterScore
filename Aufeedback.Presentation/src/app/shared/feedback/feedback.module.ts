import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ModalheaderModule } from '../modalheader/modalheader.module';
import { FeedbackComponent } from './feedback.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from '../simplemodal/modal.module';

@NgModule({
    imports: [
        CommonModule,
        ModalheaderModule,
        FormsModule,
        ModalModule
    ],
    declarations: [FeedbackComponent],
    exports: [FeedbackComponent],
})

export class FeedbackModule {}
