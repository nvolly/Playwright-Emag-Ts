const { chromium, expect, page } = require("@playwright/test");
import { faker } from "@faker-js/faker/dist/locale/en";
import { Page } from "@playwright/test";

export async function wait(page: Page): Promise<void> {
  await page.waitForLoadState("networkidle");
  let href1 = await page.evaluate(() => {
    // @ts-ignore - lagata is defined in the browser context
    return Object.keys(window.lagata).length;
  });

  while (href1 >= 1) {
    href1 = await page.evaluate(() => {
      // @ts-ignore - lagata is defined in the browser context
      return Object.keys(window.lagata).length;
    });
  }
}

export async function generateCNP(): Promise<string> {
  const s = faker.helpers.arrayElement(["1", "2"]);
  const year = faker.number
    .int({ min: 50, max: 99 })
    .toString()
    .padStart(2, "0");
  const month = faker.number
    .int({ min: 1, max: 12 })
    .toString()
    .padStart(2, "0");
  const day = faker.number.int({ min: 1, max: 28 }).toString().padStart(2, "0");
  const county = faker.number
    .int({ min: 1, max: 52 })
    .toString()
    .padStart(2, "0");
  const nnn = faker.number
    .int({ min: 1, max: 999 })
    .toString()
    .padStart(3, "0");
  const control = faker.number.int({ min: 0, max: 9 });
  return `${s}${year}${month}${day}${county}${nnn}${control}`;
}

export async function generateSerie(): Promise<string> {
  const letters = faker.string.alpha({ length: 2, casing: "upper" });
  const numbers = faker.string.numeric(6);
  return `${letters}${numbers}`;
}

export async function generateEmis(): Promise<string> {
  const sector = faker.number.int({ min: 1, max: 6 });
  return `SPCEP sector ${sector}`;
}

export async function generateOras(): Promise<string> {
  const cities = [
    "București",
    "Cluj-Napoca",
    "Timișoara",
    "Iași",
    "Constanța",
    "Brașov",
    "Sibiu",
    "Oradea",
  ];
  return faker.helpers.arrayElement(cities);
}

export async function generateAdresa(): Promise<string> {
  const street = faker.person.lastName();
  const number = faker.number.int({ min: 1, max: 100 });
  const apt = faker.number.int({ min: 1, max: 50 });
  return `Strada ${street} ${number}, Apartament ${apt}`;
}

export async function generateBanca(): Promise<string> {
  const banks = [
    "ING",
    "BCR",
    "BRD",
    "Raiffeisen",
    "Alpha Bank",
    "CEC Bank",
    "UniCredit",
  ];
  return faker.helpers.arrayElement(banks);
}

export async function generateIBAN(banca: string): Promise<string> {
  const bankCodes: Record<string, string> = {
    ING: "INGB",
    BCR: "RNCB",
    BRD: "BRDE",
    Raiffeisen: "RZBR",
    "Alpha Bank": "BUCU",
    "CEC Bank": "CECE",
    UniCredit: "BACX",
  };
  const code = bankCodes[banca] || "XXXX";
  const checksum = faker.number.int({ min: 10, max: 99 });
  const account = faker.string.numeric(16);
  return `RO${checksum}${code}0000${account}`;
}

interface FakeProfile {
  nume: string;
  prenume: string;
  email: string;
  telefon: string;
  cnp: string;
  serie: string;
  emis: string;
  oras: string;
  adresa: string;
  banca: string;
  iban: string;
}

export async function generateFakeProfile(): Promise<FakeProfile> {
  const fullName = faker.person.fullName().split(" ");
  const nume = fullName.slice(-1)[0];
  const prenume = fullName.slice(0, -1).join(" ");
  const email = faker.internet.email();
  const telefon = "072" + faker.string.numeric(3) + faker.string.numeric(4);
  const cnp = await generateCNP();
  const serie = await generateSerie();
  const emis = await generateEmis();
  const oras = await generateOras();
  const adresa = await generateAdresa();
  const banca = await generateBanca();
  const iban = await generateIBAN(banca);

  return {
    nume,
    prenume,
    email,
    telefon,
    cnp,
    serie,
    emis,
    oras,
    adresa,
    banca,
    iban,
  };
}
