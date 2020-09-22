import { Component } from '@angular/core';
import { matchResults } from '../matchResults';
import { AlignmentService} from "../alignment-service/alignment.service";

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent {
    curResults = matchResults;

    constructor(
        private alignService: AlignmentService) {
    }

    clearResults() {
        this.alignService.clearMatches();
    }
}

