import { expect, Page, Locator } from "@playwright/test";
import BasePage from "./page";

declare function removeHeaderOverlay(): void;

export default class PortalTradingPage extends BasePage {
  readonly page: Page;
  readonly cumparaButton: Locator;
  readonly cumparaButton1: Locator;
  readonly lansareOrdinButton: Locator;
  readonly butonAdaugareSubcont: Locator;
  readonly ordinNouButton: Locator;
  readonly pret: Locator;
  readonly pretIncrement: Locator;
  readonly valoareaOrdinului: Locator;
  readonly cantitate: Locator;
  readonly cantitateActiuni: Locator;
  readonly cantitateOrdin: Locator;
  readonly sumaOrdin: Locator;
  readonly fractionareSelect: Locator;
  readonly pageTitle: Locator;
  readonly tipOrdin: Locator;
  readonly cumparaVinde: Locator;
  readonly pretDirty: Locator;
  readonly pret2: Locator;
  readonly cumparaVindeButon: Locator;
  readonly lansareOrdin: Locator;
  readonly ordinComplex: Locator;
  readonly complexConditionat: Locator;
  readonly complexCantitate: Locator;
  readonly complexPretStop: Locator;
  readonly complexConfirmaOrdin: Locator;
  readonly complexLansareOrdin: Locator;
  readonly anuleazaOrdinButton: Locator;
  readonly complexInchide: Locator;
  readonly ordine: Locator;
  readonly complexBidAsk: Locator;
  readonly oferteParticipa: Locator;
  readonly cnpAD: Locator;
  readonly taraOrigineAD: Locator;
  readonly adresaAD: Locator;
  readonly orasAD: Locator;
  readonly judetAD: Locator;
  readonly taraAD: Locator;
  readonly bifaAD: Locator;
  readonly tipCiAD: Locator;
  readonly seriaAD: Locator;
  readonly dataEliberareAD: Locator;
  readonly dataExpirareAD: Locator;
  readonly eliberatDeAD: Locator;
  readonly cetateniaAD: Locator;
  readonly nationalitateaAD: Locator;
  readonly telefonAD: Locator;
  readonly numarInternationalAD: Locator;
  readonly emailAD: Locator;
  readonly speculativAD: Locator;
  readonly investitionalAD: Locator;
  readonly nivelStudiuAD: Locator;
  readonly ocupatiaAD: Locator;
  readonly domeniulActAD: Locator;
  readonly numeAngajator: Locator;
  readonly venitAnualAD: Locator;
  readonly suraVenitAD: Locator;
  readonly taraFiscalaAD: Locator;
  readonly numarFiscAD: Locator;
  readonly tara2FiscalaAD: Locator;
  readonly numarFisc2AD: Locator;
  readonly tara3FiscalaAD: Locator;
  readonly numarFisc3AD: Locator;
  readonly functiaPublicaDetinutaAD: Locator;
  readonly trimiteAD: Locator;
  readonly mesajSuccesAD: Locator;
  readonly parolaAD: Locator;
  readonly dateNumeAngajator: Locator;
  readonly dateTrimiteButon: Locator;
  readonly dropDownCont: Locator;
  readonly confirmaOrdin: Locator;
  readonly butonConfirmareAnulare: Locator;
  readonly butonInchideDetaliiOrdin: Locator;
  readonly checkboxLaPiata: Locator;
  readonly valabilitate: Locator;
  readonly totalCash: Locator;
  readonly selectSubcont: Locator;
  readonly pStop: Locator;
  readonly observatii: Locator;
  readonly meniu: Locator;
  readonly logoutPortal: Locator;
  readonly administrareSubconturi: Locator;
  readonly accountToggle: Locator;
  readonly fisaCont: Locator;
  readonly contulMeu: Locator;
  readonly conturiBancare: Locator;
  readonly conturiComis: Locator;
  readonly docScanate: Locator;
  readonly setari: Locator;
  readonly transferaCash: Locator;
  readonly suma: Locator;
  readonly transfera: Locator;
  readonly transferSubConturi: Locator;
  readonly adaugaSubCont: Locator;
  readonly subcontCuParola: Locator;
  readonly subcontFaraParola: Locator;
  readonly numeSubcont: Locator;
  readonly creatiSubcont: Locator;
  readonly adaugaSubcontLocator: Locator;
  readonly buttonSubcontFaraParola: Locator;
  readonly closeMeniu: Locator;
  readonly infoAlimentari: Locator;
  readonly portofoliu: Locator;
  readonly alerte: Locator;
  readonly liste: Locator;
  readonly numeSimbol: Locator;
  readonly butonListePredefinite: Locator;
  readonly searchField: Locator;
  readonly cookies: Locator;
  readonly numeSimbolCautat: Locator;
  readonly butonCumparaSimbol: Locator;
  readonly butonOrdinNou: Locator;
  readonly butonCumparaSimbolNormal: Locator;
  readonly butonOrdinNouNormal: Locator;
  readonly butonOrdinNouCumpara: Locator;
  readonly butonOrdinNouVinde: Locator;
  readonly campSumaOrdinNou: Locator;
  readonly campCantitateOrdinNou: Locator;
  readonly campPretOrdinNou: Locator;
  readonly campPretStopOrdinNou: Locator;
  readonly campDataConditieOrdinNou: Locator;
  readonly butonLansareOrdin: Locator;
  readonly butonConfirmaOrdin: Locator;
  readonly butonLansareOrdinFonduri: Locator;
  readonly confrimareOrdinOverlay: Locator;
  readonly bifaPrimaSubscriere: Locator;
  readonly minInitialBuyValue: Locator;
  readonly portalTradeVilleHome: Locator;
  readonly topPortofoliuHome: Locator;
  readonly campStareDetaliiOrdin: Locator;
  readonly campPretModificareOrdin: Locator;
  readonly campPretModificareOrdinSelector: string;
  readonly campCantitateModificareOrdin: Locator;
  readonly campCantitateModificareOrdinSelector: string;
  readonly campPretStopModificareOrdin: Locator;
  readonly campPretStopModificareOrdinSelector: string;
  readonly campConditieDataModificareOrdin: Locator;
  readonly campConditieDataModificareOrdinSelector: string;
  readonly butonModificareOrdin: Locator;
  readonly butonOkConfirmareOrdin: Locator;
  readonly butonAnulareOrdin: Locator;
  readonly butonAnulareOrdinFonduri: Locator;
  readonly homeTransferuri: Locator;
  readonly retrageriEroare: Locator;
  readonly eroareGenerala: Locator;
  readonly eroareSumaOrdin: Locator;
  readonly retrageriObservatii: Locator;
  readonly istoricTransferuriButonAnulare: Locator;
  readonly istoricTransferuriAnulare: Locator;
  readonly istoricTransferuri: Locator;
  readonly ceasPortal: Locator;
  readonly retrageriCereTransfer: Locator;
  readonly retrageriAdaugcontnouInformatii: Locator;
  readonly retrageriUploadExtrasdecont: Locator;
  readonly retrageriUploadSucces: Locator;
  readonly retrageriDinContul: Locator;
  readonly retrageriCatreContul: Locator;
  readonly retrageriSuma: Locator;
  readonly retrageriParola: Locator;
  readonly retrageriOperatiuniInformatii: Locator;
  readonly tradingPageIcon: Locator;
  readonly codClient: Locator;
  readonly butonDateFinanciare: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.cumparaButton = page.getByRole("button", { name: "Cumpara" });
    this.cumparaButton1 = page.locator(
      'button#trade[rol="cumparaSimbol"][onclick="ordin_nou(null,\'ask\')"][lz="cumpara"]'
    );
    this.lansareOrdinButton = page.locator("#bordnouportal");
    this.butonAdaugareSubcont = page.locator("div#adaugaSubcont");
    this.ordinNouButton = page.getByRole("button", { name: "Ordin nou" });
    this.pret = page.locator('input[name="pret"]');
    this.pretIncrement = page.getByText("+").nth(1);
    this.valoareaOrdinului = page.locator('span[gi="valord"][nrzec="2"].nr');
    this.cantitate = page.getByLabel("Suma:");
    this.cantitateActiuni = page.getByLabel("Cantitate:");
    this.cantitateOrdin = page.locator('input[name="cant"]');
    this.sumaOrdin = page.locator('input[name="suma_client"]');
    this.fractionareSelect = page.locator("#fractionareSelect");
    this.pageTitle = page.locator("title").first();
    this.tipOrdin = page.locator('select.styleord.input_style[name="tipord"]');
    this.cumparaVinde = page.locator("#cv");
    this.pretDirty = page.locator('span[gi="dirty"][nrzec="4"].nr');
    this.pret2 = page.locator('div.cta input[gi="pret"].input_style');
    this.cumparaVindeButon = page.locator("div.cta");
    this.lansareOrdin = page.getByRole("button", { name: "Lansare Ordin" });
    this.ordinComplex = page.getByRole("button", { name: "Ordin Complex" });
    this.complexConditionat = page.locator(
      'div[valoare="P"][id="tabConditionat"]'
    );
    this.complexCantitate = page.locator(
      'input[name="cant"].input_style[placeholder="0"][onkeyup="ordinComplexCantitate(this)"]'
    );
    this.complexPretStop = page.locator(
      'input[name="pret_stop"].input_style[placeholder="0"][onkeyup="ordinComplexPretStop(this)"]'
    );
    this.complexConfirmaOrdin = page.getByRole("button", {
      name: "Confirma Ordin",
    });
    this.complexLansareOrdin = page.getByRole("button", {
      name: "Lansare Ordin",
    });
    this.anuleazaOrdinButton = page.locator("button#anuleazaOrdin");
    this.complexInchide = page.locator("button#inchideOrdinComplex");
    this.ordine = page.locator('table#ordine tr td[gi="simbol"]');
    this.complexBidAsk = page.locator("#complexBidAsk");
    this.oferteParticipa = page.locator("#oferteParticipa");
    this.cnpAD = page.locator("input#cnp");
    this.taraOrigineAD = page.locator("input#taraOrigine");
    this.adresaAD = page.locator("input#adresa");
    this.orasAD = page.locator("input#oras");
    this.judetAD = page.locator("input#judet");
    this.taraAD = page.locator("input#tara");
    this.bifaAD = page.locator("input#bifa");
    this.tipCiAD = page.locator("select#tipCi");
    this.seriaAD = page.locator("input#seria");
    this.dataEliberareAD = page.locator("input#dataEliberare");
    this.dataExpirareAD = page.locator("input#dataExpirare");
    this.eliberatDeAD = page.locator("input#eliberatDe");
    this.cetateniaAD = page.locator("input#cetatenia");
    this.nationalitateaAD = page.locator("input#nationalitatea");
    this.telefonAD = page.locator("input#telefon");
    this.numarInternationalAD = page.locator("input#numarInternational");
    this.emailAD = page.locator("input#email");
    this.speculativAD = page.locator("input#speculativ");
    this.investitionalAD = page.locator("input#investitional");
    this.nivelStudiuAD = page.locator("input#nivelStudiu");
    this.ocupatiaAD = page.locator("input#ocupatia");
    this.domeniulActAD = page.locator("input#domeniulAct");
    this.numeAngajator = page.locator("input#numeAngajator");
    this.venitAnualAD = page.locator("input#venitAnual");
    this.suraVenitAD = page.locator("input#suraVenit");
    this.taraFiscalaAD = page.locator("input#taraFiscala");
    this.numarFiscAD = page.locator("input#numarFisc");
    this.tara2FiscalaAD = page.locator("input#tara2Fiscala");
    this.numarFisc2AD = page.locator("input#numarFisc2");
    this.tara3FiscalaAD = page.locator("input#tara3Fiscala");
    this.numarFisc3AD = page.locator("input#numarFisc3");
    this.functiaPublicaDetinutaAD = page.locator(
      "input#functiaPublicaDetinuta"
    );
    this.trimiteAD = page.locator("button#trimite");
    this.mesajSuccesAD = page.locator("#mesajSucces");
    this.parolaAD = page.locator("input#parola");

