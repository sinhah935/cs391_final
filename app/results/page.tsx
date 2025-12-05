"use client";
//Annika Manjunath U05916630
import { useEffect, useState } from "react";
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
        // Load portfolio from localStorage
        const saved = localStorage.getItem("portfolioStocks");
        if (saved) {
            try {
                const stocks = JSON.parse(saved);
                setPortfolio(stocks);
            } catch (error) {
                console.error("Failed to load portfolio:", error);
                setPortfolio([]);
            }
        } else {
            setPortfolio([]);
        }
        setIsLoading(false);
    }, []);

    // is this necessary to include?
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-[#F5E9E5] to-[#452829] flex items-center justify-center">
                <p className="text-white text-xl">Loading...</p>
            </div>
        );
    }

    return <ResultDisplay portfolio={portfolio} />;
}