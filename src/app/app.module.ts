import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ApplicationRef, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS , HttpClientModule} from '@angular/common/http';
import { createInputTransfer, createNewHosts, removeNgStyles } from '@angularclass/hmr';

import { ENV_PROVIDERS } from './environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';

import { DataService } from './services/data.service';
import { UserService } from './services/user.service';

import { AppInterceptors } from './app.interceptors';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptors,
    multi: true
  },
    ENV_PROVIDERS,
    DataService,
    UserService,
  ]
})

/**
* Hot replacement app module
*/
export class AppModule {
  constructor(public appRef: ApplicationRef) {
  }

  hmrOnInit(store) {
    if (!store || !store.state) {
      return;
    }
    if ('restoreInputValues' in store) {
      store.restoreInputValues();
    }
    // change detection
    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    store.disposeOldHosts = createNewHosts(cmpLocation);
    store.restoreInputValues = createInputTransfer();
    removeNgStyles();
  }
  
  hmrAfterDestroy(store) {
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
