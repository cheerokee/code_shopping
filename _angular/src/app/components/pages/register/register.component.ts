import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    credentials = {
        email: "admin@user.com",
        password: "secret"
    };

  constructor() { }

  ngOnInit() {
  }

}
