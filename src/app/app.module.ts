import { BrowserModule } from '@angular/platform-browser';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './feature/auth/login/login.component';
import {AuthComponent} from "./feature/auth/auth.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./feature/shared/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { InnerComponent } from './feature/inner/inner.component';
import { NavigationListComponent } from './feature/shared/layout/navigation-list/navigation-list.component';
import {NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, POSITION, SPINNER} from "ngx-ui-loader";
import {AuthInterceptor} from "./core/interceptors/auth-interceptor";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxFileDropModule } from 'ngx-file-drop';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import { DatePipe } from '@angular/common';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'green',
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce,
  fgsType: SPINNER.threeBounce,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5,
};

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    InnerComponent,
    NavigationListComponent
  ],
  imports: [
    BrowserModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,

    AppRoutingModule,
    NgxMaterialTimepickerModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxSpinnerModule,
    AmazingTimePickerModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressBarModule,
    NgxFileDropModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
