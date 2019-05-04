import { ObjectType, Field, ID } from 'type-graphql';
import { Order } from './Order';

@ObjectType()
export class OrderProduct {
    @Field(_type => ID)
    id: string;
    @Field(_type => String)
    state: 'prepared' | 'preparing'| 'toPrepare';
    @Field(_type => Order)
    order?: Order;
    @Field(_type => String)
    articleId: string;
}
