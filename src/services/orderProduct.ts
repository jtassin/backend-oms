import { OrderProduct } from "../dto/OrderProduct";
import { OrderEventModel, OrderEvent } from "../dao/OrderEvent";
import { NEW_ORDERPRODUCT, pubsub } from "../pubsub";

export async function getOrderProducts(orderId?: string, articleId?: string): Promise<OrderProduct[]> {
    const where = {
        orderId: orderId,
        articleId: articleId,
    }
    if (!where.orderId) {
        delete where.orderId;
    }
    if (!where.articleId) {
        delete where.articleId;
    }
    const events = await OrderEventModel.find(where).sort({ createdAt: -1 }).limit(10);
    const products = new Map<string, OrderProduct>()
    events.forEach((event) => {
        if (event.type === 'newProductOrder') {
            const id = event.orderId + '-' + event.articleId;
            products.set(event.orderId, {
                id,
                state: 'toPrepare',
                articleId: event.articleId,
            })
        }
    })
    return Array.from(products.values());
}

export async function addNewProductOrder(articleId: string, orderId: string): Promise<{ orderProduct: OrderProduct, event: OrderEvent }> {
    const event = new OrderEventModel({
        userId: 'me',
        articleId, orderId, type: 'newProductOrder', state: 'toPrepare'
    })
    await event.save();
    const results = await getOrderProducts(orderId, articleId)
    const orderProduct = results[0];
    await pubsub.publish(NEW_ORDERPRODUCT, orderProduct)

    return { orderProduct, event }
}