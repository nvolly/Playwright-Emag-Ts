import { faker } from '@faker-js/faker/dist/locale/en';
import { Page } from '@playwright/test';

interface ActiveCurenteItem {
  simbol: string;
  sold?: number;
  [key: string]: any;
}

interface DisponibilItem {
  nume: string;
  cont: string;
  disp: number;
  [key: string]: any;
}

interface DisponibilResponse {
  data: DisponibilItem[];
  [key: string]: any;
}

export async function wait(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
  let href1: number = await page.evaluate(() => Object.keys((window as any).lagata).length);

  while (href1 >= 1) {
    href1 = await page.evaluate(() => Object.keys((window as any).lagata).length);
  }
}

export async function activeCurente(page: Page): Promise<ActiveCurenteItem | number | undefined> {
  try {
    let href: ActiveCurenteItem[] = await page.evaluate(() => (window as any).activecurente);
    let e: ActiveCurenteItem | undefined;

    if (href.length === 0) {
      return 0;
    }

    while (href.length > 0) {
      href = await page.evaluate(() => (window as any).activecurente);
      for (const element of href) {
        if (element.simbol === 'RON') {
          e = element;
          return e;
        }
      }
    }
    return undefined;
  } catch (error) {
    console.error('An error occurred in active:', (error as Error).message);
    return undefined;
  }
}

export async function activeCurenteSimbol(
  page: Page,
  simbol: string
): Promise<ActiveCurenteItem | string> {
  let href: ActiveCurenteItem[] = await page.evaluate(() => (window as any).activecurente);
  let e: ActiveCurenteItem | string = '';

  while (href.length <= 0) {
    href = await page.evaluate(() => (window as any).activecurente);
  }

  console.log('activeCurenteSimbol');
  href.forEach((element: ActiveCurenteItem) => {
    if (element.simbol === simbol) {
      e = element;
      console.log('eeeeeeeeeee', e);
    }
  });
  return e;
}

export async function simboluriDetinute(page: Page): Promise<string> {
  const href: ActiveCurenteItem[] = await page.evaluate(() => (window as any).activecurente);
  const symbolsArray: string[] = href
    .filter((item: ActiveCurenteItem) => item.simbol !== 'RON')
    .map((item: ActiveCurenteItem) => item.simbol);

  console.log(symbolsArray);
  return symbolsArray[Math.floor(Math.random() * symbolsArray.length)];
}

export async function disponibil(page: Page): Promise<Record<string, number> | null> {
  await page.waitForTimeout(1000);
  const href: DisponibilResponse = await page.evaluate(() => {
    return new Promise((resolve) => {
      (window as any).sendJS({ cmd: 'disponibil' }, (ce: DisponibilResponse) => {
        resolve(ce);
      });
    });
  });

  const targets: DisponibilItem[] = href.data.reduce(
    (acc: DisponibilItem[], item: DisponibilItem) => {
      if (
        item.nume === 'Actiuni BVB RON' ||
        item.nume === 'Actiuni BVB EUR' ||
        item.nume === 'Actiuni INTL CAD' ||
        item.nume === 'Actiuni INTL GBP' ||
        item.nume === 'Actiuni INTL PLN' ||
        item.nume === 'Actiuni INTL EUR' ||
        item.nume === 'Actiuni INTL USD'
      ) {
        acc.push(item);
      }
      return acc;
    },
    []
  );

  const dispValues: Record<string, number> = targets.reduce(
    (acc: Record<string, number>, target: DisponibilItem) => {
      acc[target.cont] = target.disp;
      return acc;
    },
    {}
  );

  console.log('sold disponibil pt tranzactionare', dispValues);

  return Object.keys(dispValues).length > 0 ? dispValues : null;
}

export async function generateCNP(): Promise<string> {
  const s = faker.helpers.arrayElement(['1', '2']);
  const year = faker.number.int({ min: 50, max: 99 }).toString().padStart(2, '0');
  const month = faker.number.int({ min: 1, max: 12 }).toString().padStart(2, '0');
  const day = faker.number.int({ min: 1, max: 28 }).toString().padStart(2, '0');
  const county = faker.number.int({ min: 1, max: 52 }).toString().padStart(2, '0');
  const nnn = faker.number.int({ min: 1, max: 999 }).toString().padStart(3, '0');
  const control = faker.number.int({ min: 0, max: 9 });
  return `${s}${year}${month}${day}${county}${nnn}${control}`;
}

export async function generateSerie(): Promise<string> {
  const letters = faker.string.alpha({ length: 2, casing: 'upper' });
  const numbers = faker.string.numeric(6);
  return `${letters}${numbers}`;
}

export async function generateEmis(): Promise<string> {
  const sector = faker.number.int({ min: 1, max: 6 });
  return `SPCEP sector ${sector}`;
}

export async function generateOras(): Promise<string> {
  const cities = [
    'București',
    'Cluj-Napoca',
    'Timișoara',
    'Iași',
    'Constanța',
    'Brașov',
    'Sibiu',
    'Oradea',
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
  const banks = ['ING', 'BCR', 'BRD', 'Raiffeisen', 'Alpha Bank', 'CEC Bank', 'UniCredit'];
  return faker.helpers.arrayElement(banks);
}

export async function generateIBAN(banca: string): Promise<string> {
  const bankCodes: Record<string, string> = {
    ING: 'INGB',
    BCR: 'RNCB',
    BRD: 'BRDE',
    Raiffeisen: 'RZBR',
    'Alpha Bank': 'BUCU',
    'CEC Bank': 'CECE',
    UniCredit: 'BACX',
  };
  const code = bankCodes[banca] || 'XXXX';
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
  const fullName = faker.person.fullName().split(' ');
  const nume = fullName.slice(-1)[0];
  const prenume = fullName.slice(0, -1).join(' ');
  const email = faker.internet.email();
  const telefon = '072' + faker.string.numeric(3) + faker.string.numeric(4);
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
