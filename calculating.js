const calcTransportTime = ({
  routeDistance,
  minutesPerHour,
  averageTransportSpeed,
}) => {
  return Number(
    ((routeDistance * minutesPerHour) / averageTransportSpeed).toFixed(2)
  );
};

const calcForkliftLaborPerOneWayTrip = ({
  minutesPerHour,
  loadingTime,
  forkliftLaborRate,
  unloadingTime,
}) => {
  return Number(
    (
      (forkliftLaborRate * (loadingTime + unloadingTime)) /
      minutesPerHour
    ).toFixed(2)
  );
};

const calcTruckDriverDH = ({
  minutesPerHour,
  transportTime,
  dropAndHookTime,
  truckDriverLaborRate,
}) => {
  return Number(
    (
      (truckDriverLaborRate * (dropAndHookTime + transportTime)) /
      minutesPerHour
    ).toFixed(2)
  );
};

const calcTruckDriverLL = ({
  truckDriverLaborRate,
  transportTime,
  loadingTime,
  unloadingTime,
  minutesPerHour,
}) => {
  return Number(
    (
      (truckDriverLaborRate * (transportTime + (loadingTime + unloadingTime))) /
      minutesPerHour
    ).toFixed(2)
  );
};

const calcProposedproposedForkliftLaborCostOneWay = ({
  forkliftLaborRate,
  botLoadAndUnloadTime,
  minutesPerHour,
}) => {
  return Number(
    ((forkliftLaborRate * botLoadAndUnloadTime * 2) / minutesPerHour).toFixed(2)
  );
};

const calcproposedTruckDriverCostOneWayOneWay = ({
  truckDriverLaborRate,
  transportTime,
  botLoadAndUnloadTime,
  minutesPerHour,
}) => {
  return Number(
    (
      (truckDriverLaborRate * (transportTime + botLoadAndUnloadTime * 2)) /
      minutesPerHour
    ).toFixed(2)
  );
};

const calcRoundTripsPerYear = ({ tripsPerDay, daysPerWeek, weeksPerYear }) => {
  return Number((tripsPerDay || 1) * daysPerWeek * weeksPerYear);
};

const calcForkliftLabotCostPerYear = ({
  returnTrips,
  forkliftLaborPerOneWayTrip,
  roundTripsPerYear,
}) => {
  if (returnTrips === 'true') {
    return Number(forkliftLaborPerOneWayTrip * roundTripsPerYear);
  }

  return Number(forkliftLaborPerOneWayTrip * 2 * roundTripsPerYear);
};

const calcTruckDriverLaborCostPerYear = ({
  returnTrips,
  unloadingStrategy,
  truckDriverDH,
  truckDriverLL,
  roundTripsPerYear,
}) => {
  if (returnTrips === 'false') {
    if (unloadingStrategy === 'live-load') {
      return Number((truckDriverLL * 2 * roundTripsPerYear).toFixed(2));
    }

    return Number((truckDriverDH * 2 * roundTripsPerYear).toFixed(2));
  }

  if (returnTrips === 'true') {
    if (unloadingStrategy === 'live-load') {
      return Number((truckDriverLL * roundTripsPerYear).toFixed(2));
    }

    return Number((truckDriverDH * 2 * roundTripsPerYear).toFixed(2));
  }
};

const calcProposedForkLiftLaborCostPerYear = ({
  proposedForkliftLaborCostOneWay,
  roundTripsPerYear,
}) => {
  return Number(
    (proposedForkliftLaborCostOneWay * 2 * roundTripsPerYear).toFixed(2)
  );
};

const calcProposedTruckDriverLaborCostPerYear = ({
  proposedTruckDriverCostOneWay,
  roundTripsPerYear,
}) => {
  return Number(
    (proposedTruckDriverCostOneWay * 2 * roundTripsPerYear).toFixed(2)
  );
};

const calcLaborCostTotal = ({
  forkliftLabotCostPerYear,
  truckDriverLaborCostPerYear,
}) => {
  return Number(
    (forkliftLabotCostPerYear + truckDriverLaborCostPerYear).toFixed(2)
  );
};

const calcProposedLaborCostTotal = ({
  proposedForkLiftLaborCostPerYear,
  proposedTruckDriverLaborCostPerYear,
}) => {
  return Number(
    (
      proposedForkLiftLaborCostPerYear + proposedTruckDriverLaborCostPerYear
    ).toFixed(2)
  );
};

const calcOneWayTripTimeLLMin = ({
  trailerDockingTime,
  loadingTime,
  unloadingTime,
  transportTime,
}) => {
  return Number(
    (trailerDockingTime + loadingTime + unloadingTime + transportTime).toFixed(
      2
    )
  );
};

