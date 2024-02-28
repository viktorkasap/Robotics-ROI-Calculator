// Build Constants Nodes

export const constantsValues = () => {
  const CONSTANT = {
    ForkliftLaborRate: 'forklift-labor-rate',
    TruckDriverLaborRate: 'truck-driver-labor-rate',
    MinutesPerHour: 'minutes-per-hour',
    MinutesPerDay: 'minutes-per-day',
    DaysPerWeek: 'days-per-week',
    WeeksPerYear: 'weeks-per-year',
    AverageTransportSpeed: 'average-transport-speed',
    DropAndHookTime: 'drop-and-hook-time',
    TrailerDockingTime: 'trailer-docking-time',
    BotLoadAndUnloadTime: 'bot-load-and-unload-time',
    DropAndHooksDoors: 'drop-and-hooks-doors',
    AssumedShiftsPerDay: 'assumed-shifts-per-day',
    SiteOperationPercentage: 'site-operation-percentage',
    DockOeePercentage: 'dock-oee-percentage',
  };

  const getConstantsValues = (ids) => {
    return ids.reduce((constants, currentId) => {
      const element = document.getElementById(currentId);
      const elementContent = element.textContent;
      const elementValue = Boolean(elementContent) ? Number(elementContent) : 1;

      return {
        ...constants,
        [currentId]: elementValue,
      };
    }, {});
  };

  return {
    constantName: CONSTANT,
    constantValue: getConstantsValues(Object.values(CONSTANT)),
  };
};
