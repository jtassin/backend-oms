import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class AddProductArg {
  @Field(_type => String)
  articleId: string;

  @Field(_type => String)
  orderId: string;
}