"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import NewPostStock from "@/components/newPostStock";
import PortfolioDisplay from "@/components/PortfolioDisplay";

type StockData = {
    symbol: string;
    price: string;
    volume: string;
    change: string;
    changePercent: string;
    lastTradingDay: string;
};

export default function BuildPortfolioPage() {
    const [addedStocks, setAddedStocks] = useState<StockData[]>([]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleStockAdded = (stock: StockData) => {
        setAddedStocks((prev) => [...prev, stock]);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F5E9E5] to-[#452829]">

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-[#452829] mb-2">
                        Build Your Portfolio
                    </h1>
                    <p className="text-[#E8D1C5]">
                        Search and add stocks to create your custom portfolio
                    </p>
                </div>

                {/* Success Message */}
                {showSuccessMessage && (
                    <div className="max-w-2xl mx-auto mb-4 p-4 bg-[#F3E8DF] border border-[#F3E8DF] text-[#452829] rounded-lg">
                        Stock Successfully Added To Portfolio!
                    </div>
                )}

                {/* NewPostStock Component */}
                <NewPostStock onStockAdded={handleStockAdded} />

                {/* Recently Added Stocks */}
                {addedStocks.length > 0 && (
                    <div className="max-w-2xl mx-auto mt-8">
                        <h3 className="text-xl font-semibold mb-4 text-[#F3E8DF]">
                            Recently Added ({addedStocks.length})
                        </h3>
                        <div className="space-y-2">
                            {addedStocks.map((stock, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
                                >
                                    <div>
                                        <span className="font-bold text-lg">{stock.symbol}</span>
                                        <span className="text-[#57595B] ml-2">
                                            ${parseFloat(stock.price).toFixed(2)}
                                        </span>
                                    </div>
                                    <span
                                        className={`font-semibold ${
                                            parseFloat(stock.change) >= 0
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {stock.changePercent}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/*<button*/}
                        {/*    onClick={() => window.location.href = '/portfolio'}*/}
                        {/*    className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"*/}
                        {/*>*/}
                        {/*    View Full Portfolio*/}
                        {/*</button>*/}
                        <PortfolioDisplay inputs={addedStocks} />
                    </div>
                )}
            </div>
        </div>
    );
}