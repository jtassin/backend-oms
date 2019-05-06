import { Resolver, Query, Subscription, Mutation, Root, Args } from 'type-graphql';
import { Order } from '../../dto/Order';
import { OrderProduct } from '../../dto/OrderProduct';
import { getOrderProducts, addNewProductOrder } from '../../services/orderProduct';
import { AddProductArg } from '../../dto/AddProduct';
import { NEW_ORDERPRODUCT } from "../../pubsub";

@Resolver(Order)
export class OrderResolvers {

  @Query(_returns => [OrderProduct])
  async listOrderProducts() {
    return getOrderProducts()
  }

  @Mutation(_returns => OrderProduct)
  async addOrderProduct(@Args() { articleId, orderId }: AddProductArg) {
    const res = await addNewProductOrder(articleId, orderId)
    return res.orderProduct;
  }

  @Subscription({
    topics: NEW_ORDERPRODUCT,
  })
  newOrderProduct(@Root() orderProduct: OrderProduct): OrderProduct {
    console.log('newOrderProduct', orderProduct)
    // TODO add filter here
    return orderProduct
  }
}