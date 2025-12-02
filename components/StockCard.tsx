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
};

export default function StockCard({ stock }: StockCardProps) {
    // const symbol = quote["01. symbol"];
    // const price = quote["05. price"];
    // const change = quote["09. change"];
    // const changePercent = quote["10. change percent"];
    // const volume = quote["06. volume"];
    // const latestDay = quote["07. latest trading day"];

    return (
        <div className="border rounded-lg p-4 flex justify-between items-center shadow-sm mb-3 mt-4 border-[#F3E8DF]">
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
            {/*<button*/}
            {/*    type="button"*/}
            {/*    onClick={() => onDelete(stock.symbol)}*/}
            {/*    className="text-sm px-3 py-1 border rounded-md hover:bg-red-50 hover:border-red-400 hover:text-red-600"*/}
            {/*>*/}
            {/*</button>*/}
        </div>
    );
}
