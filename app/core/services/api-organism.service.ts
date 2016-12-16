import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Organism } from '../../shared/organism';
import { OrganismList } from '../../shared/organism-list';
import { ApiTimeoutService } from './api-timeout.service';

@Injectable()
export class ApiOrganismService {

  constructor(
    private http: Http,
    private apiTimeoutService: ApiTimeoutService,
  ) {}

  // public methods

  get(biosampleId: string): Observable<Organism>{
    return this.apiTimeoutService.handleTimeout<Organism>(
      this.http
         .get(`http://ves-hx-e4:9200/faang/organism/${biosampleId}`)
         .map((r: Response) => r.json()._source as Organism)
    );
  }

  getAll(): Observable<OrganismList>{
    return this.apiTimeoutService.handleTimeout<OrganismList>(
      this.http
         .get(`http://ves-hx-e4:9200/faang/organism/_search?q=*:*`)
         .map((r: Response) => r.json().hits as OrganismList)
    );
  }
}
