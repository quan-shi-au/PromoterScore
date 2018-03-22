import { Component, OnInit } from '@angular/core';

import { AlertService } from '../../core/services/alert.service';

@Component({
    moduleId: module.id.toString(),
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.css'],
})

export class AlertComponent {
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}