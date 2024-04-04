import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export function AutoUnsubscribe() {
  return function (constructor: any) {
    const originalNgOnDestroy = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = function () {
      for (const prop in this) {
        if (Object.prototype.hasOwnProperty.call(this, prop)) {
          const property = this[prop];
          if (property && typeof property.unsubscribe === 'function') {
            property.unsubscribe();
          }
        }
      }
      originalNgOnDestroy?.apply(this, arguments);
    };
  };
}
