import {
  test,
  expect,
  request,
  chromium,
  APIRequestContext,
  APIResponse,
  Browser,
  Page,
} from '@playwright/test';
import PortalTradingPage from '../../../src/pages/genericPages/portalTrading';

interface Account {
  tdvUserId: string;
  dltCode: string;
}

interface TransferRequest {
  amount: number;
  fromAccountType: string;
  toAccountType: string;
}

interface TransferResponse {
  records: any[];
  length: number;
}

interface JobResponse {
  id: string;
  state: 'RUNNING' | 'COMPLETED' | 'FAILED';
  name: string;
}

interface InstrumentUpdateRequest {
  active: boolean;
  base: string;
  quote: string;
}

interface FixSubscribeRequest {
  coin: string;
  currency: string;
}

interface TokenResult {
  token: string;
}

declare global {
  interface Window {
    usitok: (() => TokenResult) | TokenResult;
  }
}

let token: string = '';
const BASE_URL: string = 'https://crypto-dev.tradeville.ro';
const SUPPORTED_SYMBOLS: readonly string[] = [
  'BTC',
  'ETH',
  'USDT',
  'XRP',
  'SOL',
  'BNB',
  'Doge',
  'ADA',
] as const;

type SupportedSymbol = (typeof SUPPORTED_SYMBOLS)[number];

test.beforeEach(async (): Promise<void> => {
  const browser: Browser = await chromium.launch();
  const page: Page = await browser.newPage();
  const portalPage = new PortalTradingPage(page);
  await portalPage.gotoDirect('/portal/trading.htm');
  console.log('Token', token);

  token = await page.evaluate((): string => {
    const result = typeof window.usitok === 'function' ? window.usitok() : window.usitok;
    return result.token;
  });
  console.log('Token:', token);
  expect(token).toBeTruthy();
  await browser.close();
});

test.describe('Accounts', (): void => {
  test('[TC-4107] Get all customers from Postgres', async (): Promise<void> => {
    const apiContext: APIRequestContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        Accept: '*/*',
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const response: APIResponse = await apiContext.get('/accounts');
    expect(response.ok()).toBeTruthy();

    const responseBody: Account[] = await response.json();

    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);

    for (const account of responseBody) {
      expect(account).toHaveProperty('tdvUserId');
      expect(account).toHaveProperty('dltCode');

      expect(typeof account.tdvUserId).toBe('string');
      expect(typeof account.dltCode).toBe('string');

      const uuidRegex: RegExp =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (account.dltCode !== 'string') {
        expect(uuidRegex.test(account.dltCode)).toBeTruthy();
      }
    }

    await apiContext.dispose();
  });

  test('[TC-4108] Save a customer in Postgres', async (): Promise<void> => {
    const apiContext: APIRequestContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        Accept: '*/*',
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const requestBody: Partial<Account> = {
      dltCode: 'your-actual-dltCode-here',
      tdvUserId: 'your-actual-tdvUserId-here',
    };

    const response: APIResponse = await apiContext.post('/accounts', {
      data: requestBody,
    });

    expect(response.ok()).toBeTruthy();
    await apiContext.dispose();
  });

  test('[TC-4109] Get all account transfers', async (): Promise<void> => {
    const apiContext: APIRequestContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        Accept: '*/*',
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const response: APIResponse = await apiContext.get('/accounts/transfers');
    expect(response.ok()).toBeTruthy();

    const responseBody: any[] = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);

    await apiContext.dispose();
  });

  test('[TC-4110] Transfer funds between accounts', async (): Promise<void> => {
    const apiContext: APIRequestContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        Accept: '*/*',
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const requestBody: TransferRequest = {
      amount: 0,
      fromAccountType: 'crypto_usd',
      toAccountType: 'crypto_usd',
    };

    const response: APIResponse = await apiContext.post('/accounts/transfers', {
      data: requestBody,
    });

    expect(response.ok()).toBeTruthy();

    const responseBody: TransferResponse = await response.json();
    expect(Array.isArray(responseBody.records)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);

    await apiContext.dispose();
  });
});

test.describe('Historical Quotes', (): void => {
  test('[TC-4115] View all historical quotes in Postgres', async (): Promise<void> => {
    const apiContext: APIRequestContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        Accept: '*/*',
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const response: APIResponse = await apiContext.get('/historical-quotes');
    expect(response.ok()).toBeTruthy();

    const responseBody: any[] = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);

    await apiContext.dispose();
  });

  test('[TC-] View all CoinGecko coins', async (): Promise<void> => {
    const apiContext: APIRequestContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        Accept: '*/*',
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const response: APIResponse = await apiContext.get('/historical-quotes/coingecko');
    expect(response.ok()).toBeTruthy();

    const responseBody: any[] = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);

    await apiContext.dispose();
  });

  test('[TC-4116] Trigger refresh of quotes', async (): Promise<void> => {
    const apiContext: APIRequestContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        Accept: '*/*',
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const response: APIResponse = await apiContext.post('/historical-quotes/refresh');
    expect(response.ok()).toBeTruthy();

    const responseBody: any[] = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);

    await apiContext.dispose();
  });
});