    this.dateNumeAngajator = page.locator("input#dateNumeAngajator");
    this.dateTrimiteButon = page.locator("button#dateTrimiteButon");
    this.dropDownCont = page.locator("select#dropDownCont");
    this.confirmaOrdin = page.locator("button#confirmaOrdin");
    this.butonConfirmareAnulare = page.locator("button#butonConfirmareAnulare");
    this.butonInchideDetaliiOrdin = page.locator(
      "button#butonInchideDetaliiOrdin"
    );
    this.cumparaVindeButon = page.locator("button#cumparaVindeButon");
    this.checkboxLaPiata = page.locator("input#checkboxLaPiata");
    this.valabilitate = page.locator("select#valabilitate");
    this.totalCash = page.locator("span#totalCash");
    this.selectSubcont = page.locator("select#selectSubcont");

    this.pStop = page.locator("input#pStop");
    this.observatii = page.locator("textarea#observatii");
    this.meniu = page.locator("div#meniu");
    this.logoutPortal = page.locator("button#logoutPortal");
    this.administrareSubconturi = page.locator("a#administrareSubconturi");
    this.accountToggle = page.locator("div#accountToggle");
    this.fisaCont = page.locator("div#fisaCont");
    this.contulMeu = page.locator("a#contulMeu");
    this.conturiBancare = page.locator("a#conturiBancare");
    this.conturiComis = page.locator("a#conturiComis");
    this.docScanate = page.locator("a#docScanate");
    this.setari = page.locator("a#setari");

