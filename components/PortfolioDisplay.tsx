"use client"

//DONE BY MOHAMMED SINHAH U06898720
import { TimeSeriesResponse } from "@/types/StocksTypes";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
// import PostPreview from "./PostPreview";
import StockCard from "@/components/StockCard";

type StockData = {
    symbol: string;
    price: string;
    volume: string;
    change: string;
    changePercent: string;
    lastTradingDay: string;
};

type PortfolioDisplayProps = {
    inputs: StockData[];
};

// Takes in an array of Stock Info and will display by calling Stock card whilst mapping to every stock
export default function PostsDisplay({ inputs }: PortfolioDisplayProps) {
    const [stocks, setStocks] = useState<StockData[]>([]); //Change to <StockCard>[]
    const router = useRouter();
    useEffect(() => {
        setStocks(inputs);
        console.log(stocks);
    }, [inputs]);


    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full px-4">
                {/*Each stock card should have its own button, this function will display the stock cards. May add drop down button to dynamically show*/}
                {stocks.map((p) => (
                    <StockCard key={p.symbol} stock={p} />
                ))}
            </div>

            <button
                className="mt-4 px-4 py-2 bg-white text-[#452829] font-medium rounded-lg border border-[#F3E8DF] shadow-sm hover:bg-[#d7b9ab] transition"
                onClick={() => router.push("/results")}>
                RESULTS
            </button>

        </>

        // Add a button to go to the portfolio display (RESULTS)
    );
}