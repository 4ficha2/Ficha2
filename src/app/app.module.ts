import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
//import { wifiComponent } from '../pages/wifi/wifi';

import { Hotspot } from '@ionic-native/hotspot';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { FicharPage } from '../pages/fichar/fichar';
import { VarGlobal } from './MiVarGlobal.service';
import { HistoricoPage } from '../pages/historico/historico';
import { EmailComposer } from '@ionic-native/email-composer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FicharPage,
    HistoricoPage,
    //wifiComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FicharPage,
    HistoricoPage,
    //wifiComponent,
  ],
  providers: [
    Hotspot,
    StatusBar,
    SplashScreen,
    VarGlobal,
    EmailComposer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