    this.transferaCash = page.locator("button#transferaCash");
    this.suma = page.locator("input#suma");
    this.transfera = page.locator("button#transfera");

    this.transferSubConturi = page.locator("button#transferSubConturi");
    this.adaugaSubCont = page.locator("button#adaugaSubCont");
    this.subcontCuParola = page.locator("input#subcontCuParola");
    this.subcontFaraParola = page.locator("input#subcontFaraParola");
    this.numeSubcont = page.locator("input#numeSubcont");
    this.creatiSubcont = page.locator("button#creatiSubcont");
    this.adaugaSubcontLocator = page.locator("div#adaugaSubcontLocator");
    this.buttonSubcontFaraParola = page.locator(
      "button#buttonSubcontFaraParola"
    );
    this.closeMeniu = page.locator("button#closeMeniu");
    this.infoAlimentari = page.locator("div#infoAlimentari");
    this.portofoliu = page.locator("a#portofoliu");
    this.ordine = page.locator("a#ordine");
    this.alerte = page.locator("a#alerte");
    this.liste = page.locator("a#liste");
    this.numeSimbol = page.locator("input#numeSimbol");

    this.butonListePredefinite = page.locator("button#butonListePredefinite");
    this.searchField = page.locator("input#searchField");

    this.cookies = page.locator("div#cookies");
    this.numeSimbolCautat = page.locator("input#numeSimbolCautat");
    this.butonCumparaSimbol = page.getByRole("button", {
      name: "Cumpara Simbol",
    });
    this.butonOrdinNou = page.getByRole("button", { name: "Ordin Nou" });

