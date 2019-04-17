import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetComponent } from './dataset.component';
import {HeaderComponent} from '../shared/header/header.component';
import {ActiveFilterComponent} from '../shared/active-filter/active-filter.component';
import {FilterComponent} from '../shared/filter/filter.component';
import {ExportComponent} from '../shared/export/export.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FilterPipe} from '../pipes/filter.pipe';
import {SortPipe} from '../pipes/sort.pipe';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DatasetComponent', () => {
  let component: DatasetComponent;
  let fixture: ComponentFixture<DatasetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DatasetComponent,
        HeaderComponent,
        ActiveFilterComponent,
        FilterComponent,
        ExportComponent,
        FilterPipe,
        SortPipe
      ],
      imports: [
        NgxPaginationModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
