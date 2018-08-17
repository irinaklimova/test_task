import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import { FiltersComponent } from './filters/filters.component';
import { UsersTableComponent } from './users-table/users-table.component';


@NgModule({
	declarations: [
		FiltersComponent,
		UsersTableComponent
	],
	exports: [
		FiltersComponent,
		UsersTableComponent
	],
	imports: [
		FormsModule,
		CommonModule,
		RouterModule
	]
})
export class ComponentsModule {

}
