import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FileDetailComponent } from './file-detail.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RelatedItemsComponent} from '../../shared/related-items/related-items.component';
import {NgxPaginationModule} from 'ngx-pagination';

describe('FileDetailComponent', () => {
  let component: FileDetailComponent;
  let fixture: ComponentFixture<FileDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FileDetailComponent,
        HeaderComponent,
        RobustLinkComponent,
        RelatedItemsComponent,
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgxPaginationModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('checkIsObject should return true if input is object', () => {
    expect(component.checkIsObject({})).toEqual(true);
  });

  it('checkIsObject should return false if input is not object', () => {
    expect(component.checkIsObject('')).toEqual(false);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
