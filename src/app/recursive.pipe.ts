import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recursive'
})
export class RecursivePipe implements PipeTransform {

  private searchedItems: Array<any> = [];
  private key: string;
  private prop: string;
  private childrenPropName: string;

  transform(value: any, key?: any, prop?: any, childrenProp?: any): any {
    // tslint:disable-next-line:triple-equals
    if ( key != undefined) {
      this.searchedItems = [];
      this.key = key.toLowerCase();
      this.prop = prop;
      this.childrenPropName = childrenProp;
      const searchResult = this.searchRecursive(value);
      return searchResult;
    }
    return value;
  }

  searchRecursive(value) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < value.length; i++) {
      const lowerCaseName = value[i][this.prop].toLowerCase();
      if (lowerCaseName.includes(this.key)) {
        this.searchedItems.push(value[i]);
      } else if (value[i][this.childrenPropName]) {
        if (value[i][this.childrenPropName].length > 0) {
          this.searchRecursive(value[i][this.childrenPropName]);
        }
      }
    }

    return this.searchedItems;
  }

}
