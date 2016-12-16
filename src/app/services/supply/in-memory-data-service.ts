import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let notifications = [
      { id: 1, message: 'You have 1 pending inventory', title: 'Inventory', noticeType: 1 },
      { id: 2, message: 'You have 4 active due ins', title: 'Active Due Ins', noticeType: 1 },
      { id: 3, message: 'You have 3 orders pending submission', title: 'Working Orders', noticeType: 1 }
    ];

    let supplyItems = [
      { id: '662500T387223', itemId: '662500T387223', itemDescription: 'Glove Small', onHandBalance: 10, unitOfPurchasePrice: 12.25, imageUrl: 'assets/images/glove.png', isStocked: true  },
      { id: '19521456', itemId: '19521456', itemDescription: 'Bandage', onHandBalance: 12, unitOfPurchasePrice: 8.25, imageUrl: 'assets/images/bandage.png', isStocked: true  },
      { id: '00 2500 1', itemId: '00 2500 1', itemDescription: 'Light Bulb', onHandBalance: 7, unitOfPurchasePrice: 480.00, imageUrl: 'assets/images/lightbulb.png', isStocked: true  },
      { id: '962101', itemId: '19521456', itemDescription: 'Chemo Mats', onHandBalance: 5, unitOfPurchasePrice: 48.71, imageUrl: 'assets/images/chemoMat.png', isStocked: true },
      { id: '00 876 980 01', itemId: '00 876 980 01', itemDescription: 'Scalpel', onHandBalance: 0, unitOfPurchasePrice: 173.71, imageUrl: 'assets/images/scalpel.png', isStocked: false },
      { id: '165816', itemId: '165816', itemDescription: 'Catheter Foley', onHandBalance: 0, unitOfPurchasePrice: 73.11, imageUrl: 'assets/images/catheterFoley.png', isStocked: false }

    ];

    let orders = [
      { id: 'W560JL6025J001', documentNumber: 'W560JL6025J001', itemId: '662500T387223', requiredDate: new Date().toJSON(), orderState: 1, orderQuantity: 10, requestor: 'Billy', unitOfPurchasePrice: 12.25 },
      { id: 'W560JL6060J001', documentNumber: 'W560JL6060J001', itemId: '00 2500 1', requiredDate: new Date().toJSON(), orderState: 1, orderQuantity: 12, requestor: 'Ted', unitOfPurchasePrice: 352.12 },
      { id: 'W560JL6060J003', documentNumber: 'W560JL6060J003', itemId: '00 876 980 01', requiredDate: new Date().toJSON(), orderState: 1, orderQuantity: 2, requestor: 'Fred', unitOfPurchasePrice: 12.58 },
      { id: 'W560JL6060J005', documentNumber: 'W560JL6060J005', itemId: '165816', requiredDate: new Date().toJSON(), orderState: 1, orderQuantity: 85, requestor: 'Sally', unitOfPurchasePrice: 10.17 }
    ];

    let issues = [
      { id: 'W560JL6062J011', documentNumber: 'W560JL6062J011', itemId: '00 2500 1', issueDate: new Date().toJSON(), issueState: 1, quantityIssued: 6, requestor: 'Billy' },
      { id: 'W560JL6060J012', documentNumber: 'W560JL6060J012', itemId: '00 876 980 01', issueDate: new Date().toJSON(), issueState: 1, quantityIssued: 2, requestor: 'Ted' }

    ];
    return { notifications, supplyItems, orders, issues };
  }
}