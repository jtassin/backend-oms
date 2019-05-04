import { Resolver, Query, Subscription, Mutation, Root, Args, PubSub } from 'type-graphql';
import { PubSubEngine } from "graphql-subscriptions";
import { Order } from '../../dto/Order';
import { OrderProduct } from '../../dto/OrderProduct';
import { getOrderProducts, addNewProductOrder } from '../../services/orderProduct';
import { AddProductArg } from '../../dto/AddProduct';
import { NEW_EVENT } from "../../pubsub";

@Resolver(Order)
export class OrderResolvers {

  @Query(_returns => [OrderProduct])
  async listOrderProducts() {
    return getOrderProducts()
  }

  @Mutation(_returns => OrderProduct)
  async addOrderProduct(@Args() { articleId, orderId }: AddProductArg, @PubSub() pubSub: PubSubEngine) {
    const res = await addNewProductOrder(articleId, orderId)
    await pubSub.publish(NEW_EVENT, res.orderProduct);
    return res.orderProduct;
  }

  @Subscription({
    topics: NEW_EVENT,
    // _returns => OrderProduct
  })
  newOrderProduct(@Root() orderProduct: OrderProduct): OrderProduct {
    console.log('newOrderProduct', orderProduct)
    // TODO add filter here
    return orderProduct
  }
}