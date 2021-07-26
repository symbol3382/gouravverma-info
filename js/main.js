$(document).ready(function () {
    let buyInput = $("#pc_buyAt");
    let sellInput = $("#pc_sellAt");
    let totalBuyInput = $("#pc_totalBuyAt");
    let totalSellInput = $("#pc_totalSellAt");
    let totalBuySell = $("#pc_totalBuySell");
    let maker = $("#pc_maker");
    let taker = $("#pc_taker");
    let taxP = $("#pc_taxP");
    let taxV = $("#pc_taxV");
    let profitP = $("#pc_profitP");
    let profitV = $("#pc_profitV");
    let inHandProfitP = $("#pc_hProfitP");
    let inHandProfitV = $("#pc_hProfitV");
    let perCoinCheck = $("#pc_perCoin");
    let coins = $("#pc_coins");

    let makerPercent = 0.2;
    let takerPercent = 0.2;


    const parse = function (value) {
        return parseFloat(parseFloat(value).toPrecision(12))
    }

    const percent = function (val, percent) {
        return parse(val * percent / 100);
    }

    const calPercent = function (base, value) {
        return parse((value / base) * 100);
    }

    const show = function (value) {
        return parseFloat(parseFloat(value).toFixed(6));
    }


    const buySellHandler = function () {
        buyInput.val(buyInput.val().replace(/[^\d.-]/g, ''));
        sellInput.val(sellInput.val().replace(/[^\d.-]/g, ''));
        if (
            sellInput.val() !== null && sellInput.val().length != 0
            && buyInput.val() !== null && buyInput.val().length != 0
        ) {
            let coinCount = parseFloat(perCoinCheck.is(":checked") ? 1 : coins.val());
            let buy = parseFloat(buyInput.val()) * coinCount;
            let sell = parseFloat(sellInput.val()) * coinCount;

            let makerTax = parseFloat(percent(buy, makerPercent));
            let takerTax = parseFloat(percent(sell, takerPercent));

            let profit = parse(sell - buy);
            let profitPercent = calPercent(buy, profit);

            let tax = parse(makerTax + takerTax);
            let taxPercent = calPercent(buy, tax);

            let inHandProfit = parse(sell - buy - tax);
            let inHandProfitPercent = calPercent(buy, inHandProfit);

            console.log({
                aa_coins: coinCount,
                ab_perCoin: perCoinCheck.is(":checked"),
                a_buy: buy, b_sell: sell, c_makerTax: makerTax, d_takerTax: takerTax, e_profit: profit, f_profitPercent: profitPercent, g_tax: tax, h_taxPercent: taxPercent
             })

            maker.val(show(makerTax));
            taker.val(show(takerTax));

            profitP.val(show(profitPercent));
            profitV.val(show(profit));

            taxV.val(show(tax));
            taxP.val(show(taxPercent));

            inHandProfitV.val(show(inHandProfit));
            inHandProfitP.val(show(inHandProfitPercent))

            totalBuyInput.val(show(buy));
            totalSellInput.val(show(sell));
        }
    };

    buyInput.keyup(buySellHandler);
    sellInput.keyup(buySellHandler);
    coins.change(buySellHandler);
    perCoinCheck.change(buySellHandler);
});