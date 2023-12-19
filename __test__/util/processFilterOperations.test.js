const t = require("tap");
const processFilterOperations = require("../../src/server/util/processFilterOperations");

t.test("should return date filter operation with $gte and $lte", async (t) => {
  const from = ["2023-12-20", "$gte"];
  const to = ["2024-12-20", "$lte"];

  const dateFilter = processFilterOperations([from, to]);
  t.ok(dateFilter.date, "returned date filter");
  t.match(dateFilter.date, {
    $gte: "2023-12-20T00:00:00.000Z",
    $lte: "2024-12-20T00:00:00.000Z",
  });
});

t.test("should return date filter operation with $gte", async (t) => {
  const from = ["2023-12-20", "$gte"];
  const to = [undefined, "$lte"];

  const dateFilter = processFilterOperations([from, to]);
  t.ok(dateFilter.date, "returned date filter");
  t.match(dateFilter.date, {
    $gte: "2023-12-20T00:00:00.000Z",
  });
});

t.test("should return date filter operation with $lte", async (t) => {
  const from = [undefined, "$gte"];
  const to = ["2024-12-20", "$lte"];

  const dateFilter = processFilterOperations([from, to]);
  t.ok(dateFilter.date, "returned date filter");
  t.match(dateFilter.date, {
    $lte: "2024-12-20T00:00:00.000Z",
  });
});

t.test("should return undefined", async (t) => {
  const from = [undefined, "$gte"];
  const to = [undefined, "$lte"];

  const dateFilter = processFilterOperations([from, to]);
  t.match(dateFilter, undefined);
});
