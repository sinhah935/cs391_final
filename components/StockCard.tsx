import React from "react";
import type {GlobalQuoteResponse} from "@/types/StocksTypes";

// type StockCardProps = {
//     quote: GlobalQuoteResponse["Global Quote"];
//     onDelete: (symbol: string) => void;
// };

type StockData = {
    symbol: string;
    price: string;
    volume: string;
    change: string;
    changePercent: string;
    lastTradingDay: string;
};
type StockCardProps = {
    stock: StockData;
    onDelete: (symbol: string) => void;
};

export default function StockCard({ stock, onDelete  }: StockCardProps) {
    // const symbol = quote["01. symbol"];
    // const price = quote["05. price"];
    // const change = quote["09. change"];
    // const changePercent = quote["10. change percent"];
    // const volume = quote["06. volume"];
    // const latestDay = quote["07. latest trading day"];

    return (
        <div
            className="border rounded-lg p-4 shadow-sm mb-3 mt-4 border-[#F3E8DF] bg-gradient-to-br from-[#452829] to-[#5A0E24] relative">
            {/* Delete Button - positioned in top right */}
            <button
                type="button"
                onClick={() => onDelete(stock.symbol)}
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-[#F3E8DF] hover:text-white hover:bg-red-600 rounded-full transition-all duration-200 border border-[#F3E8DF] hover:border-red-600"
                aria-label="Remove stock from portfolio"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            <div>
                <div className="flex items-baseline gap-2">
                    <h2 className="text-lg font-semibold text-[#F3E8DF]">{stock.symbol}</h2>
                    <span className="text-sm text-[#E8D1C5]">{stock.lastTradingDay}</span>
                </div>

                <div className="mt-1 text-sm text-[#F3E8DF]">
                    <p>Price: ${stock.price}</p>
                    <p>Change: {stock.change} ({stock.changePercent})</p>
                    <p>Volume: {Number(stock.volume).toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
}
