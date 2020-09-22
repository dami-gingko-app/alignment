import {Injectable} from '@angular/core';
import {Match} from "../match";
import {matchResults} from "../matchResults";
import {HttpClient} from '@angular/common/http';

/**
 * Service to make REST queries to backend
 */
@Injectable({
    providedIn: 'root'
})
export class AlignmentService {
    allMatches: any;
    alignUrl = 'http://localhost:8080/alignAsync';
    matchesUrl = 'http://localhost:8080/allMatches';
    clearUrl = 'http://localhost:8080/clearMatches';
    response: [];

    constructor(private http: HttpClient) {
    }

    /**
     * Clears all query matches from backend, and reloads
     */
    clearMatches() {
        // REST call
        this.http.get<any>(this.clearUrl).subscribe(response => {
            // Reload after queries are cleared
            this.getAllMatches();
        });
    }

    /**
     *  Get all current query matches from backend
     */
    getAllMatches() {
        // Clear current matchResults
        while (matchResults.length > 0) {
            matchResults.pop();
        }
        this.http.get<Match[]>(this.matchesUrl)
            .subscribe(response => {
                console.log("response " + response);
                response.forEach(data => {
                    let cur = this.createMatchObject(data);
                    matchResults.push(cur);
                })
            });
    }

    /**
     * Submit query sequence for matching
     * @param seq The sequence to be submitted
     */
    submitSequence(seq) {
        let seqObj = {sequence: seq};
        let headers = {'Access-Control-Allow-Origin': '*'}

        // POST call
        this.http
            .post(this.alignUrl, seqObj, {'headers': headers})
            .subscribe(data => {
                let result = this.createMatchObject(data);
                matchResults.push(result);
            });
    }

    /**
     * Create Match object from data
     * @param data Data containing Match information
     */
    createMatchObject(data) {
        let cur = new Match();
        if (data !== null) {
            cur.position = data.position;
            cur.proteinId = data.proteinId;
            cur.query = (data.query);
            cur.assembly = data.assembly;
        }
        return cur;
    }
}
