import { NextRequest, NextResponse } from "next/server";
import { GlobalQuoteResponse } from "@/types/StocksTypes";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const symbol = searchParams.get("symbol");

    if (!symbol) {
        return NextResponse.json(
            { error: "Stock symbol is required" },
            { status: 400 }
        );
    }

    const apiKey = process.env.API_KEY;

    if (!apiKey) {
        return NextResponse.json(
            { error: "API key not configured" },
            { status: 500 }
        );
    }

    try {
        const response = await fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch stock data");
        }

        const data: GlobalQuoteResponse = await response.json();

        // Check if API limit reached or invalid symbol
        if (data["Global Quote"] && Object.keys(data["Global Quote"]).length === 0) {
            return NextResponse.json(
                { error: "Stock symbol not found or API limit reached" },
                { status: 404 }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching stock data:", error);
        return NextResponse.json(
            { error: "Failed to fetch stock data" },
            { status: 500 }
        );
    }
}
