import { Component, OnInit } from '@angular/core';
import {BRAND_NAME} from "../shared/global";
import {Router} from "@angular/router";

@Component({
  selector: 'app-inner',
  templateUrl: './inner.component.html',
  styleUrls: ['./inner.component.scss']
})
export class InnerComponent implements OnInit {
  brandName= BRAND_NAME;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem("OMS_KEY");
    this.router.navigateByUrl('auth/login');
  }
}
