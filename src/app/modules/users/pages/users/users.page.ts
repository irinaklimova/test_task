import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../../services/user.service';

@Component({
  templateUrl: './users.page.pug',
  styleUrls: [
      './users.page.styl'
  ]
})

export class UsersPageComponent implements OnInit {

    users = [];
    filteredUser = [];
    filters = [];

  constructor(
    private userService: UserService
    ) {

  }

  ngOnInit() {
      this.getUsersList();
  }

  getUsersList() {
      this.userService.getList()
          .then((res) => {
              this.users = this.filteredUser = res;
              this.getFilters(this.users);
          });
  }
  
  getFilters(users) {
      this.filters = [
          {
              name: 'gender',
              options: []
          },
          {
              name: 'department',
              options: []
          },
          {
              name: 'city',
              options: []
          }
      ];
      users.forEach((user) => {
          this.filters.forEach((filter) => {
              const userValue = user[filter.name] || user.address[filter.name];
              this.getFilterFromList(filter, userValue);
          });
      });
  }
  
  getFilterFromList(filter, userValue) {
      let optionFounded = false;
      filter.options.forEach((option) => {
          if (option.value === userValue) {
              option.count = option.count + 1;
              optionFounded = true;
          }
      });
      if (!optionFounded || !this.filters[0].options.length) {
          filter.options.push({value: userValue, count: 1});
      }
  }
  
    setFilter(data) {
      const fields = Object.getOwnPropertyNames(data);
      this.filteredUser = this.users.filter((user) => {
          let result = false;
          fields.forEach((field) => {
              const userValue = user[field] || user.address[field];
              result = result || userValue !== data[field];
          });
          return !result;
      });
      this.getFilters(this.filteredUser);
    }

}
