import { Node } from './node';

export interface IGetNodeReference {
    (value: any): Node | null;
}
