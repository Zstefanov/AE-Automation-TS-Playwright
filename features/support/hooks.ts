import { Before, After } from '@cucumber/cucumber';
import { CustomWorld } from './world';
import 'dotenv/config';

Before(async function (this: CustomWorld) {
    await this.openBrowser();
});

After(async function (this: CustomWorld) {
    await this.closeBrowser();
});