import { test, expect, BrowserContext, Page } from "@playwright/test";
import PageDeschidereCont from "../pages/deschidereCont";
import { generateFakeProfile } from "../../../src/utils/functions";
import { faker } from "@faker-js/faker/dist/locale/en";

test.describe("Teste deschidere cont", { tag: ["@deschidereCont"] }, () => {
  test.describe.configure({ mode: "serial", timeout: 60000 });

  let context: BrowserContext;
  let pageDeschidereCont: PageDeschidereCont;
  let page: Page;
  let nume: string;
  let prenume: string;
  let email: string;
  let telefon: string;
  let cnp: string;
  let serie: string;
  let emis: string;
  let oras: string;
  let adresa: string;
  let banca: string;
  let iban: string;

  test.beforeEach(async ({ browser }) => {
    const profile = await generateFakeProfile();

    nume = profile.nume;
    prenume = profile.prenume;
    email = profile.email;
    telefon = profile.telefon;
    cnp = profile.cnp;
    serie = profile.serie;
    emis = profile.emis;
    oras = profile.oras;
    adresa = profile.adresa;
    banca = profile.banca;
    iban = profile.iban;

    context = await browser.newContext({
      ignoreHTTPSErrors: true,
    });
    page = await context.newPage();

    aplicPage = new AplicPage(page);
    pageDeschidereCont = new PageDeschidereCont(page);

    await page.goto("https://www.tradeville.ro");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(3000);

    await pageDeschidereCont.butonDeschidereCont.click();
    await expect(pageDeschidereCont.chenarCompletareDate).toBeVisible({
      timeout: 10000,
    });
  });

  test("Complete form steps and validate localStorage & WebSocket data", async () => {
    console.log("Bife completare date cont");
    // Step 1: Bife completare date cont
    await pageDeschidereCont.checkbox.nth(0).check();
    await pageDeschidereCont.checkbox.nth(1).check();
    await pageDeschidereCont.nextButton.click();

    // Step 2: Email & telefon
    await pageDeschidereCont.fillContactInfo(`test_${email}`, telefon);
    await pageDeschidereCont.nextButton.click();

    expect(await pageDeschidereCont.chenarAbonare).toBeVisible({
      timeout: 10000,
    });

    // Step 3: "Nu ma abonez"
    await pageDeschidereCont.doNotSubscribeBtn.click();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(5000);

    let guidValue: string | null = null;
    page.on("websocket", (ws) => {
      ws.on("framereceived", async (frame) => {
        try {
          const message = JSON.parse(frame.payload);
          if (message.cmd === "desccont" && message.prm?.json) {
            const jsonData = JSON.parse(message.prm.json);
            if (jsonData.guid) {
              guidValue = jsonData.guid;
              console.log("GUID found in WebSocket response:", guidValue);
            }
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      });
    });

    await page.waitForTimeout(5000);
    expect(guidValue).not.toBeNull();
  });
});
