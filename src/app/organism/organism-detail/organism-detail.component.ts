import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ApiFileService} from '../../services/api-file.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-organism-detail',
  templateUrl: './organism-detail.component.html',
  styleUrls: ['./organism-detail.component.css']
})
export class OrganismDetailComponent implements OnInit {
  biosampleId: string;
  organism: any;
  error: any;

  constructor(private route: ActivatedRoute,
              private apiFileService: ApiFileService,
              private spinner: NgxSpinnerService,
              private titleService: Title) { }

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.biosampleId = params['id'];
      this.titleService.setTitle(`${this.biosampleId} | FAANG organism`);
    });
    this.apiFileService.getOrganism(this.biosampleId).subscribe(
      (data: any) => {
        this.organism = data['_source'];
        if (this.organism) {
          this.spinner.hide();
        }
      },
      error => {
        this.error = error;
        this.spinner.hide();
      }
    );
  }

  dealWithAvailability(input: string): string {
    if (input.substr(0,6) === 'mailto') {
      return input.substr(7);
    } else{
      return input;
    }
  }

}