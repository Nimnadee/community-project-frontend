

export interface Inventory {
    id: string;
    item: string;
    quantity: number;
    cost:number;
    date:Date;
}


// src/service/inventory.tsx
export async function getAllinventory(): Promise<Inventory[]> {
    const url: string = "http://localhost:5000/Inventories";
    try {
        const response: Response = await fetch(url, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const inventorys: Inventory[] = await response.json();
        return inventorys;
    } catch (error) {
        console.error("Failed to fetch inventorys:", error);
        return [];
    }
}
 
export async function findByID(id: string): Promise<Inventory> {
    const url: string = "http://localhost:5000/Inventories/" + id;
    const response: Response = await fetch(url,{ cache: "no-store" });
    const inventory: Inventory = await response.json();

    return inventory;
}

export async function saveinventory(inventoryRequest: Inventory): Promise<Inventory> {
    const url: string = "http://localhost:5000/Inventories";
    const request = new Request(url, {
        body: JSON.stringify(inventoryRequest),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        method: "POST",
        cache: "no-store",
    });
    const response: Response = await fetch(request);
    const inventory: Inventory = await response.json();

    return inventory;
}

export async function updateinventory(inventoryRequest: Inventory): Promise<Inventory> {
    const url: string = "http://localhost:5000/Inventories/" + inventoryRequest.id;
    const dto = {
        item: inventoryRequest.item,
        quantity:  inventoryRequest.quantity,
        cost:inventoryRequest.cost,
        date:inventoryRequest.date
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
    const inventory:Inventory = await response.json();

    return inventory;
}

export async function deleteinventory(id: string): Promise<Inventory> {
    const url: string = "http://localhost:5000/Inventories/" + id;
    const request = new Request(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        method: "DELETE",
        cache: "no-store",
    });
    const response: Response = await fetch(request);
    const inventory: Inventory = await response.json();

    return inventory;
}
 


