// Build Results Nodes
export const getResultsElements = (root, elementsSelectors) => {
  return Object.entries(elementsSelectors).reduce(
    (elements, currentSelector) => {
      const [key, value] = currentSelector;

      const nodeElement = value?.many
        ? root.querySelectorAll(value.selector)
        : root.querySelector(value.selector);

      return { ...elements, [key]: nodeElement };
    },
    {}
  );
};
