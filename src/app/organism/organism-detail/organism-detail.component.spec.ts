import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismDetailComponent } from './organism-detail.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';
import {OrganismSpecimenComponent} from '../organism-specimen/organism-specimen.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('OrganismDetailComponent', () => {
  let component: OrganismDetailComponent;
  let fixture: ComponentFixture<OrganismDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OrganismDetailComponent,
        HeaderComponent,
        RobustLinkComponent,
        OrganismSpecimenComponent
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
    fixture = TestBed.createComponent(OrganismDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
