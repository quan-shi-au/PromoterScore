import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../core/services/authentication.service';

declare var $: any;
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}


@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    public UserFullName: string = 'User Name';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
    }

    isNotMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }

    ngOnInit() {

        var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

        this.menuItems = ROUTES;
        isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

        if (isWindows) {
            $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();
            $('html').addClass('perfect-scrollbar-on');
        } else {
            $('html').addClass('perfect-scrollbar-off');
        }

        this.UserFullName = this.authenticationService.GetCurrentUserId();

    }


    ngAfterViewInit() {
        var $sidebarParent = $('.sidebar .nav > li.active .collapse li.active > a').parent().parent().parent();

        var collapseId = $sidebarParent.siblings('a').attr("href");

        $(collapseId).collapse("show");
    }

    logout() {

        this.authenticationService.logOut();

        this.router.navigateByUrl('/pages/login');

    }
}

//Menu Items
export let ROUTES: RouteInfo[] = [
    {
        path: '/dashboard/overview',
        title: 'Homepage',
        type: 'link',
        icontype: 'ti-dashboard',
    }, 
    {
        path: '/dashboard/red',
        title: 'Red Detail',
        type: 'link',
        icontype: 'ti-world',
    }, {
        path: '/dashboard/green',
        title: 'Green Detail',
        type: 'link',
        icontype: 'ti-id-badge',
    }
];