const calcOneWayTripTimeDHMin = ({ dropAndHookTime, transportTime }) => {
  return Number((dropAndHookTime + transportTime).toFixed(2));
};

const calcProposedOneWayTripTimeMin = ({
  botLoadAndUnloadTime,
  trailerDockingTime,
  transportTime,
}) => {
  return Number(
    (
      botLoadAndUnloadTime +
      botLoadAndUnloadTime +
      trailerDockingTime +
      transportTime
    ).toFixed(2)
  );
};

const calcRoundTripTimeMin = ({
  returnTrips,
  unloadingStrategy,
  oneWayTripTimeLLMin,
  oneWayTripTimeDHMin,
  trailerDockingTime,
  transportTime,
}) => {
  if (returnTrips === 'false') {
    if (unloadingStrategy === 'live-load') {
      return Number((oneWayTripTimeLLMin + oneWayTripTimeLLMin).toFixed(2));
    }

    return Number((oneWayTripTimeDHMin + oneWayTripTimeDHMin).toFixed(2));
  }

  if (returnTrips === 'true') {
    if (unloadingStrategy === 'live-load') {
      return Number(
        (oneWayTripTimeLLMin + trailerDockingTime + transportTime).toFixed(2)
      );
    }

    return Number((oneWayTripTimeDHMin + oneWayTripTimeDHMin).toFixed(2));
  }
};

const calcProposedRoundTripTimeMin = ({ proposedOneWayTripTimeMin }) => {
  return Number((proposedOneWayTripTimeMin * 2).toFixed(2));
};

const calcMaxTrailersDayDock = ({
  unloadingStrategy,
  dockOeePercentage,
  minutesPerDay,
  siteOperationPercentage,
  loadingTime,
  unloadingTime,
  dropAndHookTime,
  dropAndHooksDoors,
}) => {
  const percentage1 = dockOeePercentage / 100;
  const percentage2 = siteOperationPercentage / 100;
  const mul = percentage1 * percentage2 * minutesPerDay;

  if (unloadingStrategy === 'drop-and-hook') {
    const max = Math.max(loadingTime, unloadingTime);
    const maxPlus = max + dropAndHookTime;
    const maxPlusMul = maxPlus * dropAndHooksDoors;

    return Math.round(mul / maxPlusMul);
  }

  if (unloadingStrategy === 'live-load') {
    return Math.round(mul / (loadingTime + unloadingTime));
  }

  return Number(); // 0
};

const calcProposedMaxTrailerDayDock = ({
  siteOperationPercentage,
  dockOeePercentage,
  minutesPerDay,
  botLoadAndUnloadTime,
  trailerDockingTime,
}) => {
  const percentage1 = dockOeePercentage / 100;
  const percentage2 = siteOperationPercentage / 100;

  return Math.round(
    (percentage1 * percentage2 * minutesPerDay) /
      (botLoadAndUnloadTime * 2 + trailerDockingTime)
  );
};

const calcDriverIdleTime = ({
  returnTrips,
  unloadingStrategy,
  dropAndHookTime,
  trailerDockingTime,
  loadingTime,
  unloadingTime,
}) => {
  if (returnTrips === 'false') {
    if (unloadingStrategy === 'drop-and-hook') {
      return Number(dropAndHookTime + dropAndHookTime);
    }

    return Number(loadingTime + loadingTime + unloadingTime + unloadingTime);
  }

  if (unloadingStrategy === 'drop-and-hook') {
    return Number(dropAndHookTime + trailerDockingTime);
  }

  return Number(loadingTime + unloadingTime);
};

// Result Calcs
const calcTotalReductionInLaborCost = ({
  laborCostTotal,
  proposedLaborCostTotal,
}) => {
  const calcResult = Math.round(
    ((laborCostTotal - proposedLaborCostTotal) / laborCostTotal) * 100
  );
  return calcResult > 0 ? calcResult : 0;
};

const calcReductionInDriverIdleTime = ({
  driverIdleTime,
  botLoadAndUnloadTime,
}) => {
  const calcResult = Math.round(
    ((driverIdleTime - botLoadAndUnloadTime * 4) / driverIdleTime) * 100
  );

  return calcResult > 0 ? calcResult : 0;
};

const calcIncreaseInDockThroughput = ({
  maxTrailersDayDock,
  proposedMaxTrailerDayDock,
}) => {
  const calcResult = Math.round(
    ((proposedMaxTrailerDayDock - maxTrailersDayDock) / maxTrailersDayDock) *
      100
  );

  return calcResult > 0 ? calcResult : 0;
};

