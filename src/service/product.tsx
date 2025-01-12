

export interface Product {
    id: string;
    name: string;
    category: string;
    size:string;
    price: number;
    productImage: string;

}


// src/service/product.tsx
export async function getAllProducts(): Promise<Product[]> {
    const url: string = "http://localhost:5000/products";
    try {
        const response: Response = await fetch(url, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products: Product[] = await response.json();
        return products;
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
}
// export async function getAllSpecificproduct(studentId: string): Promise<product> {
//     const url: string = `http://localhost:5000/products/${studentId}` ;
//     const response = await fetch(url,{ cache: "no-store" });
//     const product: product = await response.json();
//
//     if (!response.ok) {
//         throw new Error(`Failed to fetch product for student ID ${studentId}: ${response.statusText}`);
//     }
//
//     return product;
// }
export async function findByID(id: string): Promise<Product> {
    const url: string = "http://localhost:5000/products/" + id;
    const response: Response = await fetch(url,{ cache: "no-store" });
    const product: Product = await response.json();

    return product;
}

export async function saveProduct(productRequest: Product): Promise<Product> {
    const url: string = "http://localhost:5000/products";
    const request = new Request(url, {
        body: JSON.stringify(productRequest),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        method: "POST",
        cache: "no-store",
    });
    const response: Response = await fetch(request);
    const product: Product = await response.json();

    return product;
}

export async function updateProduct(productRequest: Product): Promise<Product> {
    const url: string = "http://localhost:5000/products/" + productRequest.id;
    const dto = {
        name: productRequest.name,
        category: productRequest.category,
        size: productRequest.size,
        price: productRequest.price,
        productImage: productRequest.productImage,
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
    const product: Product = await response.json();

    return product;
}

export async function deleteProduct(id: string): Promise<Product> {
    const url: string = "http://localhost:5000/products/" + id;
    const request = new Request(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        method: "DELETE",
        cache: "no-store",
    });
    const response: Response = await fetch(request);
    const product: Product = await response.json();

    return product;
}
//
// export async function findByStudentId(studentId:string): Promise<Product[]> {
//     const url: string = "http://localhost:5000/products/"+studentId;
//     const response: Response = await fetch(url, { cache: "no-store" });
//     console.log("existing products for student, "+studentId+ ":  \n"+response);
//
//     const products: Product[] = await response.json();
//
//     // console.log ("response(service)",productRequests);
//
//     return products;
// }



