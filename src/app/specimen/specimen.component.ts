import {Component, OnDestroy, OnInit} from '@angular/core';
import {SortParams, SpecimenTable} from '../shared/interfaces';
import {Observable, Subscription} from 'rxjs';
import {ApiDataService} from '../services/api-data.service';
import {AggregationService} from '../services/aggregation.service';
import {ExportService} from '../services/export.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-specimen',
  templateUrl: './specimen.component.html',
  styleUrls: ['./specimen.component.css']
})
export class SpecimenComponent implements OnInit, OnDestroy {
  specimenListShort: Observable<SpecimenTable[]>;
  specimenListLong: Observable<SpecimenTable[]>;
  columnNames: string[] = ['BioSample ID', 'Material', 'Organism part/Cell type', 'Sex', 'Organism', 'Breed', 'Standard',
    'Paper published'];
  spanClass = 'expand_more';
  defaultClass = 'unfold_more';
  selectedColumn = 'BioSample ID';
  sort_field: SortParams;
  filter_field: {};
  aggrSubscription: Subscription;
  exportSubscription: Subscription;
  specimenListLongSubscription: Subscription;
  downloadData = false;

  optionsCsv;
  optionsTabular;
  data = {};

  // Local variable for pagination
  p = 1;

  private query = {
    'sort': 'id_number:desc',
    '_source': [
      'biosampleId',
      'material.text',
      'cellType.text',
      'organism.sex.text',
      'organism.organism.text',
      'organism.breed.text',
      'standardMet',
      'id_number',
      'paperPublished'],
  };
  error: string;

  constructor(private dataService: ApiDataService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private aggregationService: AggregationService,
              private exportService: ExportService,
              private spinner: NgxSpinnerService,
              private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG specimens');
    this.spinner.show();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.resetFilter();
      const filters = {};
      for (const key in params) {
        if (Array.isArray(params[key])) {
          filters[key] = params[key];
          for (const value of params[key]) {
            this.aggregationService.current_active_filters.push(value);
            this.aggregationService.active_filters[key].push(value);
          }
        } else {
          filters[key] = [params[key]];
          this.aggregationService.current_active_filters.push(params[key]);
          this.aggregationService.active_filters[key].push(params[key]);
        }
      }
      this.aggregationService.field.next(this.aggregationService.active_filters);
      this.filter_field = filters;
    });
    this.optionsCsv = this.exportService.optionsCsv;
    this.optionsTabular = this.exportService.optionsTabular;
    this.optionsCsv['headers'] = this.columnNames;
    this.optionsTabular['headers'] = this.optionsTabular;
    this.sort_field = {id: 'idNumber', direction: 'desc'};
    this.dataService.getAllSpecimens(this.query, 30).subscribe(
      data => {
        this.specimenListShort = data;
        if (this.specimenListShort) {
          this.spinner.hide();
        }
      },
      error => {
        this.error = error;
        this.spinner.hide();
      }
    );
    this.specimenListLong = this.dataService.getAllSpecimens(this.query, 100000);
    this.specimenListLongSubscription = this.specimenListLong.subscribe((data) => {
      this.aggregationService.getAggregations(data, 'specimen');
    });
    this.aggrSubscription = this.aggregationService.field.subscribe((data) => {
      const params = {};
      for (const key of Object.keys(data)) {
        if (data[key].length !== 0) {
          params[key] = data[key];
        }
      }
      this.router.navigate(['specimen'], {queryParams: params});
    });
    this.exportSubscription = this.exportService.data.subscribe((data) => {
      this.data = data;
    });
  }

  onTableClick(event: any) {
    let event_class;
    if (event['srcElement']['firstElementChild']) {
      event_class = event['srcElement']['firstElementChild']['innerText'];
    } else {
      event_class = event['srcElement']['innerText'];
    }
    this.selectedColumn = event['srcElement']['id'];
    this.selectColumn();
    this.chooseClass(event_class);
  }

  chooseClass(event_class: string) {
    if (this.selectedColumn === 'BioSample ID') {
      if (event_class === 'expand_more') {
        this.spanClass = 'expand_less';
        this.sort_field['direction'] = 'asc';
      } else {
        this.spanClass = 'expand_more';
        this.sort_field['direction'] = 'desc';
      }
    } else {
      if (event_class === this.defaultClass) {
        this.spanClass = 'expand_more';
        this.sort_field['direction'] = 'desc';
      } else if (event_class === 'expand_more') {
        this.spanClass = 'expand_less';
        this.sort_field['direction'] = 'asc';
      } else {
        this.spanClass = 'unfold_more';
        this.sort_field['direction'] = 'desc';
        this.sort_field['id'] = 'idNumber';
        this.selectedColumn = 'BioSample ID';
        this.spanClass = 'expand_more';
      }
    }
  }

  selectColumn() {
    switch (this.selectedColumn) {
      case 'BioSample ID': {
        this.sort_field['id'] = 'idNumber';
        break;
      }
      case 'Material': {
        this.sort_field['id'] = 'material';
        break;
      }
      case 'Organism part/Cell type': {
        this.sort_field['id'] = 'organismpart_celltype';
        break;
      }
      case 'Sex': {
        this.sort_field['id'] = 'sex';
        break;
      }
      case 'Organism': {
        this.sort_field['id'] = 'organism';
        break;
      }
      case 'Breed': {
        this.sort_field['id'] = 'breed';
        break;
      }
      case 'Standard': {
        this.sort_field['id'] = 'standard';
        break;
      }
    }
  }

  hasActiveFilters() {
    if (typeof this.filter_field === 'undefined') {
      return false;
    }
    for (const key of Object.keys(this.filter_field)) {
      if (this.filter_field[key].length !== 0) {
        return true;
      }
    }
    return false;
  }

  resetFilter() {
    for (const key of Object.keys(this.aggregationService.active_filters)) {
      this.aggregationService.active_filters[key] = [];
    }
    this.aggregationService.current_active_filters = [];
    this.filter_field = {};
  }

  removeFilter() {
    this.resetFilter();
    this.router.navigate(['specimen'], {queryParams: {}});
  }

  onDownloadData() {
    this.downloadData = !this.downloadData;
  }

  wasPublished(published: any) {
    return published === 'true';
  }

  isGreen(published: any) {
    return published === 'true' ? 'green' : 'default';
  }

  ngOnDestroy() {
    if (typeof  this.filter_field !== 'undefined') {
      this.resetFilter();
    }
    this.aggrSubscription.unsubscribe();
    this.exportSubscription.unsubscribe();
    this.specimenListLongSubscription.unsubscribe();
  }

}
