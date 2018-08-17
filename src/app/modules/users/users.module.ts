import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersPageComponent } from './pages/users/users.page';

import { ComponentsModule } from '../../components/components.module';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
    imports: [
        ComponentsModule,
        CommonModule,
        FormsModule,
        UsersRoutingModule
    ],
    declarations: [
        UsersPageComponent
    ]
})
export class UsersModule {
}
