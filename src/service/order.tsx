import {Product} from "@/service/product";


export interface Order {
    id: string;
    products: Product[]
    productCounts: number[];
    totalPrice: number;
    date: Date;

}


export async function getAllOrders(): Promise<Order[]> {
    const url: string = "http://localhost:5000/order";
    const response: Response = await fetch(url, { cache: "no-store" });
    const orders: Order[] = await response.json();

    return orders;
}

 
export async function findByID(id: string): Promise<Order> {
    const url: string = "http://localhost:5000/order/" + id;
    const response: Response = await fetch(url,{ cache: "no-store" });
    const order: Order = await response.json();

    return order;
}

export async function saveOrder(orderRequest: Order): Promise<Order> {
    const url: string = "http://localhost:5000/projects";
    const request = new Request(url, {
        body: JSON.stringify(orderRequest),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        method: "POST",
        cache: "no-store",
    });
    const response: Response = await fetch(request);
    const order: Order = await response.json();

    return order;
}

export async function updateOrder(updatedOrder: Order): Promise<Order> {
    const url: string = "http://localhost:5000/order/" + updatedOrder.id;
    const dto = {
        products: updatedOrder.products,
        productCounts: updatedOrder.productCounts,
        totalPrice: updatedOrder.totalPrice,
        date: updatedOrder.date,
    };
    const request = new Request(url, {
        body: JSON.stringify(dto),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        method: "PUT",
        cache: "no-store",
    });
    const response: Response = await fetch(request);
    const order: Order = await response.json();

    return order;
}

export async function deleteOrder(id: string): Promise<Order> {
    const url: string = "http://localhost:5000/order/" + id;
    const request = new Request(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        method: "DELETE",
        cache: "no-store",
    });
    const response: Response = await fetch(request);
    const order: Order = await response.json();

    return order;
}

 



