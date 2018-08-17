import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app';
import {enableProdMode, NgModuleRef} from '@angular/core';

let ngModule: NgModuleRef<any>;

enableProdMode();

export function main(): Promise<any> {
    return platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .then(mod => ngModule = mod)
        .catch((err) => console.error(err));
}

main();
