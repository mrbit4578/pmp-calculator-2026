const { chromium } = require('playwright');
const path = require('path');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const filePath = 'file:///' + path.resolve(__dirname, 'pmp-calculator.html').replace(/\\/g, '/');
  await page.goto(filePath);

  let passed = 0;
  let total = 0;
  const failures = [];

  function assertVal(tab, tag, actual, expected, tol = 1e-4) {
    total++;
    if (typeof expected === 'number') {
      const actNum = parseFloat(actual);
      if (isNaN(actNum) || Math.abs(actNum - expected) > tol) {
        failures.push(`TAB ${tab} ${tag} EXPECTED=${expected} GOT=${actual}`);
        return;
      }
    } else {
      if (String(actual).trim() !== String(expected).trim()) {
        failures.push(`TAB ${tab} ${tag} EXPECTED=${expected} GOT=${actual}`);
        return;
      }
    }
    passed++;
  }

  async function getTagVal(tabNum, tag) {
    const el = await page.$(`#tab-${tabNum}-output [data-tag="${tag}"]`);
    if (!el) return 'NOT_FOUND';
    const text = await el.innerText();
    const parts = text.split('=');
    return parts[parts.length - 1].trim();
  }

  // T1: EVM
  await page.click('#tab-btn-1');
  await page.fill('#evm-ev', '400');
  await page.fill('#evm-ac', '500');
  await page.fill('#evm-pv', '600');
  await page.fill('#evm-bac', '1000');
  await page.click('#btn-compute-1');
  assertVal(1, 'CV', await getTagVal(1, 'CV'), -100);
  assertVal(1, 'SV', await getTagVal(1, 'SV'), -200);
  assertVal(1, 'CPI', await getTagVal(1, 'CPI'), 0.8);
  assertVal(1, 'SPI', await getTagVal(1, 'SPI'), 0.6667);
  assertVal(1, 'EAC_CPI', await getTagVal(1, 'EAC_CPI'), 1250);
  assertVal(1, 'ETC', await getTagVal(1, 'ETC'), 750);
  assertVal(1, 'TCPI_BAC', await getTagVal(1, 'TCPI_BAC'), 1.2);

  // T2: CPM
  await page.click('#tab-btn-2');
  await page.fill('#cpm-name-0', 'A'); await page.fill('#cpm-dur-0', '3'); await page.fill('#cpm-pred-0', '-');
  await page.fill('#cpm-name-1', 'B'); await page.fill('#cpm-dur-1', '4'); await page.fill('#cpm-pred-1', 'A');
  await page.fill('#cpm-name-2', 'C'); await page.fill('#cpm-dur-2', '2'); await page.fill('#cpm-pred-2', 'A');
  await page.fill('#cpm-name-3', 'D'); await page.fill('#cpm-dur-3', '5'); await page.fill('#cpm-pred-3', 'B,C');
  await page.click('#btn-compute-2');
  assertVal(2, 'dur', await getTagVal(2, 'dur'), 12);
  assertVal(2, 'path', await getTagVal(2, 'path'), 'A->B->D');
  assertVal(2, 'C.TF', await getTagVal(2, 'C.TF'), 2);

  // T3: Cost
  await page.click('#tab-btn-3');
  await page.fill('#cost-planned', '1000');
  await page.fill('#cost-actual', '500');
  await page.fill('#cost-ev', '400');
  await page.fill('#cost-budget', '1000');
  await page.fill('#cost-avail', '200');
  await page.fill('#cost-used', '150');
  await page.click('#btn-compute-3');
  assertVal(3, 'CV', await getTagVal(3, 'CV'), -100);
  assertVal(3, 'CPI', await getTagVal(3, 'CPI'), 0.8);
  assertVal(3, 'BV', await getTagVal(3, 'BV'), 500);
  assertVal(3, 'EAC', await getTagVal(3, 'EAC'), 1250);
  assertVal(3, 'RU%', await getTagVal(3, 'RU%'), 75);

  // T4: Quality
  await page.click('#tab-btn-4');
  await page.fill('#qual-defects', '50');
  await page.fill('#qual-units', '1000');
  await page.fill('#qual-opps', '4');
  await page.fill('#qual-good', '950');
  await page.fill('#qual-total', '1000');
  await page.fill('#qual-prev', '100');
  await page.fill('#qual-appr', '200');
  await page.fill('#qual-int', '50');
  await page.fill('#qual-ext', '30');
  await page.click('#btn-compute-4');
  assertVal(4, 'DD', await getTagVal(4, 'DD'), 0.05);
  assertVal(4, 'DPMO', await getTagVal(4, 'DPMO'), 12500);
  assertVal(4, 'Yield%', await getTagVal(4, 'Yield%'), 95);
  assertVal(4, 'CoQ', await getTagVal(4, 'CoQ'), 380);

  // T5: Risk
  await page.click('#tab-btn-5');
  await page.fill('#risk-prob', '0.3');
  await page.fill('#risk-impact', '10000');
  await page.fill('#risk-pairs', '0.3,1000;0.5,2000');
  await page.fill('#risk-sev', '8');
  await page.fill('#risk-occ', '5');
  await page.fill('#risk-det', '2');
  await page.fill('#risk-tree', 'A,0.6,10000;B,0.4,-2000');
  await page.click('#btn-compute-5');
  assertVal(5, 'RE', await getTagVal(5, 'RE'), 3000);
  assertVal(5, 'EMV', await getTagVal(5, 'EMV'), 1300);
  assertVal(5, 'RPN', await getTagVal(5, 'RPN'), 80);
  assertVal(5, 'DT_EV', await getTagVal(5, 'DT_EV'), 5200);

  // T6: Procurement
  await page.click('#tab-btn-6');
  await page.fill('#proc-price', '5000');
  await page.fill('#proc-maint', '200');
  await page.fill('#proc-oper', '300');
  await page.fill('#proc-yrs', '5');
  await page.fill('#proc-mfix', '2000');
  await page.fill('#proc-mvar', '4');
  await page.fill('#proc-units', '1000');
  await page.fill('#proc-del', '95');
  await page.fill('#proc-com', '100');
  await page.click('#btn-compute-6');
  assertVal(6, 'TCO', await getTagVal(6, 'TCO'), 7500);
  assertVal(6, 'MAKE', await getTagVal(6, 'MAKE'), 6000);
  assertVal(6, 'BUY', await getTagVal(6, 'BUY'), 5000);
  assertVal(6, 'Decision', await getTagVal(6, 'Decision'), 'BUY');
  assertVal(6, 'SPI', await getTagVal(6, 'SPI'), 0.95);

  // T7: Stakeholder
  await page.click('#tab-btn-7');
  await page.fill('#stkh-inf', '4');
  await page.fill('#stkh-int', '5');
  await page.fill('#stkh-imp', '8');
  await page.fill('#stkh-eng', '0.75');
  await page.click('#btn-compute-7');
  assertVal(7, 'quadrant', await getTagVal(7, 'quadrant'), 'High/High');
  assertVal(7, 'SII', await getTagVal(7, 'SII'), 20);
  assertVal(7, 'EI', await getTagVal(7, 'EI'), 6);

  // T8: Communication
  await page.click('#tab-btn-8');
  await page.fill('#comm-n', '10');
  await page.fill('#comm-clar', '0.9');
  await page.fill('#comm-fb', '0.8');
  await page.fill('#comm-sent', '1000');
  await page.fill('#comm-proc', '800');
  await page.click('#btn-compute-8');
  assertVal(8, 'CH', await getTagVal(8, 'CH'), 45);
  assertVal(8, 'Eff', await getTagVal(8, 'Eff'), 0.72);
  assertVal(8, 'Effi', await getTagVal(8, 'Effi'), 0.8);
  assertVal(8, 'OI', await getTagVal(8, 'OI'), 1.25);

  // T9: Benefit
  await page.click('#tab-btn-9');
  await page.fill('#ben-init', '10000');
  await page.fill('#ben-rate', '0.10');
  await page.fill('#ben-cf', '3000,4000,5000,2000');
  await page.click('#btn-compute-9');
  assertVal(9, 'ROI', await getTagVal(9, 'ROI'), 40);
  assertVal(9, 'BCR', await getTagVal(9, 'BCR'), 1.4);
  assertVal(9, 'Payback', await getTagVal(9, 'Payback'), 2.6);
  assertVal(9, 'NPV', await getTagVal(9, 'NPV'), 396.6381);

  // T10: PERT
  await page.click('#tab-btn-10');
  await page.fill('#pert-o', '2');
  await page.fill('#pert-m', '5');
  await page.fill('#pert-p', '14');
  await page.click('#btn-compute-10');
  assertVal(10, 'BetaMean', await getTagVal(10, 'BetaMean'), 6);
  assertVal(10, 'BetaSD', await getTagVal(10, 'BetaSD'), 2);
  assertVal(10, 'BetaVar', await getTagVal(10, 'BetaVar'), 4);
  assertVal(10, 'TriMean', await getTagVal(10, 'TriMean'), 7);
  assertVal(10, 'TriSD', await getTagVal(10, 'TriSD'), 2.5495);

  // T11: NPV/Finance
  await page.click('#tab-btn-11');
  await page.fill('#fin-rate', '0.10');
  await page.fill('#fin-cf', '-10000,3000,4000,5000,2000');
  await page.click('#btn-compute-11');
  assertVal(11, 'NPV', await getTagVal(11, 'NPV'), 396.6381);
  assertVal(11, 'IRR', await getTagVal(11, 'IRR'), 0.1435);
  assertVal(11, 'Payback', await getTagVal(11, 'Payback'), 2.6);

  await browser.close();

  failures.forEach(f => console.log(f));
  if (failures.length === 0) {
    console.log(`PASS ${passed}/${total}`);
  } else {
    console.log(`FAIL ${passed}/${total}`);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

