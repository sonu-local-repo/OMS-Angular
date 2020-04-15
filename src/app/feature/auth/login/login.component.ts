import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginFailed: boolean;
  loading = false;
  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router, private spinner: NgxSpinnerService ) { }

  ngOnInit(): void {
    this.loginFormBuilder();
  }



  loginFormBuilder(){
    this.loginForm = this.fb.group(
      {
        'username':['', Validators.required],
        'password':['', Validators.required]
      }
    )
  }
  login() {
    if (this.loginForm.invalid) {
      return;
    }

    // this.loading = true;
    this.spinner.show();
    this.loginService.loginUser(this.loginForm.value).subscribe((response) => {

      if (response.token) {
        localStorage.setItem('OMS_KEY', response.token);
        this.router.navigateByUrl('/')
      }
      this.spinner.hide()
    }, (error) => {
      console.log(error)
        this.loginFailed = true;
      this.spinner.hide();
    })

  }
}
