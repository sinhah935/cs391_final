"use client";

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
    const [diversificationScore, setDiversificationScore] = useState(0);
    const [maxDrawdown, setMaxDrawdown] = useState(0);

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

        // Diversification Score
        const numStocks = portfolio.length;
        const prices = portfolio.map(s => parseFloat(s.price));
        const largestPosition = Math.max(...prices) / value;
        const divScore = (numStocks / 20) * 50 + (1 - largestPosition) * 50;
        setDiversificationScore(Math.min(100, divScore));

        // Max Drawdown
        const changes = portfolio.map(s => parseFloat(s.change));
        setMaxDrawdown(Math.min(...changes, 0));
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

                {/* Risk Metrics with Gauges */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* Volatility Gauge */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <p className="text-sm text-gray-600 mb-4">Volatility Risk Gauge</p>

                        {/* Semi-circle gauge */}
                        <div className="relative w-48 h-24 mx-auto mb-4">
                            {/* Background arc */}
                            <svg className="w-full h-full" viewBox="0 0 200 100">
                                {/* Green zone (0-30) */}
                                <path
                                    d="M 20 90 A 80 80 0 0 1 73.43 23.43"
                                    fill="none"
                                    stroke="#10b981"
                                    strokeWidth="20"
                                />
                                {/* Yellow zone (30-60) */}
                                <path
                                    d="M 73.43 23.43 A 80 80 0 0 1 126.57 23.43"
                                    fill="none"
                                    stroke="#f59e0b"
                                    strokeWidth="20"
                                />
                                {/* Red zone (60-100) */}
                                <path
                                    d="M 126.57 23.43 A 80 80 0 0 1 180 90"
                                    fill="none"
                                    stroke="#ef4444"
                                    strokeWidth="20"
                                />

                                {/* Needle */}
                                <line
                                    x1="100"
                                    y1="90"
                                    x2={100 + 70 * Math.cos((Math.PI * (1 - Math.min(volatility / 30, 1))))}
                                    y2={90 - 70 * Math.sin((Math.PI * (1 - Math.min(volatility / 30, 1))))}
                                    stroke="#452829"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                                {/* Center dot */}
                                <circle cx="100" cy="90" r="5" fill="#452829" />
                            </svg>
                        </div>

                        <div className="text-center">
                            <p className="text-3xl font-bold text-[#452829] mb-1">
                                {volatility.toFixed(1)}%
                            </p>
                            <p className="text-sm text-gray-500">
                                {volatility < 5 ? "Low Risk - Stable" : volatility < 15 ? "Moderate Risk" : "High Risk - Risky"}
                            </p>
                        </div>
                    </div>

                    {/* Diversification Score Gauge */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <p className="text-sm text-gray-600 mb-4">Diversification Score</p>

                        {/* Circular progress gauge */}
                        <div className="relative w-48 h-48 mx-auto mb-4">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                                {/* Background circle */}
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="80"
                                    fill="none"
                                    stroke="#e5e7eb"
                                    strokeWidth="20"
                                />

                                {/* Progress circle */}
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="80"
                                    fill="none"
                                    stroke={
                                        diversificationScore < 30
                                            ? "#ef4444"
                                            : diversificationScore < 60
                                                ? "#f59e0b"
                                                : "#10b981"
                                    }
                                    strokeWidth="20"
                                    strokeDasharray={`${(diversificationScore / 100) * 502.65} 502.65`}
                                    strokeLinecap="round"
                                />
                            </svg>

                            {/* Center text */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <p className="text-4xl font-bold text-[#452829]">
                                    {diversificationScore.toFixed(0)}
                                </p>
                                <p className="text-sm text-gray-500">out of 100</p>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-sm font-semibold text-gray-700">
                                {diversificationScore < 30 ? "Poor Diversification" : diversificationScore < 60 ? "Moderate Diversification" : "Good Diversification"}
                            </p>
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
                            <span className="font-semibold text-red-600">
                                ${maxDrawdown.toFixed(2)}
                            </span>
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