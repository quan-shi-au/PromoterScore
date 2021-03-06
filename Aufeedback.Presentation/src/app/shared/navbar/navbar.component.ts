import { Component, OnInit, Renderer, ViewChild, ElementRef, Directive } from '@angular/core';
import { ROUTES } from '../.././sidebar/sidebar.component';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

var misc:any ={
    navbar_menu_visible: 0,
    active_collapse: true,
    disabled_collapse_init: 0,
}
declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{
    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;

    public Title: string;

    @ViewChild("navbar-cmp") button;

    constructor(location: Location, private renderer: Renderer, private element: ElementRef,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit() {

        this.getTitle();

        this.router.events
            .filter((event) => event instanceof NavigationEnd)
            .subscribe(url => {
            this.getTitle();
        });

        this.listTitles = ROUTES.filter(listTitle => listTitle);

        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        if($('body').hasClass('sidebar-mini')){
            misc.sidebar_mini_active = true;
        }
        $('#minimizeSidebar').click(function(){
            var $btn = $(this);

            if(misc.sidebar_mini_active == true){
                $('body').removeClass('sidebar-mini');
                misc.sidebar_mini_active = false;

            }else{
                setTimeout(function(){
                    $('body').addClass('sidebar-mini');

                    misc.sidebar_mini_active = true;
                },300);
            }

            var simulateWindowResize = setInterval(function(){
                window.dispatchEvent(new Event('resize'));
            },180);

            setTimeout(function(){
                clearInterval(simulateWindowResize);
            },1000);
        });
    }

    isMobileMenu(){
        if($(window).width() < 991){
            return false;
        }
        return true;
    }

    sidebarOpen(){
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        },500);
        body.classList.add('nav-open');
        this.sidebarVisible = true;
    }
    sidebarClose(){
        var body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    }
    sidebarToggle(){
        if(this.sidebarVisible == false){
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    }


    getTitle() {

        if (this.location.prepareExternalUrl(this.location.path()) == '/dashboard/overview') {
            this.Title = 'Home Page';
        } else if (this.location.prepareExternalUrl(this.location.path()) == '/dashboard/red') {
            this.Title = 'Red Detail Page';
        } else if (this.location.prepareExternalUrl(this.location.path()) == '/dashboard/green') {
            this.Title = 'Green Detail Page';
        }

        
    }

    getPath(){
        return this.location.prepareExternalUrl(this.location.path());
    }
}
