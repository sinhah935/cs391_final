export type GlobalQuoteResponse = {
    "Global Quote": {
        "01. symbol": string;
        "02. open": string;
        "03. high": string;
        "04. low": string;
        "05. price": string;
        "06. volume": string;
        "07. latest trading day": string;
        "08. previous close": string;
        "09. change": string;
        "10. change percent": string;
    };
};

export type TimeSeriesResponse = {
    "Meta Data": {
        "1. Information": string;
        "2. Symbol": string;
        "3. Last Refreshed": string;
        "4. Output Size": string;
        "5. Time Zone": string;
    };
    "Time Series (Daily)": {
        [date: string]: {
            "1. open": string;
            "2. high": string;
            "3. low": string;
            "4. close": string;
            "5. volume": string;
        };
    };
};