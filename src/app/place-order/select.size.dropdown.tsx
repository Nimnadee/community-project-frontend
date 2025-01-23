import { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Key } from "react";

export default function SelectSizeDropDown() {
    const [selectedSize, setSelectedSize] = useState("Select Size");

    const handleSelect = (key: Key) => {
        setSelectedSize(key.toString());
    };

    return (
        <>
            <div>
            <div>
            <Dropdown>
            <DropdownTrigger className={"mt-5"}>
                <Button  className="dropdown-button" variant="bordered">{selectedSize}</Button>
            </DropdownTrigger>
            <DropdownMenu className={"mt-0 w-full"} aria-label="Action event example" onAction={handleSelect}>
                <DropdownItem key="Large">Large</DropdownItem>
                <DropdownItem key="Medium">Medium</DropdownItem>
                <DropdownItem key="Small">Small</DropdownItem>
            </DropdownMenu>
        </Dropdown>
            </div>
            <div>
                <Button className="dropdown-button" color="success">Add</Button>
            </div>
            </div>

        </>


    );
}