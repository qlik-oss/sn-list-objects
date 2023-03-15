/* eslint-disable no-console */
const logLevels = {
  info: 0,
  log: 1,
  warn: 2,
  error: 3,
};

export default ({ logLevel: defaultLogLevel = 'warn' } = {}) => {
  let currentLogLevel = logLevels[defaultLogLevel];

  async function consoleEvent(msg) {
    if (logLevels[msg.type()] >= currentLogLevel) {
      const resolvedArgs = await Promise.all(msg.args().map((arg) => arg.jsonValue()));
      console[msg.type()](...resolvedArgs);
    }
  }

  function pageerrorEvent(msg) {
    console.error(msg);
  }

  return {
    addListeners(page) {
      page.on('console', consoleEvent);
      page.on('pageerror', pageerrorEvent);
    },
    removeListeners(page) {
      page.removeListener('console', consoleEvent);
      page.removeListener('pageerror', pageerrorEvent);
    },
    setLogLevel(logLevel) {
      currentLogLevel = logLevels[logLevel];
    },
  };
};
