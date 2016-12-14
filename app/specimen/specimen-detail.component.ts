import { Component } from '@angular/core';

import { DoSomethingService } from '../core/services/do-something.service';

@Component({
    selector: 'specimen-detail',
    templateUrl: './specimen-detail.component.html',
})
export class SpecimenDetailComponent{ 
  constructor(
    public doSomethingService: DoSomethingService
  ){}
};
