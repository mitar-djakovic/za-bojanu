import { Router } from 'express';

import signUp from './signUp';
import logIn from './logIn';

const routes = Router().use(signUp).use(logIn)

export default Router().use('/api', routes);