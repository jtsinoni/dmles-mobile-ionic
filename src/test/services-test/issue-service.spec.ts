import { TestBed, getTestBed, async, inject } from '@angular/core/testing';
import { IssueService } from '../../app/services/supply/issue-service';
import {
     BaseRequestOptions,
     HttpModule, Http, XHRBackend 
} from '@angular/http';
import { MockConnection, MockBackend } from '@angular/http/testing';
//import { IssueModel } from '../../app/models/issue.model';
import 'rxjs/add/operator/toPromise';

let issueService: IssueService = null;

describe('IssueService', () => {

    let mockBackend: MockBackend;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [IssueService, MockBackend, BaseRequestOptions,
                {
                    provide: Http,
                    deps: [MockBackend, BaseRequestOptions],
                    useFactory: (mockBackend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(mockBackend, defaultOptions);
                    }
                }
            ],
            imports: [HttpModule]

        });
        mockBackend = getTestBed().get(MockBackend);
    }));

    it('Issue Service should be defined', () => {
        issueService = getTestBed().get(IssueService);
        expect(issueService).not.toBeNull();
    });

    // it('Issue Service getAllIssues - the promise is defined', () => {
    //     let issues: Promise<Array<IssueModel>> = issueService.getAllIssues();
    //     expect(issues).toBeDefined();
    // });

    it('should fetch a single issue by id',
        async(inject([IssueService], (issueService) => {
            mockBackend.connections.subscribe(
                (connection: MockConnection) => {

                    expect(connection.request.url).toMatch('supply/issues');
                    // connection.mockRespond(
                    //     new Response(
                    //         new ResponseOptions({
                    //             body: {
                    //                 id: 'W560JL6062J011'
                    //             }
                    //         }))
                    // );
                });
            // let model:IssueModel = issueService.getIssue('W560JL6062J011').toPromise()
            // .then(response => response.json().data as IssueModel);
            // expect(model).toBeDefined();
            
            // // .subscribe(
            // //     (data) => {
            // //         expect(data).toBeDefined();   
            // //         console.log('data: ' + data.data);
            // //         // expect(data.id).toBe('W560JL6062J011');
            // //         // expect(data.itemId).toEqual('00 2500 1');
            // //     });
        })));


});