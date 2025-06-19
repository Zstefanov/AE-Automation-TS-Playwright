import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { UserActions } from '../../helpers/userCreation';

// SHARED: Register a new user
// All steps are in the common_steps.ts file
