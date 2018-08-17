import { Injectable } from '@angular/core';

import { DataService } from './data.service';

@Injectable()
export class UserService {

    constructor(
        private dataService: DataService
    ) {
    }

    getList() {
        return this.dataService.get('https://gist.githubusercontent.com/bunopus/f48fbb06578003fb521c7c1a54fd906a/raw/e5767c1e7f172c6375f064a9441f2edd57a79f15/test_users.json');
    }

}
