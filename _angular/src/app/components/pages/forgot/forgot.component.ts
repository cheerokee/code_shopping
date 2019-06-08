import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {Globals} from "../../../common/globals";

@Component({
  selector: 'forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  projectName = "";

  credentials = {
    email: ""
  };

  showMessageError: boolean = false;

  constructor(private authService: AuthService, private router: Router,private globals: Globals) {
    this.projectName = globals.projectName;
  }

  ngOnInit() {
  }

  submit()
  {
    this.authService.forgot(this.credentials).subscribe((response) => {
      console.log('teste');
      // this.router.navigate(['login']);
    },() => {
      this.showMessageError = true
    });

    return false;
  }
}
