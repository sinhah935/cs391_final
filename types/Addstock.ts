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
    // Check if stock already exists in portfolio
    const exists = portfolio.some((s) => s.symbol === stock.symbol);

    if (exists) {
        throw new Error("Stock already exists in portfolio");
    }

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