    this.butonCumparaSimbolNormal = page.locator(
      "button#butonCumparaSimbolNormal"
    );
    this.butonOrdinNouNormal = page.locator("button#butonOrdinNouNormal");
    this.butonOrdinNouCumpara = page.locator("button#butonOrdinNouCumpara");
    this.butonOrdinNouVinde = page.locator("button#butonOrdinNouVinde");
    this.campSumaOrdinNou = page.locator("input#campSumaOrdinNou");
    this.campCantitateOrdinNou = page.locator("input#campCantitateOrdinNou");
    this.campPretOrdinNou = page.locator("input#campPretOrdinNou");
    this.campPretStopOrdinNou = page.locator("input#campPretStopOrdinNou");
    this.campDataConditieOrdinNou = page.locator(
      "input#campDataConditieOrdinNou"
    );
    this.butonLansareOrdin = page.getByRole("button", {
      name: "Lansare Ordin",
    });
    this.butonConfirmaOrdin = page.getByRole("button", {
      name: "Confirma Ordin",
    });
    this.butonLansareOrdinFonduri = page.getByRole("button", {
      name: "Lansare Ordin Fonduri",
    });
    this.confrimareOrdinOverlay = page.locator("div#confirmareOrdinOverlay");
    this.bifaPrimaSubscriere = page.locator("input#bifaPrimaSubscriere");

