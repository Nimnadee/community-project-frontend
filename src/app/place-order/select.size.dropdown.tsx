import { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Key } from "react";
import { Product } from "@/service/product";
import { useMultiStepContext } from "@/app/context.provider";

interface SelectSizeDropDownProps {
    product: Product;
}

export default function SelectSizeDropDown({ product }: SelectSizeDropDownProps) {
    const [selectedSize, setSelectedSize] = useState("Select Size");
    const [sizeError, setSizeError] = useState(false);
    const { newOrder, setNewOrder } = useMultiStepContext();

    const handleSelect = (key: Key) => {
        setSelectedSize(key.toString());
        product.size = key.toString();
        setSizeError(false);
    };

    const handleAddProduct = () => {
        if (selectedSize === "Select Size") {
            setSizeError(true);
            return;
        }

        const existingProductIndex = newOrder.products.findIndex((p: Product) => p.id === product.id);
        let updatedProducts = [...newOrder.products];
        let updatedProductCounts = [...newOrder.productCounts];

        if (existingProductIndex !== -1) {
            updatedProductCounts[existingProductIndex] += 1;
        } else {
            updatedProducts.push(product);
            updatedProductCounts.push(1);
        }

        const updatedOrder = {
            ...newOrder,
            products: updatedProducts,
            productCounts: updatedProductCounts,
        };

        setNewOrder(updatedOrder);
        console.log(updatedOrder);
    };

    return (
        <>
            <div>
                <div>
                    <Dropdown>
                        <DropdownTrigger className={"mt-5"}>
                            <Button className="dropdown-button" variant="bordered">{selectedSize}</Button>
                        </DropdownTrigger>
                        <DropdownMenu className={"mt-0 w-full"} aria-label="Action event example" onAction={handleSelect}>
                            <DropdownItem key="Large">Large</DropdownItem>
                            <DropdownItem key="Medium">Medium</DropdownItem>
                            <DropdownItem key="Small">Small</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                {sizeError && <div className={"error-msg"}>Please select a size</div>}
                <div>
                    <Button className="dropdown-button" color="success" onClick={handleAddProduct}>Add</Button>
                </div>

            </div>
        </>
    );
}