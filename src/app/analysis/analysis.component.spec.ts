import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisComponent } from './analysis.component';
import {HeaderComponent} from '../shared/header/header.component';
import {ActiveFilterComponent} from '../shared/active-filter/active-filter.component';
import {FilterComponent} from '../shared/filter/filter.component';
import {ExportComponent} from '../shared/export/export.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FilterPipe} from '../pipes/filter.pipe';
import {SortPipe} from '../pipes/sort.pipe';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AnalysisComponent', () => {
  let component: AnalysisComponent;
  let fixture: ComponentFixture<AnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AnalysisComponent,
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
    fixture = TestBed.createComponent(AnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hasActiveFilters should return false if filter_field is empty', () => {
    expect(component.hasActiveFilters()).toEqual(false);
  });

  it('hasActiveFilters should return true if filter_field has data', () => {
    component.filter_field = {
      standard: ['FAANG']
    };
    expect(component.hasActiveFilters()).toEqual(true);
  });

  it('resetFilter should reset all filters in filter_field', () => {
    component.filter_field = {
      standard: ['FAANG']
    };
    component.resetFilter();
    expect(component.filter_field).toEqual({});
  });

  it('selectColumn should assign right value for sort_field', () => {
    component.selectedColumn = 'Analysis accession';
    component.selectColumn();
    expect(component.sort_field['id']).toEqual('accession');

    component.selectedColumn = 'Title';
    component.selectColumn();
    expect(component.sort_field['id']).toEqual('title');

    component.selectedColumn = 'Species';
    component.selectColumn();
    expect(component.sort_field['id']).toEqual('species');

    component.selectedColumn = 'Dataset';
    component.selectColumn();
    expect(component.sort_field['id']).toEqual('datasetAccession');

    component.selectedColumn = 'Assay type';
    component.selectColumn();
    expect(component.sort_field['id']).toEqual('assayType');

    component.selectedColumn = 'Analysis type';
    component.selectColumn();
    expect(component.sort_field['id']).toEqual('analysisType');
  });

  it('chooseClass should assign right values for spanClass and sort_field', () => {
    component.selectedColumn = 'File name';
    component.chooseClass('glyphicon glyphicon-arrow-down');
    expect(component.spanClass).toEqual('glyphicon glyphicon-arrow-up');
    expect(component.sort_field['direction']).toEqual('asc');

    component.chooseClass('glyphicon glyphicon-arrow-up');
    expect(component.spanClass).toEqual('glyphicon glyphicon-arrow-down');
    expect(component.sort_field['direction']).toEqual('desc');

    component.selectedColumn = 'Study';
    component.chooseClass('glyphicon glyphicon-sort');
    expect(component.spanClass).toEqual('glyphicon glyphicon-arrow-down');
    expect(component.sort_field['direction']).toEqual('desc');

    component.chooseClass('glyphicon glyphicon-arrow-down');
    expect(component.spanClass).toEqual('glyphicon glyphicon-arrow-up');
    expect(component.sort_field['direction']).toEqual('asc');

    component.chooseClass('glyphicon glyphicon-arrow-up');
    expect(component.spanClass).toEqual('glyphicon glyphicon-arrow-down');
    expect(component.sort_field['direction']).toEqual('desc');
  });
});
