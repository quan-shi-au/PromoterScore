import {Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs';
import { ModalService } from '../../core/services/modal.service';
import {HttpClient} from '@angular/common/http';

@Component({
    moduleId: module.id.toString(),
    selector: 'app-feedback',
    templateUrl: 'feedback.component.html',
    styleUrls: ['feedback.css']
})

export class FeedbackComponent implements OnInit {
    @Input() questionType: string;
    @Input() userName: string;
    @Output() refreshPage: EventEmitter<number> = new EventEmitter<number>();
    

    public ranking: number = null;
    public isRankingValid: boolean = false;
    public userQuestion: string;
    public isFirstQuestion: boolean = true;
    public answer: string;
    public isAnswerValid: boolean = false;
    public secondQuestion: string = '';
    public objectName: string;
    public resetMargin = false;
    public localCaption = 'Questions';
    public localTitle = 'Your feedback is important to us';

    constructor(
        private modalService: ModalService,
        private http: HttpClient
) { }



    addPartner() {

        this.modalService.open('partner-insert-modal');
    }

    closeModalLocal(event) {

        this.modalService.close('partner-insert-modal');
    }

    validateRank(questionForm) {
        if (+this.ranking >= 1 && +this.ranking <= 10)
            return this.isRankingValid = true;
        else
            return this.isRankingValid = false;
    }

    ngOnInit() {

        this.isFirstQuestion = true;

        if (this.questionType == 'site')
            this.objectName = 'site';
        else if (this.questionType == 'green')
            this.objectName = 'green service';
        else if (this.questionType == 'red')
            this.objectName = 'red service';

    }

    submitQuestion(questionForm) {

        if (this.isFirstQuestion) {
            this.isFirstQuestion = false;

            if (this.ranking >= 1 && this.ranking <= 4)
                this.secondQuestion = 'What can we do to  improve?';
            else if (this.ranking >= 5 && this.ranking <= 8)
                this.secondQuestion = 'Is there anything we can do to improve?';
            if (this.ranking >= 9 && this.ranking <= 10)
                this.secondQuestion = 'Is there anything you particularly like?';

            this.http.post('https://aufeedbackapi.azurewebsites.net/api/user/Post?userName=' + this.userName + '&questionType=' + this.questionType, {})
                .subscribe(
                (data: any) => {
                    this.refreshPage.emit();
                },
                (err) => {
                }
            );
        }
        else
            this.modalService.close('partner-insert-modal');

    }

    submitQuestion2(secondQuestionForm) {
        //todo: save answers into repository.
    }

    validateAnswer(questionForm) {
        if (this.answer)
            this.isAnswerValid = true;
        else
            this.isAnswerValid = false;
    }
}
