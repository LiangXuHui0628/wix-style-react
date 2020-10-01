import { BaseUniDriver } from 'wix-ui-test-utils/unidriver';

export interface CardFolderTabsUniDriver extends BaseUniDriver {
  getIsTabDisabledById(tabId: string): Promise<boolean>;
  selectTabById(tabId: string): Promise<void>;
}
