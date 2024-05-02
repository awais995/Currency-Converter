#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class currencyConverter {
    private exchangeRates: { [currency:string]: number };

    constructor () {
    this.exchangeRates = {
        PKR: 1,         // 1 PKR = 1 PKR
        USD: 278.13,    // 1 USD = 278.13 PKR
        EUR: 297.15,    // 1 EUR = 297.15 PKR
        GBP: 347.36,    // 1 GBP = 347.36 PKR
        JPY: 1.77,      // 1 JPY = 1.77 PKR
        SAR: 74.16,     // 1 SAR = 74.16 PKR
        AED: 75.71,     // 1 AED = 75.71 PKR 
        };
    };
    async convertCurrency (){
        const questions = [
            {
                type: "number",
                name: "amount",
                message: "Enter the amount to convert",
            },
            {
                type: "list",
                name:"fromCurrency",
                message: "select the currency which you want to convert.",
                choices: Object.keys(this.exchangeRates)
            },
            {
                type: "list",
                name:"toCurrency",
                message: "select the currency in which you want to get exchange.",
                choices: Object.keys(this.exchangeRates)
            }
        ];
        
        const answers = await inquirer.prompt(questions);
        const {amount, fromCurrency, toCurrency} = answers;

        if (!(fromCurrency in this.exchangeRates) || !(toCurrency in this.exchangeRates)){
            throw new Error("Exchange rate not fuund for provided currency.");
            return;
        }
        const convertedAmount = this.convert(amount, fromCurrency, toCurrency);
        console.log(`${amount} ${fromCurrency} is ${chalk.green(convertedAmount.toFixed(2))} ${toCurrency}`);
    }

    private convert(amount: number, from: string, to: string): number {
        const exchangeRateFrom = this.exchangeRates[from];
        const exchangeRateTo = this.exchangeRates[to];
        return (amount * exchangeRateFrom) / exchangeRateTo;
    }
}

// Example usage
const converter = new currencyConverter();
converter.convertCurrency();   