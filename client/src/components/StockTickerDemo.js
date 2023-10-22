import React from 'react';
import ReactDOM from 'react-dom';
import StockTicker from './StockTicker';

const stocks = [
    { name: 'AAPL', price: '$150.25' },
    { name: 'GOOGL', price: '$2800.50' },
    { name: 'AMZN', price: '$3450.75' },
    // Add more stock objects as needed
];

const App = () => {
    return (
        <div>
            <h1>Stock Ticker</h1>
            <StockTicker stocks={stocks} />
        </div>
    );
};


