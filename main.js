import { calculating } from './calculating';
import { getFormElements } from './form';
import { constantsValues } from './constants-values';
import { getResultsElements } from './result';
import { rendering } from './render';

const init = () => {
  /* Constants Model */
  const { constantName, constantValue } = constantsValues();

  /* Form Model */
  const { formElementName, formElements } = getFormElements(
    'wf-form-Roi-Calculator'
  );

  /* Result Model */
  const RESULT_PREFIX = 'data-calc-result';
  const resultRoot = document.querySelector(`[${RESULT_PREFIX}="Root"]`);
  const resultElementsSelectors = {
    body: { selector: `[${RESULT_PREFIX}="Body"]` },
    boxes: { many: true, selector: `[${RESULT_PREFIX}="Box"]` },
    laborCost: { selector: `[${RESULT_PREFIX}="Labor-Cost"]` },
    idleTime: { selector: `[${RESULT_PREFIX}="Truck-Idle"]` },
    increaserInDock: { selector: `[${RESULT_PREFIX}="Increase-In-Dock"]` },
    leadTime: { selector: `[${RESULT_PREFIX}="Lead-Time"]` },
    damageReduction: { selector: `[${RESULT_PREFIX}="Damage-Reduction"]` },
    safetyIncidentReduction: {
      selector: `[${RESULT_PREFIX}="Safety-Incident-Reduction"]`,
    },
    footer: { selector: `[${RESULT_PREFIX}="Footer"]` },
  };
  const resultElements = {
    resultRoot,
    ...getResultsElements(resultRoot, resultElementsSelectors),
  };

  // Calculator Controller (Invokes Render View)
  formElements['Roi-Calculator-Submit'].addEventListener('click', (e) => {
    // Prevent Form Submission
    e.preventDefault();

    // Init Calculating (calc and render)
    const {
      totalReductionInLaborCost,
      reductionInDriverIdleTime,
      increaseInDockThroughput,
      reductionInLeadTime,
    } = calculating({
      formElements,
      formElementName,
      constantName,
      constantValue,
    });

    // Rendering
    rendering({
      resultElements,
      totalReductionInLaborCost,
      reductionInDriverIdleTime,
      increaseInDockThroughput,
      reductionInLeadTime,
    });
  });
};

init();
