$(document).ready(function () {
    let buyInput = $("#pc_buyAt");
    let sellInput = $("#pc_sellAt");
    let totalBuyInput = $("#pc_totalBuyAt");
    let totalSellInput = $("#pc_totalSellAt");
    let is50LessTax = $("#pc_50_less_tax");
    let coins = $("#pc_coins");
    let perProfitInput = $(`#pc_profit_per`);
    let totalProfitInput = $(`#pc_profit_total`);

    let makerPercent = 0.2;
    let takerPercent = 0.2;

    is50LessTax.change(function (a) {
        if (is50LessTax.is(":checked")) {
            makerPercent = 0.1;
            takerPercent = 0.1;
            buySellHandler();
        } else {
            makerPercent = 0.1;
            takerPercent = 0.1;
            buySellHandler();
        }
    })


    const parse = function (value) {
        return parseFloat(parseFloat(value).toPrecision(12))
    }

    const percent = function (val, percent) {
        return `${parse(val * percent / 100)}`;
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
            sellInput.val() !== null && sellInput.val().length !== 0
            && buyInput.val() !== null && buyInput.val().length !== 0
        ) {
            let coinCount = parseFloat(coins.val());

            // single coin data

            let buy = parseFloat(buyInput.val());
            let sell = parseFloat(sellInput.val());

            let makerTax = parseFloat(percent(buy, makerPercent));
            let takerTax = parseFloat(percent(sell, takerPercent));

            //// without tax data
            let profitWithoutTax = parse(sell - buy);
            let p_profitWithoutTax = calPercent(buy, profitWithoutTax);

            //// with tax data
            let realBuy = buy + makerTax;
            let realSell = sell - takerTax;

            let profitAfterTax = realSell - realBuy;

            alertLoss(realSell, realBuy, sellInput);


            // total coin data

            let totalBuy = parseFloat(`${buy}`) * coinCount;
            let totalSell = parseFloat(`${sell}`) * coinCount;

            let totalMakerTax = parseFloat(percent(totalBuy, makerPercent));
            let totalTakerTax = parseFloat(percent(totalSell, takerPercent));

            // without tax

            let realTotalBuy = totalBuy + totalMakerTax;
            let realTotalSell = totalSell - totalTakerTax;

            totalBuyInput.val(show(realTotalBuy));
            totalSellInput.val(show(realTotalSell));

            perProfitInput.val(show(realSell - realBuy));
            totalProfitInput.val(show(realTotalSell - realTotalBuy));

            alertLoss(realTotalSell, realTotalBuy, totalSellInput);
        }
    };

    const alertLoss = function (sell, buy, selector) {
        const tempSell = show(sell);
        const tempBuy = show(buy);
        if (tempSell < tempBuy) {
            selector.attr('style', 'background-color: red !important');
        } else if (tempSell === tempBuy) {
            selector.attr('style', 'background-color: blue !important');
        } else {
            selector.attr('style', 'background-color: green !important');
        }
    }

    buyInput.keyup(buySellHandler);
    sellInput.keyup(buySellHandler);
    coins.change(buySellHandler);
    coins.keyup(buySellHandler);
    coins.keydown(buySellHandler);
    coins.keypress(buySellHandler);
});