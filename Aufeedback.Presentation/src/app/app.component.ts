import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './core/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit  {

    constructor(
        private spinnerService: SpinnerService
    ) {

    }

    ngOnInit() {
    }

    getLoading() {

        return this.spinnerService.getIsLoadding();
    }
}
