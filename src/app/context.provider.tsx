"use client";
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Order } from "@/service/order";

interface ContextProps {
    newOrder: Order;
    setNewOrder: React.Dispatch<React.SetStateAction<any>>;
}

export const MultiStepContext = createContext<ContextProps | undefined>(undefined);

export default function StepContextProvider({ children }: { children: ReactNode }) {
    const [newOrder, setNewOrder] = useState<any>({
        products: [],
        productCounts: []
    });

    return (
        <MultiStepContext.Provider
            value={{
                newOrder,
                setNewOrder,
            }}
        >
            {children}
        </MultiStepContext.Provider>
    );
}

export function useMultiStepContext() {
    const context = useContext(MultiStepContext);
    if (!context) {
        throw new Error("useMultiStepContext must be used within a StepContextProvider");
    }
    return context;
}