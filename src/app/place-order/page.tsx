"use client";
import React, { useEffect, useState } from "react";
import { getAllProducts, Product } from "@/service/product";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import "./place.order.css";
import NavbarComponent from "./nav.bar";
import SelectSizeDropDown from "@/app/place-order/select.size.dropdown";
import PermanentDrawerRight from "@/app/place-order/my.basket";

export default function PlaceOrderPage() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            const productList = await getAllProducts();
            setProducts(productList);
        }
        fetchProducts();
    }, []);

    const defaultImage = "https://images.getrecipekit.com/20220904015448-veg-20fried-20rice.png?aspect_ratio=16:9&quality=90&"; // Temporary image URL

    return (
        <div >
            <PermanentDrawerRight />
            <div className="main-content">
                <NavbarComponent />
                <div className="grid-container">
                    {products.length === 0 ? (
                        <p>No any products</p>
                    ) : (
                        products.map((product) => (
                            <Card key={product.id} className="card">
                                <CardHeader className="card-header">
                                    <h4>{product.name}</h4>
                                </CardHeader>
                                <CardBody className="card-body">
                                    <Image
                                        alt={product.name}
                                        className="card-image"
                                        src={product.productImage || defaultImage}
                                        width={270}
                                    />
                                    <h6>Price: {product.price}.00</h6>
                                    <SelectSizeDropDown/>
                                </CardBody>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}