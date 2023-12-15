"use strict";

const processFilterOperations = (arg) => {
  const operation = arg
    .map(([value, key]) => value && { [key]: new Date(value).toISOString() })
    .filter((val) => val != undefined);
  return operation.length > 0 ? { date: { ...operation[0], ...operation[1] } } : undefined;
};

module.exports = processFilterOperations;
module.exports.processFilterOperations = processFilterOperations;
