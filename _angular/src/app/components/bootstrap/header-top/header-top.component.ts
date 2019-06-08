import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {Globals} from "../../../common/globals";

@Component({
  selector: 'header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.css']
})
export class HeaderTopComponent implements OnInit {
  projectName = "";
  constructor(public authService: AuthService, private router: Router,private globals: Globals)
  {
    this.projectName = globals.projectName;
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout().subscribe(() => this.router.navigate(['login']))
  }
}
