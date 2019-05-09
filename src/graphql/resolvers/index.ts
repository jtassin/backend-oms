import { Resolver, Query, Subscription, Mutation, Root, Args, Ctx } from 'type-graphql';
import { Order } from '../../dto/Order';
import { OrderProduct } from '../../dto/OrderProduct';
import { getOrderProducts, addNewProductOrder } from '../../services/orderProduct';
import { AddProductArg } from '../../dto/AddProduct';
import { NEW_ORDERPRODUCT } from "../../pubsub";
import { Context } from '../../context';
// import { Context } from "../../context";

@Resolver(Order)
export class OrderResolvers {

  @Query(_returns => [OrderProduct])
  async listOrderProducts(@Ctx() ctx: Context) {
    return getOrderProducts()
  }

  @Mutation(_returns => OrderProduct)
  async addOrderProduct(@Args() { articleId, orderId }: AddProductArg, @Ctx() ctx: Context) {
    const res = await addNewProductOrder(articleId, orderId)
    return res.orderProduct;
  }

  @Subscription({
    topics: NEW_ORDERPRODUCT,
  })
  newOrderProduct(@Root() orderProduct: OrderProduct, @Ctx() ctx: Context): OrderProduct {
    console.log('ctx sub', ctx)
    console.log('newOrderProduct', orderProduct)
    // TODO add filter here
    return orderProduct
  }
}