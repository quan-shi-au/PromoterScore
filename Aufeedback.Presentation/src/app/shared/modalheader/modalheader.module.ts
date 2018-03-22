import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalheaderComponent } from './modalheader.component';
@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    declarations: [ModalheaderComponent ],
    exports: [ModalheaderComponent ]
})

export class ModalheaderModule {}
