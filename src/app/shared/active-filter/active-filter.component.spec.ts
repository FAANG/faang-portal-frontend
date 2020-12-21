import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActiveFilterComponent } from './active-filter.component';
import {AggregationService} from '../../services/aggregation.service';

describe('ActiveFilterComponent', () => {
  let component: ActiveFilterComponent;
  let fixture: ComponentFixture<ActiveFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveFilterComponent ],
      providers: [AggregationService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('clearFilter should emit new data', inject([AggregationService], (service: AggregationService) => {
    service.field.subscribe(data => {
      expect(data['standard']).toEqual([]);
    });
    component.clearFilter('FAANG');
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
