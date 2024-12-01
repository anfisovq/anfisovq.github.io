const apiUrl = "https://api.coinlore.net/api/tickers/";
const updateInterval = 10000; // 

// Указанные криптовалюты
const desiredCryptos = ["TON", "BTC", "LTC", "TRX", "USDT"];

// Карта иконок
const iconMap = {
    BTC: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    LTC: "https://cryptologos.cc/logos/litecoin-ltc-logo.png",
    TRX: "https://crypto.ru/wp-content/uploads/trxjpg.png",
    USDT: "https://cryptologos.cc/logos/tether-usdt-logo.png",
    TON: "https://cryptologos.cc/logos/toncoin-ton-logo.png" 
};

async function fetchCryptos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const filteredCryptos = data.data.filter(crypto =>
            desiredCryptos.includes(crypto.symbol)
        );
        displayCryptos(filteredCryptos);
    } catch (error) {
        console.error("Error fetching cryptos:", error);
    }
}

function displayCryptos(cryptos) {
    const container = document.getElementById("cryptos");
    container.innerHTML = ""; 

    cryptos.forEach(crypto => {
        const { name, symbol, price_usd, percent_change_24h } = crypto;

        const cryptoDiv = document.createElement("div");
        cryptoDiv.classList.add("crypto");

      
        const iconUrl = iconMap[symbol] || "https://via.placeholder.com/40";

     
        const price = isNaN(parseFloat(price_usd)) ? "N/A" : parseFloat(price_usd).toFixed(2);
        const percentChange = isNaN(parseFloat(percent_change_24h)) ? "N/A" : parseFloat(percent_change_24h).toFixed(2);

        const changeClass = percentChange !== "N/A" && percentChange >= 0 ? "positive" : "negative";

        cryptoDiv.innerHTML = `
            <div class="crypto-details">
                <img src="${iconUrl}" alt="${name}" />
                <div>
                    <span class="crypto-name">${symbol} (${name})</span>
                </div>
            </div>
            <div class="crypto-price">
                <span class="price-label">Цена</span>
                <span class="price-value">$${price}</span>
                <span class="price-label">Изменение (24ч)</span>
                <span class="${changeClass} price-value">${percentChange}%</span>
            </div>
        `;

        container.appendChild(cryptoDiv);
    });
}


setInterval(fetchCryptos, updateInterval);


fetchCryptos();
