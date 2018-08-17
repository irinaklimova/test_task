import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersPageComponent } from './pages/users/users.page';

const usersRoutes: Routes = [
    {
        path: '',
        component: UsersPageComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(usersRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class UsersRoutingModule {
}
