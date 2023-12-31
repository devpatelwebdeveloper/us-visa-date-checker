#!/usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import clear from "clear";
import CLI from "clui";
import puppeteer from "puppeteer";
import * as dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });

const locations = [
	{
		location: "Calgary",
		id: "89",
	},
	{
		location: "Halifax",
		id: "90",
	},
	{
		location: "Montreal",
		id: "91",
	},
	{
		location: "Ottawa",
		id: "92",
	},
	{
		location: "Quebec City",
		id: "93",
	},
	{
		location: "Toronto",
		id: "94",
	},
	{
		location: "Vancouver",
		id: "95",
	},
];

clear();

console.log(chalk.yellow(figlet.textSync("US VISA DATES Check")));

// const interval = 600000;
const interval = 60;

const alertBefore = new Date(process.env.BEFOREDATE);

let gSpinner = new CLI.Spinner("Waiting for the next run...");

let checkAvailability = () => {
	(async () => {
		gSpinner.stop();
		console.log(chalk.gray("Opening Chrome headless..."));
		let browser = await puppeteer.launch({ headless: "new" });
		let page = await browser.newPage();

		let spinner = new CLI.Spinner("Signing in...");
		spinner.start();

		const date = new Date().toLocaleString(); // Corrected date formatting

		await page.goto("https://ais.usvisa-info.com/en-ca/niv/users/sign_in");
		await page.type("#user_email", process.env.USERNAME);
		await page.type("#user_password", process.env.PASSWORD);
		await page.$eval("#policy_confirmed", (check) => (check.checked = true));
		await new Promise((resolve) => setTimeout(resolve, 3000));

		try {
			await Promise.all([
				page.waitForNavigation(),
				page.click("input[type=submit]"),
			]);
		} catch (error) {
			console.error("Error occurred during navigation:", error.message);
		}

		spinner.stop();
		console.log(chalk.green("Signed in!"));
		console.log(chalk.yellow(`Checking at: ${date}`));
		await page.waitForSelector("[role='menuitem'] > .button.primary.small");
		await page.evaluate(() => {
			document
				.querySelector("[role='menuitem'] > .button.primary.small")
				.click();
		});
		await page.waitForSelector("#main");
		const url = page.url();
		const id = url.replace(/\D/g, "");

		locations.map(async (location) => {
			console.log(chalk.green(`Checking for ${location.location}`));
			const apiUrl = `https://ais.usvisa-info.com/en-ca/niv/schedule/${id}/appointment/days/${location.id}.json?appointments[expedite]=false`;
			console.log(chalk.gray(apiUrl));

			let response = await page.goto(apiUrl);

			if (!response.ok()) {
				throw new Error(chalk.red(`HTTP error! Status: ${response.status()}`));
			}

			let json = await response.json();
			console.log(json.slice(0, 5));
			if (json.length == 0) {
				console.log(chalk.red("No appointments!"));
			} else if (Date.parse(json[0].date) < alertBefore) {
				console.log(chalk.green("Early appointment available!!!"));
				console.log(chalk.white(json[0].date));
			} else {
				console.log(chalk.red("No early appointments!"));
			}
			console.log(chalk.gray("Closing Chrome headless..."));
		});

		await browser.close();

		let next = new Date();
		next.setTime(next.getTime() + interval);
		// console.log(chalk.green(`checking for ${locationId}id`));
		console.log(chalk.gray(`Next checking at: ${next.toLocaleString()}`));
		gSpinner.start();
		setTimeout(checkAvailability, interval);
	})();
};

checkAvailability();
