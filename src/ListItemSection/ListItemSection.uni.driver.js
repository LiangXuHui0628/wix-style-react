import { baseUniDriverFactory, findByHook } from '../../test/utils/unidriver';
import { dataHooks } from './constants';

export const listItemSectionDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),

    /**
     * Get title Text
     * @return {Promise<string>}
     */
    getTitle: () => findByHook(base, dataHooks.TITLE).text(),

    /**
     * Gets suffix
     * @return {BaseUniDriver<any>}
     */
    getSuffix: () => findByHook(base, dataHooks.SUFFIX),

    /**
     * Checks whether a node with the provided predicate exist
     * @param {string} predicate - a predicate for the child node
     * @returns {Promise<boolean>}
     */
    childExists: async predicate => base.$(predicate).exists(),
  };
};
