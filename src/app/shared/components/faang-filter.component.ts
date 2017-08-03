import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from'@angular/router';
@Component({
    selector: 'faang-filter',
    templateUrl: './faang-filter.component.html',
    styles: [`
      li.list-group-item.title {
        cursor: default;
      }
      ul.long-list {
        max-height: 300px;
        overflow: scroll;
      }
      ul.list-group {
        margin-top: 0px
      }
      span.badge {
        margin-left: 3px
      }
    `],
})
export class FaangFilterComponent{
  @Input() title: string;
  @Input() routekey: string;
  @Input() aggs: {key: string, doc_count: number}[];
  @Input() isFiltered: {[key: string] : boolean};
  @Input() filterSize: number;

  itemLimit: number
  isCollapsed: boolean = true

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){ };
  ngOnInit() {
    //cannot assign value while declaring because the assignment is after the initialization, which causes the problem when loading the page no items available in the filter
    //caused by <button class="list-group-item" type="button" [ngClass]="{'active': isFiltered && isFiltered[field?.key]}" (click)="toggleFilter(field?.key)" *ngIf="i<itemLimit">  as itemLimit has no value
    this.itemLimit = this.filterSize
  }

  toggleFilter(key: string){
    this.isFiltered[key] = !this.isFiltered[key];
    let oldParams = this.activatedRoute.snapshot.queryParams;
    let newParams = {}
    for (let filter in oldParams){
      newParams[filter] = oldParams[filter]
    }
    let empty = true
    let filters: string[] = [];
    newParams[this.routekey] = []
    for (let filter in this.isFiltered){
      if (this.isFiltered[filter]){
        filters.push(filter)
        empty = false
      }
    }
    newParams[this.routekey] = filters.join("|")
    if (empty){
      delete newParams[this.routekey]
    }
    this.router.navigate([], {relativeTo:this.activatedRoute, queryParams: newParams})
  }
  toggleCollapse(){
    if (this.isCollapsed){
      this.itemLimit = 10000
      this.isCollapsed = false
    }else{
      this.itemLimit = this.filterSize
      this.isCollapsed = true
    }
  }
}
