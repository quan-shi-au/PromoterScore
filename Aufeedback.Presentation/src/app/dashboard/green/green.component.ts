import { Component, OnInit } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import { AuthenticationService } from '../../core/services/authentication.service'

@Component({
    selector: 'green-cmp',
    templateUrl: './green.component.html',
    styleUrls: ['green.css']
})
export class GreenComponent implements OnInit {

    public localQuestionType = 'green';
    public isFeedbackProvided: boolean = false;
    public localUserName: string;

    constructor(
        private authenticationService: AuthenticationService,
        private http: HttpClient

    ) {
    }

    ngOnInit() {
        this.loadFeedbackStatus();
    }

    refreshPageLocal(event) {
        this.loadFeedbackStatus();

    }

    loadFeedbackStatus() {

        this.localUserName = this.authenticationService.GetCurrentUserId();

        this.http.get('https://aufeedbackapi.azurewebsites.net/api/user/get?userName=' + this.localUserName + '&questionType=' + this.localQuestionType).subscribe(
            (data: any) => {

                debugger;

                if (!data.IsTimeUp && data.IsRecordExisting)
                    this.isFeedbackProvided = true;
                else
                    this.isFeedbackProvided = false;

            },
            (err: HttpErrorResponse) => {
                console.log(err);

            }
        );

    }

}