const calcReductionInLeadTime = ({
  roundTripTimeMin,
  proposedRoundTripTimeMin,
}) => {
  const calcResult = Math.round(
    ((roundTripTimeMin - proposedRoundTripTimeMin) / roundTripTimeMin) * 100
  );

  return calcResult > 0 ? calcResult : 0;
};

// Init Calculating
export const calculating = ({
  formElements,
  formElementName,
  constantName,
  constantValue,
  resultElements,
}) => {
  // Forms Values
  const loadingTime = Number(formElements[formElementName.LoadTime].value);
  const unloadingTime = Number(formElements[formElementName.UnloadTime].value);
  const tripsPerDay = Number(formElements[formElementName.TripsPerDay].value);
  const routeDistance = Number(
    formElements[formElementName.RouteDistance].value
  );
  const unloadingStrategy =
    formElements[formElementName.UnloadingStrategy].value;
  const returnTrips = formElements[formElementName.ReturnTrips].value;

  // Constants Values
  const forkliftLaborRate = constantValue[constantName.ForkliftLaborRate];
  const truckDriverLaborRate = constantValue[constantName.TruckDriverLaborRate];
  const minutesPerHour = constantValue[constantName.MinutesPerHour];
  const minutesPerDay = constantValue[constantName.MinutesPerDay];
  const daysPerWeek = constantValue[constantName.DaysPerWeek];
  const weeksPerYear = constantValue[constantName.WeeksPerYear];
  const averageTransportSpeed =
    constantValue[constantName.AverageTransportSpeed];
  const dropAndHookTime = constantValue[constantName.DropAndHookTime];
  const trailerDockingTime = constantValue[constantName.TrailerDockingTime];
  const botLoadAndUnloadTime = constantValue[constantName.BotLoadAndUnloadTime];
  const dropAndHooksDoors = constantValue[constantName.DropAndHooksDoors];
  const assumedShiftsPerDay = constantValue[constantName.AssumedShiftsPerDay];
  // const siteOperationPercentage = constantValue[constantName.SiteOperationPercentage];
  const siteOperationPercentage = Math.round(
    ((7 * assumedShiftsPerDay) / 24) * 100
  );

  const dockOeePercentage = constantValue[constantName.DockOeePercentage];

  /* Calc Result */
  const transportTime = calcTransportTime({
    minutesPerHour,
    routeDistance,
    averageTransportSpeed,
  });

  const forkliftLaborPerOneWayTrip = calcForkliftLaborPerOneWayTrip({
    minutesPerHour,
    loadingTime,
    forkliftLaborRate,
    unloadingTime,
  });

  const truckDriverDH = calcTruckDriverDH({
    minutesPerHour,
    transportTime,
    dropAndHookTime,
    truckDriverLaborRate,
  });

  const truckDriverLL = calcTruckDriverLL({
    truckDriverLaborRate,
    transportTime,
    loadingTime,
    unloadingTime,
    minutesPerHour,
  });

  const proposedForkliftLaborCostOneWay =
    calcProposedproposedForkliftLaborCostOneWay({
      forkliftLaborRate,
      botLoadAndUnloadTime,
      minutesPerHour,
    });

  const proposedTruckDriverCostOneWay = calcproposedTruckDriverCostOneWayOneWay(
    {
      truckDriverLaborRate,
      transportTime,
      botLoadAndUnloadTime,
      minutesPerHour,
    }
  );

  const roundTripsPerYear = calcRoundTripsPerYear({
    tripsPerDay,
    daysPerWeek,
    weeksPerYear,
  });

  const forkliftLabotCostPerYear = calcForkliftLabotCostPerYear({
    returnTrips,
    forkliftLaborPerOneWayTrip,
    roundTripsPerYear,
  });

  const truckDriverLaborCostPerYear = calcTruckDriverLaborCostPerYear({
    returnTrips,
    unloadingStrategy,
    truckDriverDH,
    truckDriverLL,
    roundTripsPerYear,
  });

  const proposedForkLiftLaborCostPerYear = calcProposedForkLiftLaborCostPerYear(
    { proposedForkliftLaborCostOneWay, roundTripsPerYear }
  );

  const proposedTruckDriverLaborCostPerYear =
    calcProposedTruckDriverLaborCostPerYear({
      proposedTruckDriverCostOneWay,
      roundTripsPerYear,
    });

  const laborCostTotal = calcLaborCostTotal({
    forkliftLabotCostPerYear,
    truckDriverLaborCostPerYear,
  });

  const proposedLaborCostTotal = calcProposedLaborCostTotal({
    proposedForkLiftLaborCostPerYear,
    proposedTruckDriverLaborCostPerYear,
  });

  const oneWayTripTimeLLMin = calcOneWayTripTimeLLMin({
    trailerDockingTime,
    loadingTime,
    unloadingTime,
    transportTime,
  });

  const oneWayTripTimeDHMin = calcOneWayTripTimeDHMin({
    dropAndHookTime,
    transportTime,
  });

  const proposedOneWayTripTimeMin = calcProposedOneWayTripTimeMin({
    botLoadAndUnloadTime,
    trailerDockingTime,
    transportTime,
  });

  const roundTripTimeMin = calcRoundTripTimeMin({
    returnTrips,
    unloadingStrategy,
    oneWayTripTimeLLMin,
    oneWayTripTimeDHMin,
    trailerDockingTime,
    transportTime,
  });

  const proposedRoundTripTimeMin = calcProposedRoundTripTimeMin({
    proposedOneWayTripTimeMin,
  });

  const maxTrailersDayDock = calcMaxTrailersDayDock({
    unloadingStrategy,
    dockOeePercentage,
    minutesPerDay,
    siteOperationPercentage,
    loadingTime,
    unloadingTime,
    dropAndHookTime,
    dropAndHooksDoors,
  });

  const proposedMaxTrailerDayDock = calcProposedMaxTrailerDayDock({
    siteOperationPercentage,
    dockOeePercentage,
    minutesPerDay,
    botLoadAndUnloadTime,
    trailerDockingTime,
  });

  const driverIdleTime = calcDriverIdleTime({
    returnTrips,
    unloadingStrategy,
    dropAndHookTime,
    trailerDockingTime,
    loadingTime,
    unloadingTime,
  });

  // Results
  const totalReductionInLaborCost = calcTotalReductionInLaborCost({
    laborCostTotal,
    proposedLaborCostTotal,
  });

  const reductionInDriverIdleTime = calcReductionInDriverIdleTime({
    driverIdleTime,
    botLoadAndUnloadTime,
  });

  const increaseInDockThroughput = calcIncreaseInDockThroughput({
    maxTrailersDayDock,
    proposedMaxTrailerDayDock,
  });

  const reductionInLeadTime = calcReductionInLeadTime({
    roundTripTimeMin,
    proposedRoundTripTimeMin,
  });

  // Debugging Logs
  console.log(['calc params'], {
    formElements,
    formElementName,
    constantName,
    constantValue,
  });
  console.log('---CALCULATING---');
  console.log(['transportTime'], transportTime);
  console.log(['forkliftLaborPerOneWayTrip'], forkliftLaborPerOneWayTrip);
  console.log(['truckDriverDH'], truckDriverDH);
  console.log(['truckDriverLL'], truckDriverLL);
  console.log(
    ['proposedForkliftLaborCostOneWay'],
    proposedForkliftLaborCostOneWay
  );
  console.log(['proposedTruckDriverCostOneWay'], proposedTruckDriverCostOneWay);
  console.log(['roundTripsPerYear'], roundTripsPerYear);
  console.log(['forkliftLabotCostPerYear'], forkliftLabotCostPerYear);
  console.log(['truckDriverLaborCostPerYear'], truckDriverLaborCostPerYear);
  console.log(
    ['proposedForkLiftLaborCostPerYear'],
    proposedForkLiftLaborCostPerYear
  );
  console.log(
    ['proposedTruckDriverLaborCostPerYear'],
    proposedTruckDriverLaborCostPerYear
  );
  console.log(['laborCostTotal'], laborCostTotal);
  console.log(['proposedLaborCostTotal'], proposedLaborCostTotal);
  console.log(['oneWayTripTimeLLMin'], oneWayTripTimeLLMin);
  console.log(['oneWayTripTimeDHMin'], oneWayTripTimeDHMin);
  console.log(['proposedOneWayTripTimeMin'], proposedOneWayTripTimeMin);
  console.log(['roundTripTimeMin'], roundTripTimeMin);
  console.log(['proposedRoundTripTimeMin'], proposedRoundTripTimeMin);
  console.log(['maxTrailersDayDock'], maxTrailersDayDock);
  console.log(['proposedMaxTrailerDayDock'], proposedMaxTrailerDayDock);
  console.log(['driverIdleTime'], driverIdleTime);
  console.log('---RESULTS--');
  console.log(['totalReductionInLaborCost'], totalReductionInLaborCost);
  console.log(['reductionInDriverIdleTime'], reductionInDriverIdleTime);
  console.log(['increaseInDockThroughput'], increaseInDockThroughput);
  console.log(['reductionInLeadTime'], reductionInLeadTime);

  return {
    totalReductionInLaborCost,
    reductionInDriverIdleTime,
    increaseInDockThroughput,
    reductionInLeadTime,
  };
};
