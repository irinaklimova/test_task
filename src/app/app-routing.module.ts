import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
    },
    {
        path: 'users',
        loadChildren: 'app/modules/users/users.module#UsersModule'
    },
    {path: '*', redirectTo: 'users'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                enableTracing: false

            }
        )
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})
export class AppRoutingModule {
}
