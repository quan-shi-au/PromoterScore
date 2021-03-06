﻿import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import { AuthenticationService } from '../../core/services/authentication.service';
import { AlertService } from '../../core/services/alert.service'
declare var $:any;

@Component({
    moduleId:module.id,
    selector: 'login-cmp',
    templateUrl: './login.component.html',
    styleUrls: ['login.css']
})

export class LoginComponent implements OnInit{
    test : Date = new Date();
    public toggleButton;
    public sidebarVisible: boolean;
    public nativeElement: Node;
    model: any = {};

    public returnUrl: string;

    constructor(
        private element: ElementRef,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService

    ) {

        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }


    login() {

        if (!this.model.username)
            this.alertService.error('Please input user name.');
        else {
            this.authenticationService.login(this.model.username);
            this.redirect();
        }
    
    }

    redirect() {
        if (this.authenticationService.IsLoggedIn()) {

            if (this.returnUrl) {
                this.router.navigateByUrl(this.returnUrl);
            } else {
                this.router.navigateByUrl('/dashboard/overview');
            }
        }
        else
            this.alertService.error('Wrong user id or password');

    }

    sidebarToggle(){
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if(this.sidebarVisible == false){
            setTimeout(function(){
                toggleButton.classList.add('toggled');
            },500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }

    ngOnInit() {

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'];

        this.checkFullPageBackgroundImage();

        var navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        setTimeout(function () {
            $('.card').removeClass('card-hidden');
        }, 700);

    }

    checkFullPageBackgroundImage() {
        var $page = $('.full-page');
        var image_src = $page.data('image');

        if (image_src !== undefined) {
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };


}
