import {Component, OnInit} from '@angular/core';
import pace from 'pace';
import { AuthService } from "./services/auth.service";
import {NavigationEnd, Router} from "@angular/router";
import {Globals} from "./common/globals";

declare const $;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    title = 'angular-app';
    initOneTime = false;
    previousUrl = '';

    constructor(public authService: AuthService,private router: Router,private globals: Globals){
        globals.projectName = "Code Shopping";
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if(this.previousUrl == '/login'){
                    this.initFunctions();
                }

                this.previousUrl = this.router.url;
            }
        });
    }

    ngOnInit(): void {
        pace.start({
            document: true
        });

        this.initFunctions();
    }

    initFunctions() {
        $(document).ready(function(){
            $('.js-select').selectpicker();

            // initialization of hamburger
            $.HSCore.helpers.HSHamburgers.init('.hamburger');

            // initialization of charts
            $.HSCore.components.HSAreaChart.init('.js-area-chart');
            $.HSCore.components.HSDonutChart.init('.js-donut-chart');
            $.HSCore.components.HSBarChart.init('.js-bar-chart');

            // initialization of sidebar navigation component
            $.HSCore.components.HSSideNav.init('.js-side-nav', {
                afterOpen: function() {
                    setTimeout(function() {
                        $.HSCore.components.HSAreaChart.init('.js-area-chart');
                        $.HSCore.components.HSDonutChart.init('.js-donut-chart');
                        $.HSCore.components.HSBarChart.init('.js-bar-chart');
                    }, 400);
                },
                afterClose: function() {
                    setTimeout(function() {
                        $.HSCore.components.HSAreaChart.init('.js-area-chart');
                        $.HSCore.components.HSDonutChart.init('.js-donut-chart');
                        $.HSCore.components.HSBarChart.init('.js-bar-chart');
                    }, 400);
                }
            });

            // initialization of range datepicker
            $.HSCore.components.HSRangeDatepicker.init('#rangeDatepicker, #rangeDatepicker2, #rangeDatepicker3');

            // initialization of datepicker
            $.HSCore.components.HSDatepicker.init('#datepicker', {
                dayNamesMin: [
                    'SU',
                    'MO',
                    'TU',
                    'WE',
                    'TH',
                    'FR',
                    'SA'
                ]
            });

            // initialization of HSDropdown component
            $.HSCore.components.HSDropdown.init($('[data-dropdown-target]'), {dropdownHideOnScroll: false});

            // initialization of custom scrollbar
            $.HSCore.components.HSScrollBar.init($('.js-custom-scroll'));

            // initialization of popups
            $.HSCore.components.HSPopup.init('.js-fancybox', {
                btnTpl: {
                    smallBtn: '<button data-fancybox-close class="btn g-pos-abs g-top-25 g-right-30 g-line-height-1 g-bg-transparent g-font-size-16 g-color-gray-light-v3 g-brd-none p-0" title=""><i class="hs-admin-close"></i></button>'
                }
            });
        });
    }

    canShowNavBar() {
        return this.authService.isAuth() && !this.inAuthRoute()
    }

    inAuthRoute() {
        let authRoutes = [
            '/',
            '/login',
            '/forgot-password',
            '/register'
        ];

        // @ts-ignore
        return authRoutes.includes(this.router.url);
    }
}
