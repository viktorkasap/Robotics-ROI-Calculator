const SLEEP_TIME = 350;

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const renderReductionInLaborCost = ({ el, value }) => {
  el.textContent = value;
};

const renderReductionInTruckIdleTime = ({ el, value }) => {
  el.textContent = value;
};

const renderIncreaseInDockThroughput = ({ el, value }) => {
  el.textContent = value;
};

const renderReductionInLeadTime = ({ el, value }) => {
  el.textContent = value;
};

const renderZero = ({
  isZero,
  damageReductionEl,
  safetyIncidentReductionEl,
}) => {
  damageReductionEl.textContent = isZero ? 0 : 40;
  safetyIncidentReductionEl.textContent = isZero ? 0 : 50;
};

const renderBodyAndFooter = async ({ bodyEl, footerEl }) => {
  await sleep(SLEEP_TIME);
  bodyEl.style.height = `${bodyEl.scrollHeight}px`;
  footerEl.style.height = `${footerEl.scrollHeight}px`;
};

const renderBoxes = async ({ boxesEls }) => {
  await sleep(SLEEP_TIME * 1.1);

  for (const box of boxesEls) {
    await sleep(SLEEP_TIME);
    box.style.opacity = 1;
  }
};

export const rendering = ({
  resultElements,
  totalReductionInLaborCost,
  reductionInDriverIdleTime,
  increaseInDockThroughput,
  reductionInLeadTime,
}) => {
  renderReductionInLaborCost({
    el: resultElements.laborCost,
    value: totalReductionInLaborCost,
  });

  renderReductionInTruckIdleTime({
    el: resultElements.idleTime,
    value: reductionInDriverIdleTime,
  });

  renderIncreaseInDockThroughput({
    el: resultElements.increaserInDock,
    value: increaseInDockThroughput,
  });

  renderReductionInLeadTime({
    el: resultElements.leadTime,
    value: reductionInLeadTime,
  });

  // Render Static Values
  const isZero = [
    totalReductionInLaborCost,
    reductionInDriverIdleTime,
    increaseInDockThroughput,
    reductionInLeadTime,
  ].every((value) => value <= 0);

  renderZero({
    isZero,
    damageReductionEl: resultElements.damageReduction,
    safetyIncidentReductionEl: resultElements.safetyIncidentReduction,
  });

  // Render Reveal
  let isRendered = false;

  if (!isRendered) {
    renderBodyAndFooter({
      bodyEl: resultElements.body,
      footerEl: resultElements.footer,
    });

    renderBoxes({ boxesEls: resultElements.boxes });

    isRendered = true;
  }
};
