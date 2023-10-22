// TickerFeed.jsx

import Ticker from 'react-ticker';
import {useEffect, useState} from "react";

const stocks = [
    { name: 'AAPL', price: '$150.25' },
    { name: 'GOOGL', price: '$2800.50' },
    { name: 'AMZN', price: '$3450.75' },
    // Add more stock objects as needed
];
const TickerFeed = () => {

    return (
        <Ticker speed={5}>
            {() => (
                <div style={{ whiteSpace: 'nowrap', display: 'flex' }}>
                    {stocks.map((stock, index) => (
                        <div key={index} style={{ marginRight: '20px' }}>
                            {stock.name} - {stock.price}
                        </div>
                    ))}
                </div>
            )}
        </Ticker>
    );
};
export default TickerFeed;