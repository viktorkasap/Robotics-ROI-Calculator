// Form Elements
export const getFormElements = (formId) => {
  const FORM_ELEMENT_NAME = {
    LoadTime: 'Load-Time',
    UnloadTime: 'Unload-Time',
    TripsPerDay: 'Trips-Per-Day',
    RouteDistance: 'Route-Distance',
    UnloadingStrategy: 'Unloading-Strategy',
    ReturnTrips: 'Return-Trips',
  };

  const form = document.getElementById(formId);

  const formElements = Object.values(form).reduce(
    (elements, currentElement) => {
      return { ...elements, [currentElement.id]: currentElement };
    },
    {}
  );

  return {
    formElementName: FORM_ELEMENT_NAME,
    formElements,
  };
};