    this.minInitialBuyValue = page.locator("span#minInitialBuyValue");
    this.portalTradeVilleHome = page.locator("div#portalTradeVilleHome");
    this.topPortofoliuHome = page.locator("div#topPortofoliuHome");

    this.campStareDetaliiOrdin = page.locator("input#campStareDetaliiOrdin");
    this.campPretModificareOrdinSelector = "input#campPretModificareOrdin";
    this.campPretModificareOrdin = page.locator(
      this.campPretModificareOrdinSelector
    );

    this.campCantitateModificareOrdinSelector =
      "input#campCantitateModificareOrdin";
    this.campCantitateModificareOrdin = page.locator(
      this.campCantitateModificareOrdinSelector
    );

    this.campPretStopModificareOrdinSelector =
      "input#campPretStopModificareOrdin";
    this.campPretStopModificareOrdin = page.locator(
      this.campPretStopModificareOrdinSelector
    );

    this.campConditieDataModificareOrdinSelector =
      "input#campConditieDataModificareOrdin";
    this.campConditieDataModificareOrdin = page.locator(
      this.campConditieDataModificareOrdinSelector
    );

    this.butonModificareOrdin = page.locator("button#butonModificareOrdin");
    this.butonOkConfirmareOrdin = page.locator("button#butonOkConfirmareOrdin");
    this.butonAnulareOrdin = page.locator("button#butonAnulareOrdin");
    this.butonAnulareOrdinFonduri = page.locator(
      "button#butonAnulareOrdinFonduri"
    );
    this.homeTransferuri = page.locator("a#homeTransferuri");