test.describe('Instruments', (): void => {
  test('[TC-4117] View all tradable instruments', async (): Promise<void> => {
    const apiContext: APIRequestContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        Accept: '*/*',
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const response: APIResponse = await apiContext.get('/instruments');
    expect(response.ok()).toBeTruthy();

    const responseBody: any[] = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);

    await apiContext.dispose();
  });

  test('[TC-] Update tradable instrument active state', async (): Promise<void> => {
    const apiContext: APIRequestContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        Accept: '*/*',
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const requestBody: InstrumentUpdateRequest = {
      active: true,
      base: 'BTC/ETH',
      quote: 'USD',
    };

    const response: APIResponse = await apiContext.put('/instruments', {
      data: requestBody,
    });
    expect(response.ok()).toBeTruthy();

    const responseBody: any[] = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);

    await apiContext.dispose();
  });

  test('[TC-4118] Trigger a refresh of tradable instruments', async (): Promise<void> => {
    const apiContext: APIRequestContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        Accept: '*/*',
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const response: APIResponse = await apiContext.post('/instruments/refresh-requests');
    expect(response.status()).toBe(202);

    const responseBody: JobResponse = await response.json();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('state', 'RUNNING');
    expect(responseBody.name).toBe('refreshInstruments');

    await apiContext.dispose();
  });
});

test.describe('Market Data', (): void => {
  test('[TC-4119] Trigger a refresh of CoinMarketCap market data', async (): Promise<void> => {
    const apiContext: APIRequestContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        Accept: '*/*',
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const response: APIResponse = await apiContext.post('/market-data/fetch-requests');
    expect(response.status()).toBe(200);

    const responseBody: JobResponse = await response.json();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('state', 'RUNNING');
    expect(responseBody.name).toBe('refreshMarketData');

    await apiContext.dispose();
  });
});

test.describe('Web Sockets', (): void => {
  test('[TC-4120] Scavenge dead Websocket connections', async (): Promise<void> => {
    const apiContext: APIRequestContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        Accept: '*/*',
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const response: APIResponse = await apiContext.post('/ws/scavenge-requests');
    expect(response.ok()).toBeTruthy();

    const responseBody: TransferResponse = await response.json();
    expect(Array.isArray(responseBody.records)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);

    await apiContext.dispose();
  });
});

test.describe('Fix Protocol', (): void => {
  test('[TC-4124] Stop FalconX MD FIX connection', async (): Promise<void> => {
    const apiContext: APIRequestContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        Accept: '*/*',
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const response: APIResponse = await apiContext.get('/fix/market-data/stop');
    expect(response.ok()).toBeTruthy();

    const responseBody: TransferResponse = await response.json();
    expect(Array.isArray(responseBody.records)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);

    await apiContext.dispose();
  });

  test('[TC-] Start FalconX MD FIX connection', async (): Promise<void> => {
    const apiContext: APIRequestContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        Accept: '*/*',
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const response: APIResponse = await apiContext.get('/fix/market-data/start');
    expect(response.ok()).toBeTruthy();

    const responseBody: TransferResponse = await response.json();
    expect(Array.isArray(responseBody.records)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);

    await apiContext.dispose();
  });

  test('[TC-] Get order book from FalconX MD FIX protocol', async (): Promise<void> => {
    const apiContext: APIRequestContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        Accept: '*/*',
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const response: APIResponse = await apiContext.get('/fix/order-book', {
      params: {
        base: 'BTC',
        quote: 'USD',
      },
    });
    expect(response.ok()).toBeTruthy();

    const responseBody: TransferResponse = await response.json();
    expect(Array.isArray(responseBody.records)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);

    await apiContext.dispose();
  });

  test('[TC-] Save historical quotes', async (): Promise<void> => {
    const apiContext: APIRequestContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        Accept: '*/*',
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const response: APIResponse = await apiContext.post('/fix/save-historical-quotes');
    expect(response.ok()).toBeTruthy();

    const responseBody: TransferResponse = await response.json();
    expect(Array.isArray(responseBody.records)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);

    await apiContext.dispose();
  });

  test('[TC-] Subscribe FalconX MD FIX protocol', async (): Promise<void> => {
    const apiContext: APIRequestContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        Accept: '*/*',
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const requestBody: FixSubscribeRequest = {
      coin: 'BTC',
      currency: 'USD',
    };

    const response: APIResponse = await apiContext.post('/fix/subscribe-market-data', {
      data: requestBody,
    });
    expect(response.ok()).toBeTruthy();

    const responseBody: TransferResponse = await response.json();
    expect(Array.isArray(responseBody.records)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);

    await apiContext.dispose();
  });
});

test.describe('Jobs', (): void => {
  test('[TC-4121] Find all jobs since startup', async (): Promise<void> => {
    const apiContext: APIRequestContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        Accept: '*/*',
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const response: APIResponse = await apiContext.get('/jobs');
    expect(response.ok()).toBeTruthy();

    const responseBody: any[] = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);

    await apiContext.dispose();
  });

  test('[TC-4122] Find a job by job id', async (): Promise<void> => {
    const apiContext: APIRequestContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        Accept: '*/*',
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const response: APIResponse = await apiContext.get('/jobs/1');
    expect(response.ok()).toBeTruthy();

    const responseBody: TransferResponse = await response.json();
    expect(Array.isArray(responseBody.records)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);

    await apiContext.dispose();
  });

  test('[TC-4123] Cancel a job by job id', async (): Promise<void> => {
    const apiContext: APIRequestContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        Accept: '*/*',
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const response: APIResponse = await apiContext.delete('/jobs/1');
    expect(response.ok()).toBeTruthy();

    const responseBody: TransferResponse = await response.json();
    expect(Array.isArray(responseBody.records)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);

    await apiContext.dispose();
  });
});
