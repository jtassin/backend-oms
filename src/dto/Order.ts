import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class Order {
    @Field(_type => ID)
    id: string;
    @Field(_type => String)
    state: 'prepared' | 'preparing' | 'toPrepare';
}
