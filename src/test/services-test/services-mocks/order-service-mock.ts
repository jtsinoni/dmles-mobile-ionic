
export class OrderServiceMock {  

  public getAllOrders(): Promise<Array<{}>> {
      let result: Promise<Array<{}>> = null;
      return new Promise((resolve: Function) => {
          resolve(result);
      });
  }  

}
