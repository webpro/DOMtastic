/**
 * @module BaseClass
 */

import { $ as selector, Wrapper } from './selector/index';
import { extend } from './util';

export default function(api) {
    class Base {
        constructor() {
            Wrapper.call(this, selector(...arguments));
        }
    }
    extend(Base.prototype, api);
    return Base;
}
