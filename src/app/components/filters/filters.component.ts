import {Component, Input, Output, EventEmitter, ViewEncapsulation, OnInit, OnChanges} from '@angular/core';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.pug',
    styleUrls: [
        './filters.component.styl'
    ],
    encapsulation: ViewEncapsulation.None
})
export class FiltersComponent {

    @Input('filters') filters: any[];
    @Output('setFilter') public setFilter: EventEmitter<any> = new EventEmitter();

    selectedFilters = {};
    
    changeFilter(field, value) {
        if (this.isFilerSelected(field, value)) {
            delete this.selectedFilters[field];
        } else {
            this.selectedFilters[field] = value;
        }
        this.setFilter.emit(this.selectedFilters);
    }
    
    isFilerSelected(field, value) {
        return this.selectedFilters[field] === value;
    }
}
