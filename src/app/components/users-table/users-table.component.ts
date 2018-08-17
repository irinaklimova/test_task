import {Component, Input, OnChanges, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-users-table',
    templateUrl: './users-table.component.pug',
    styleUrls: [
        './users-table.component.styl'
    ],
    encapsulation: ViewEncapsulation.None
})
export class UsersTableComponent implements OnChanges {

    @Input('users') users: any;
    
    ASC = 1;
    DESC = -1;
    currentSort = {};
    fields = ['name', 'age', 'gender', 'department', 'address'];

    ngOnChanges() {
        const field = Object.getOwnPropertyNames(this.currentSort)[0];
        this.sortBy(field, this.currentSort[field]);
    }

    sortBy(field, order) {
        this.currentSort = {};
        this.currentSort[field] = order;
        if (field === 'address') {
            this.users = this.sorting('street', order);
            this.users = this.sorting('city', order);
        } else {
            this.users = this.sorting(field, order);
        }
    }
    
    sorting(field, order) {
        return this.users.sort((user1, user2) => {
            const field1 = user1[field] || user1.address[field];
            const field2 = user2[field] || user2.address[field];
            if (field1 < field2) {
                return -1 * order;
            } else if (field1 > field2) {
                return 1 * order;
            }
            return 0;
        });
    }

    isSorted(field, order) {
        return this.currentSort[field] === order;
    }
}
