"use client";

import { useEffect, useState } from "react";
import { getPortfolio } from "@/types/Addstock";
import ResultDisplay from "@/components/ResultDisplay";

type StockData = {
    symbol: string;
    price: string;
    volume: string;
    change: string;
    changePercent: string;
    lastTradingDay: string;
};

export default function ResultsPage() {
    const [portfolio, setPortfolio] = useState<StockData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadPortfolio();
    }, []);

    const loadPortfolio = async () => {
        try {
            const data = await getPortfolio();
            setPortfolio(data);
        } catch (error) {
            console.error("Error loading portfolio:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-[#F5E9E5] to-[#452829] flex items-center justify-center">
                <p className="text-white text-xl">Loading...</p>
            </div>
        );
    }

    return <ResultDisplay portfolio={portfolio} />;
}