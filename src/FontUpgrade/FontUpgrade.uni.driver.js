import { baseUniDriverFactory } from '../../test/utils/unidriver';

export const FontUpgradeDriverFactory = base => {
  const baseFactory = baseUniDriverFactory(base);
  return {
    ...baseFactory,

    /**
     * Gets content base Testkit
     * @param {string} selector
     * @return {UniDriver}
     */
    getElement: selector => {
      return base.$(selector);
    },

    /**
     * Checks whether FontUpgrade is active
     * @return {Promise<boolean>}
     */
    isActive: async () => {
      const element = await baseFactory.element();
      return element.dataset.active === 'true';
    },
  };
};
