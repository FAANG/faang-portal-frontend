import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ApiErrorComponent } from './components/api-error.component';
import { ApiSlowResponseComponent } from './components/api-slow-response.component';
import { NavbarComponent } from './components/navbar.component';
import { FaangFilterComponent } from './components/faang-filter.component';
import { ActiveFiltersComponent } from './components/active-filters.component';

@NgModule({
  imports: [ CommonModule, RouterModule, FormsModule ],
  declarations: [ ApiErrorComponent, ApiSlowResponseComponent, NavbarComponent, FaangFilterComponent, ActiveFiltersComponent ],
  exports: [ CommonModule, RouterModule, FormsModule, ApiErrorComponent, ApiSlowResponseComponent, NavbarComponent, FaangFilterComponent, ActiveFiltersComponent ]
})
export class SharedModule { }