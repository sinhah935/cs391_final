"use client";
//ANnika Manjunath U05916630
import { useEffect, useState } from "react";

type StockData = {
    symbol: string;
    price: string;
    volume: string;
    change: string;
    changePercent: string;
    lastTradingDay: string;
};

type ResultDisplayProps = {
    portfolio: StockData[];
};

export default function ResultDisplay({ portfolio }: ResultDisplayProps) {
    const [totalValue, setTotalValue] = useState(0);
    const [totalReturn, setTotalReturn] = useState(0);
    const [volatility, setVolatility] = useState(0);
    const [sharpeRatio, setSharpeRatio] = useState(0);
    const [maxDrawdown, setMaxDrawdown] = useState(0);
    const [maxDrawdownStock, setMaxDrawdownStock] = useState("");  // ← Add this


    useEffect(() => {
        if (portfolio.length > 0) {
            calculateMetrics();
        }
    }, [portfolio]);

    const calculateMetrics = () => {
        // Total Value
        const value = portfolio.reduce((sum, stock) => sum + parseFloat(stock.price), 0);
        setTotalValue(value);

        // Total Return (average change %)
        const returns = portfolio.map(s => parseFloat(s.changePercent.replace("%", "")));
        const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
        setTotalReturn(avgReturn);

        // Volatility (average absolute change %)
        const vol = returns.reduce((sum, r) => sum + Math.abs(r), 0) / returns.length;
        setVolatility(vol);

        // Sharpe Ratio
        const sharpe = vol !== 0 ? avgReturn / vol : 0;
        setSharpeRatio(sharpe);


        // Max Drawdown
        // Max Drawdown - find the worst performing stock
        const changes = portfolio.map(s => ({
            symbol: s.symbol,
            change: parseFloat(s.change)
        }));
        const worstStock = changes.reduce((worst, current) =>
            current.change < worst.change ? current : worst
        );
        setMaxDrawdown(Math.min(worstStock.change, 0));
        setMaxDrawdownStock(worstStock.symbol);  // ← Store the stock symbol
    };

    const getVolatilityColor = () => {
        if (volatility < 5) return "bg-green-500";
        if (volatility < 15) return "bg-yellow-500";
        return "bg-red-500";
    };

    const getVolatilityText = () => {
        if (volatility < 5) return "Low Risk - Stable";
        if (volatility < 15) return "Moderate Risk";
        return "High Risk - Volatile";
    };

    if (portfolio.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-[#F5E9E5] to-[#452829] p-8">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
                    <h2 className="text-2xl font-bold text-[#452829] mb-4">
                        No Portfolio Data
                    </h2>
                    <p className="text-gray-600">
                        Add stocks to your portfolio to see results.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F5E9E5] to-[#452829] p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h1 className="text-3xl font-bold text-[#452829] mb-2">
                        Portfolio Results
                    </h1>
                    <p className="text-gray-600">
                        Analysis of your {portfolio.length} stock portfolio
                    </p>
                </div>

                {/* Main Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <p className="text-sm text-gray-600 mb-1">Total Value</p>
                        <p className="text-2xl font-bold text-[#452829]">
                            ${totalValue.toFixed(2)}
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <p className="text-sm text-gray-600 mb-1">Total Return</p>
                        <p className={`text-2xl font-bold ${totalReturn >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {totalReturn >= 0 ? "+" : ""}{totalReturn.toFixed(2)}%
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <p className="text-sm text-gray-600 mb-1">Sharpe Ratio</p>
                        <p className="text-2xl font-bold text-[#452829]">
                            {sharpeRatio.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            {sharpeRatio < 0 ? "Losing" : sharpeRatio < 1 ? "Not great" : sharpeRatio < 2 ? "Good" : sharpeRatio < 3 ? "Very good" : "Excellent"}
                        </p>
                    </div>
                </div>

                {/* Volatility and Top Holdings Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* Volatility Risk Display */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <p className="text-sm text-gray-600 mb-4">Portfolio Volatility</p>

                        <div className="text-center mb-4">
                            <p className="text-5xl font-bold text-[#452829] mb-2">
                                {volatility.toFixed(1)}%
                            </p>
                            <p className={`text-lg font-semibold ${
                                volatility < 5 ? "text-green-600" : volatility < 15 ? "text-yellow-600" : "text-red-600"
                            }`}>
                                {getVolatilityText()}
                            </p>
                        </div>

                        {/* Visual Progress Bar */}
                        <div className="w-full">
                            <div className="flex justify-between text-xs text-gray-500 mb-2">
                                <span>Low</span>
                                <span>Moderate</span>
                                <span>High</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                                <div
                                    className={`h-6 rounded-full transition-all duration-500 ${getVolatilityColor()}`}
                                    style={{ width: `${Math.min((volatility / 30) * 100, 100)}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                <span>0%</span>
                                <span>15%</span>
                                <span>30%+</span>
                            </div>
                        </div>
                    </div>

                    {/* Top 5 Stocks by Value */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <p className="text-sm text-gray-600 mb-4">Top 5 Holdings by Value</p>

                        <div className="space-y-3">
                            {portfolio
                                .map((stock) => ({
                                    ...stock,
                                    numPrice: parseFloat(stock.price),
                                }))
                                .sort((a, b) => b.numPrice - a.numPrice)
                                .slice(0, 5)
                                .map((stock, index) => (
                                    <div key={stock.symbol} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg font-bold text-[#452829] w-6">
                                                {index + 1}.
                                            </span>
                                            <div>
                                                <p className="font-semibold text-[#452829]">
                                                    {stock.symbol}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {((stock.numPrice / totalValue) * 100).toFixed(1)}% of portfolio
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-lg font-bold text-[#452829]">
                                            ${stock.numPrice.toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Additional Metrics */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h3 className="text-lg font-semibold text-[#452829] mb-4">
                        Additional Metrics
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex justify-between p-3 bg-gray-50 rounded">
                            <span className="text-gray-600">Max Drawdown</span>
                            <div className="text-right">
                                <span className="font-semibold text-red-600">
                                    ${maxDrawdown.toFixed(2)}
                                </span>
                                {maxDrawdownStock && (
                                    <span className="text-xs text-gray-500 ml-2">
                                        ({maxDrawdownStock})
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-between p-3 bg-gray-50 rounded">
                            <span className="text-gray-600">Number of Stocks</span>
                            <span className="font-semibold text-[#452829]">
                                {portfolio.length}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Stock List */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-[#452829] mb-4">
                        Your Stocks
                    </h3>
                    <div className="space-y-2">
                        {portfolio.map((stock) => (
                            <div key={stock.symbol} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <div>
                                    <p className="font-semibold text-[#452829]">{stock.symbol}</p>
                                    <p className="text-sm text-gray-600">${parseFloat(stock.price).toFixed(2)}</p>
                                </div>
                                <div className="text-right">
                                    <p className={`font-semibold ${parseFloat(stock.change) >= 0 ? "text-green-600" : "text-red-600"}`}>
                                        {parseFloat(stock.change) >= 0 ? "+" : ""}{stock.changePercent}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}