import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../../services/auth.service";
import {Globals} from "../../../common/globals";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    projectName = "";

    credentials = {
        email: "admin@user.com",
        password: "secret"
    };

    showMessageError: boolean = false;

    constructor(private authService: AuthService, private router: Router,private globals: Globals)
    {
        this.projectName = globals.projectName;
    }

    ngOnInit() {

    }

    submit()
    {
        this.authService.login(this.credentials).subscribe((data) => {
            this.router.navigate(['categories/list']);
        },() => this.showMessageError = true);

        return false;
    }
}
