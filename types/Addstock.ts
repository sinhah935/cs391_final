"use server";

type StockData = {
    symbol: string;
    price: string;
    volume: string;
    change: string;
    changePercent: string;
    lastTradingDay: string;
};

// In-memory storage for now, replace later --> mongo?
let portfolio: StockData[] = [];

export async function addStockToPortfolio(stock: StockData) {
    // Removed duplicate check since we're managing state on client with localStorage
    // The client-side already handles preventing duplicates
    portfolio.push(stock);
    return { success: true, portfolio };
}

export async function getPortfolio() {
    return portfolio;
}

export async function removeStockFromPortfolio(symbol: string) {
    portfolio = portfolio.filter((stock) => stock.symbol !== symbol);
    return { success: true, portfolio };
}

export async function clearPortfolio() {
    portfolio = [];
    return { success: true };
}