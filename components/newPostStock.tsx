"use client";

import { useState, useTransition } from "react";
import {addStockToPortfolio} from "@/types/Addstock";


type StockData = {
    symbol: string;
    price: string;
    volume: string;
    change: string;
    changePercent: string;
    lastTradingDay: string;
};

type NewPostStockProps = {
    onStockAdded?: (stock: StockData) => void;
};

export default function NewPostStock({ onStockAdded }: NewPostStockProps) {
    const [symbol, setSymbol] = useState("");
    const [stockData, setStockData] = useState<StockData | null>(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isPending, startTransition] = useTransition();

    // Search for stock data - calls our API route
    const handleSearch = async () => {
        if (!symbol.trim()) {
            setError("Please enter a stock symbol");
            return;
        }

        setIsLoading(true);
        setError("");
        setStockData(null);

        try {
            // Fetch from our API route (server-side handles the API key)
            const response = await fetch(
                `/api/stock?symbol=${symbol.toUpperCase()}`
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch stock data");
            }

            const quote = data["Global Quote"];
            if (!quote || Object.keys(quote).length === 0) {
                throw new Error("Stock symbol not found");
            }

            // Format the stock data
            const formattedData: StockData = {
                symbol: quote["01. symbol"],
                price: quote["05. price"],
                volume: quote["06. volume"],
                change: quote["09. change"],
                changePercent: quote["10. change percent"],
                lastTradingDay: quote["07. latest trading day"],
            };

            setStockData(formattedData);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    // Add stock to portfolio using server action (createNewPost from discussion)
    const handleAddToPortfolio = async () => {
        if (!stockData) return;

        startTransition(async () => {
            try {
                // Call server action
                await addStockToPortfolio(stockData);

                // Callback to parent component to update UI
                if (onStockAdded) {
                    onStockAdded(stockData);
                }

                // Reset form
                setSymbol("");
                setStockData(null);
                setError("");
            } catch (err) {
                setError("Failed to add stock to portfolio");
            }
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Add Stock to Portfolio
            </h2>

            <div className="flex gap-3 mb-6">
                <input
                    type="text"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter stock symbol (e.g., AAPL)"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading || isPending}
                />
                <button
                    onClick={handleSearch}
                    disabled={isLoading || isPending}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 "
                >
                    {isLoading ? "Searching..." : "Search"}
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            {/* Stock Data Display */}
            {stockData && (
                <div className="border border-gray-200 rounded-lg p-6 mb-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-3xl font-bold text-gray-900">
                                {stockData.symbol}
                            </h3>
                            <p className="text-sm text-gray-500">
                                Last Updated: {stockData.lastTradingDay}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold text-gray-900">
                                ${parseFloat(stockData.price).toFixed(2)}
                            </p>
                            <p
                                className={`text-lg font-semibold ${
                                    parseFloat(stockData.change) >= 0
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                {parseFloat(stockData.change) >= 0 ? "+" : ""}
                                {parseFloat(stockData.change).toFixed(2)} (
                                {stockData.changePercent})
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-white p-3 rounded-lg">
                            <p className="text-sm text-gray-600">Volume</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {parseInt(stockData.volume).toLocaleString()}
                            </p>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                            <p className="text-sm text-gray-600">Change</p>
                            <p
                                className={`text-lg font-semibold ${
                                    parseFloat(stockData.change) >= 0
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                {stockData.changePercent}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleAddToPortfolio}
                        disabled={isPending}
                        className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
                    >
                        {isPending ? "Adding to Portfolio..." : "Add to Portfolio"}
                    </button>
                </div>
            )}

            {!stockData && !error && !isLoading && (
                <div className="text-center text-gray-500 py-8">
                    <p className="text-lg mb-2">Search for a stock to get started</p>
                    <p className="text-sm">
                        Enter a stock symbol (like AAPL, GOOGL, MSFT) and click Search
                    </p>
                </div>
            )}
        </div>
    );
}