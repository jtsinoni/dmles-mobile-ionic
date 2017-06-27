import { TestBed, async } from '@angular/core/testing';
import { ElasticQueryModel } from "../../app/models/search/elastic-query.model";
// todo finish: currently karma plugin broken as well as chrome  06/17
describe('ElasticQueryModel', () => {

  let elasticQueryModel: ElasticQueryModel = null;  

   beforeEach(async(() => {
        TestBed.configureTestingModule({
        })
      }));

      it('ElasticQueryModel should be defined', () => {
          elasticQueryModel = new ElasticQueryModel("searchTerm");
          expect(elasticQueryModel).toBeDefined();
         // expect(elasticQueryModel.g

      });


});
