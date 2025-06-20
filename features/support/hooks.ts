import { Before, After } from '@cucumber/cucumber';
import { CustomWorld } from './world';
import 'dotenv/config';

Before({timeout: 30000}, async function (this: CustomWorld) {
    await this.openBrowser();
});

After(async function (this: CustomWorld) {
    await this.closeBrowser();
});