    this.retrageriEroare = page.locator("div#retrageriEroare");
    this.eroareGenerala = page.locator("div#eroareGenerala");
    this.eroareSumaOrdin = page.locator("div#eroareSumaOrdin");
    this.retrageriObservatii = page.locator("textarea#retrageriObservatii");
    this.istoricTransferuriButonAnulare = page.locator(
      "button#istoricTransferuriButonAnulare"
    );
    this.istoricTransferuriAnulare = page.locator(
      "button#istoricTransferuriAnulare"
    );
    this.istoricTransferuri = page.locator("table#istoricTransferuri");
    this.ceasPortal = page.locator("div#ceasPortal");
    this.retrageriCereTransfer = page.locator("button#retrageriCereTransfer");
    this.retrageriAdaugcontnouInformatii = page.locator(
      "div#retrageriAdaugcontnouInformatii"
    );
    this.retrageriUploadExtrasdecont = page.locator(
      "input#retrageriUploadExtrasdecont"
    );
    this.retrageriUploadSucces = page.locator("div#retrageriUploadSucces");
    this.retrageriDinContul = page.locator("select#retrageriDinContul");
    this.retrageriCatreContul = page.locator("select#retrageriCatreContul");
    this.retrageriSuma = page.locator("input#retrageriSuma");
    this.retrageriParola = page.locator("input#retrageriParola");
    this.retrageriOperatiuniInformatii = page.locator(
      "div#retrageriOperatiuniInformatii"
    );
    this.tradingPageIcon = page.locator("div#tradingPageIcon");
    this.codClient = page.locator("span#codClient");
    this.butonDateFinanciare = page.locator("button#butonDateFinanciare");
  }

  adresaResedintaDaNu(option: "da" | "nu"): Locator {
    return this.page.locator(`label:has-text("${option}") input[type="radio"]`);
  }

  persoanaExpusaPublicAD(option: "DA" | "NU"): Locator {
    if (option === "NU") {
      return this.page.locator(`input#rbPoliticallyExposedNo`);
    } else {
      return this.page.locator(`input#rbPoliticallyExposedYes`);
    }
  }

  beneficiarRealAD(option: "da" | "nu"): Locator {
    return this.page.locator(
      `.rboption-danu label:has-text("${option}") input[type="radio"]`
    );
  }

  investitorCompensabilAD(option: "da" | "nu"): Locator {
    return this.page.locator(
      `.rboption-danu label:has-text("${option} ") input[type="radio"]`
    );
  }

  cetateanSUA(option: 0 | 1): Locator {
    return this.page.locator(
      `.rboption-danu label[for="persSUA_${option}"] input[type="radio"]`
    );
  }

  async gotoSimbol(simbol = "TLV"): Promise<void> {
    await this.page.route(
      "https://a.omappapi.com/app/campaign-views/64951b277405/rn1ej1hso0gofby4r8ig/53352a7208df70231436ed04d910f079-optin.json",
      (route) => route.abort()
    );
    await this.page.route(/(json)$/, (route) => route.abort());
    await this.page.goto(
      `${process.env.PORTAL_URL}/portal/trading.htm?upperLeft=lista&simbol=${simbol}`
    );
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(2000);

    if (await this.page.locator("form.login_form").isVisible()) {
      await this.inputUserLogareSesiuneExpirata.fill(
        process.env.PORTAL_USERNAME!
      );
      await this.inputParolaLogareSesiuneExpirata.type(
        process.env.PORTAL_PASSWORD!,
        { noWaitAfter: true }
      );
      await this.butonLogareSesiuneExpirata.click();
      await this.page.waitForLoadState("networkidle");
      await this.page.waitForTimeout(2000);

      await this.page.evaluate(() => localStorage.setItem("testing_auto", "1"));
      await this.page.context().storageState({ path: "state.json" });
    }

    const expectedTitle =
      process.env.ENV === "beta"
        ? "webdevS - Portal Trading"
        : "Portal Trading";
    expect(await this.pageTitle.textContent()).toBe(expectedTitle);

    await this.page.addLocatorHandler(
      this.page.locator("div.header_overlay"),
      async () => {
        await this.page.evaluate(() => removeHeaderOverlay());
      }
    );
  }

  async gotoTradeville(): Promise<void> {
    await this.page.goto(`${process.env.URL_LOGIN}`);
    await this.page.waitForTimeout(2000);
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForLoadState("networkidle");
    await this.page.addLocatorHandler(
      this.page.locator("div.header_overlay"),
      async () => {
        await this.page.evaluate(() => removeHeaderOverlay());
      }
    );
  }

  async goTo(): Promise<void> {
    await this.page.goto(`${process.env.PORTAL_URL}`);
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(2000);

    if (await this.page.locator("form.login_form").isVisible()) {
      await this.inputUserLogareSesiuneExpirata.fill(
        process.env.PORTAL_USERNAME!
      );
      await this.inputParolaLogareSesiuneExpirata.type(
        process.env.PORTAL_PASSWORD!,
        { noWaitAfter: true }
      );
      await this.butonLogareSesiuneExpirata.click();
      await this.page.waitForLoadState("networkidle");
      await this.page.waitForTimeout(2000);

      await this.page.evaluate(() => localStorage.setItem("testing_auto", "1"));
      await this.page.context().storageState({ path: "state.json" });
    }

    await this.page.waitForSelector('span[id="elemceasPortal"]', {
      state: "visible",
    });

    await this.page.addLocatorHandler(
      this.page.locator("div.header_overlay"),
      async () => {
        await this.page.evaluate(() => removeHeaderOverlay());
      }
    );
  }
}
