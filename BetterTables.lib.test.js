const betterTablesLib = require('./BetterTables.lib.js');
const BetterTablesPlugin = require('./BetterTables.js');
const { beforeAll, test, expect } = require('@jest/globals');

describe.skip("text to array transitions", () => {
  test.skip("[text to array transitions] 3 rows 3 cols", () => {
    const table =
      `|header1|header2|header3|
|-------|-------|-------|
|data1  | data2 |  data3|`;

    const expectedReturn = [["header1", "header2", "header3"], [["data1", "data2", "data3",]]];
    const arrayTable = betterTablesLib.getArrayTable(table);
    expect(arrayTable).toEqual(expectedReturn);
  });

  test.skip("[text to array transitions] 1 rows 3 cols", () => {
    const table =
      `|header1|header2|header3|
|-------|-------|-------|`;

    const expectedReturn = [["header1", "header2", "header3"], []];
    const arrayTable = betterTablesLib.getArrayTable(table);
    expect(arrayTable).toEqual(expectedReturn);
  });

  test("centerCell with [['Salutations', 'sava'], [['Oui', 'Merci']]]", () => {
    const input = [['Salutations', 'sava'], [['Oui', 'Merci']]];
    const output = "|" + input.flat(2).reduce((finalString, elt) => finalString += betterTablesLib.centerCell(elt, 11) + "|", "")
    expect(output).toEqual("| Salutations |    sava     |     Oui     |    Merci    |");
  })
})




describe("[HEADER ONLY] Integration tests", () => {
  let betterTable;

  beforeAll(() => {
    betterTable = BetterTablesPlugin();
  });
  test("[HEADER] First pipe", () => {

    betterTable.trigger({ key: "|" });
    expect(betterTable.currentTable).toEqual("|");
  });

  test("[HEADER] Write `|Hello`", () => {
    "Hello".split("").forEach((character) => {
      betterTable.trigger({ key: character });
    });
    expect(betterTable.currentTable).toEqual("|Hello");
  });

  test("[HEADER] Write | Hello |", () => {
    betterTable.trigger({ key: "|" });
    expect(betterTable.currentTable).toEqual("| Hello |");
  });

  test("[HEADER] Write `| Hello |Obsidian`", () => {
    "Obsidian".split("").forEach((character) => {
      betterTable.trigger({ key: character });
    });
    expect(betterTable.currentTable).toEqual("| Hello |Obsidian");
  });

  test("[HEADER] Last pipe", () => {
    betterTable.trigger({ key: "|" });
    expect(betterTable.currentTable).toEqual("|  Hello   | Obsidian |");
  })
});

describe.skip("pipeProcessing tests", () => {
  test("First pipe in an array", () => {
    expect(betterTablesLib.pipeProcessing("|", "first pipe")).toBe("|");
  });
});

describe("[FULL TABLE] Integration tests", () => {
  let betterTable;

  beforeEach(() => {
    betterTable = BetterTablesPlugin();
  });

  test("[FULL TABLE] Headers + new line", () => {

    betterTable.trigger({ key: "|" });
    "Hello".split("").forEach((character) => {
      betterTable.trigger({ key: character });
    });
    betterTable.trigger({ key: "|" });
    "Obsidian".split("").forEach((character) => {
      betterTable.trigger({ key: character });
    });
    betterTable.trigger({ key: "|" });
    betterTable.trigger({ key: "\n" });
    console.log(betterTable.currentTable);
    expect(betterTable.currentTable).toEqual("|  Hello   | Obsidian |\n|");
  });

  test("[FULL TABLE] Headers + |- TAB", () => {

    betterTable.trigger({ key: "|" });
    "Hello".split("").forEach((character) => {
      betterTable.trigger({ key: character });
    });
    betterTable.trigger({ key: "|" });
    "Obsidian".split("").forEach((character) => {
      betterTable.trigger({ key: character });
    });
    betterTable.trigger({ key: "|" });
    betterTable.trigger({ key: "\n" });
    betterTable.trigger({ key: "-" });
    betterTable.trigger({ keyCode: 9 });


    console.log(betterTable.currentTable);
    expect(betterTable.currentTable).toEqual("|  Hello   | Obsidian |\n|----------|----------|");
  });

});

