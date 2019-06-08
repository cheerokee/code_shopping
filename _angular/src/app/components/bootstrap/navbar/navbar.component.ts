import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {NavigationEnd, Router} from "@angular/router";
import {Globals} from "../../../common/globals";

declare const $;

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  projectName = "";
  constructor(public authService: AuthService, private router: Router,private globals: Globals) {
    this.projectName = globals.projectName;
    router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
            this.ngOnInit();
        }
        // Instance of should be:
        // NavigationEnd
        // NavigationCancel
        // NavigationError
        // RoutesRecognized
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout().subscribe(() => this.router.navigate(['login']))
  }
}
