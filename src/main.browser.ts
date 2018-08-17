/**
 * Angular bootstrapping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { decorateModuleRef } from './app/environment';
import { createNewHosts, hmrModule } from '@angularclass/hmr';

/**
 * App Module
 * our top level module that holds all of our components
 */
import { AppModule } from './app';
import { ApplicationRef, NgModuleRef } from '@angular/core';

/**
 * Bootstrap our Angular app with a top level NgModule
 */
let ngModule: NgModuleRef<any>;

export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(decorateModuleRef)
    .then(mod => ngModule = mod)
    .then((ngModuleRef: any) => {
      return hmrModule(ngModuleRef, module);
    })
    .catch((err) => console.error(err));
}

switch (document.readyState) {
  case 'loading':
    document.addEventListener('DOMContentLoaded', _domReadyHandler, false);
    break;
  case 'interactive':
  case 'complete':
  default:
    main();
}

function _domReadyHandler() {
 document.removeEventListener('DOMContentLoaded', _domReadyHandler, false);
 main();
}
