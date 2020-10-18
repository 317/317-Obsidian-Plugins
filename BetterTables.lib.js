




/**
 * Gère le management d'un pipe pressé
 */
function pipeProcessing(stringTable, pipeStatus = "nth pipe") {
  if (pipeStatus === "first pipe") {
    return "|";
  } else if (pipeStatus === "nth pipe") {
    stringTable += "|";
    const arrayTable = getArrayTable(stringTable);
    return formatTable(arrayTable);
  } else {
    throw Error("ERROR [pipeProcessing]: invalid pipeStatus option")
  }
  return false;
};

/**
 * Toutes les colonnes doivent avoir la même largeur, qui correspond à la case 
 * la plus large + un espace des deux côtés.
 * Les autres cases doivent voir leur valeur centrée
 */
function formatTable(arrayTable) {

  if (!validateTable(arrayTable)) {
    throw Error("Invalid Table!")
  }

  const maxCellSize = getMaxCellSize(arrayTable)
  const headerArray = arrayTable.shift();
  const contentArray = arrayTable;

  let returnedStringTable = "";

  // --- HEADLINE PROCESSING ---
  returnedStringTable += headerArray.reduce((accumulator, currentValue) => {
    return accumulator + centerCell(currentValue, maxCellSize) + "|";
  }, "|");

  // --- DASHLINE PROCESSING ---
  if (contentArray.length >= 1) {
    returnedStringTable += makeHeaderLine(headerArray.length, maxCellSize);
    // --- CONTENT LINES PROCESSING ---
    returnedStringTable += contentArray.reduce((accumulator, currentValue) => {
      const row = currentValue.reduce((rowAcc, rowCurrentVal) => {
        return rowAcc + centerCell(rowCurrentVal, maxCellSize) + "|"
      }, "|")
      return accumulator + "\n" + row;
    }, "")
  }
  return returnedStringTable;
};

/**
 * 
 * @param {*} stringTable 
 */
function makeHeaderLine(cellCount, maxCellSize) { // TODO
  // const lines = Array(cellCount).reduce(acc => acc += Array(maxCellSize).reduce(acc2 => acc2 += "-", "") + "|", "|")

  const lines = "|".repeat(cellCount);

  console.log(cellCount, lines);
  return lines;
}

/**
 * Process the table string and make an array of objects. 
 * Structure : [[], [], []]
 * One array per array element
 */
function getArrayTable(stringTable) {
  const rows = stringTable.split("\n");
  const headers = setStringToArrayRow(rows.shift());

  if (rows.length === 0)
    return [headers];

  if (rows.length === 1 && isDashRow(rows[0])) {
    return [headers, []];
  }

  const content = [];
  while (rows.length > 0) { // TODO: filtrer la ligne de séparation en petits tirets
    const row = rows.shift();
    if (isDashRow(row)) continue;
    const cells = setStringToArrayRow(row)
    content.push(cells);
  }
  return [headers, content];
};

/**
 * Ignore the |---|---| row
 * @param {Set} row 
 */
function isDashRow(row) {
  const charSet = [...new Set(row.split(''))];
  return (charSet.every((row) => ["|", "-"].includes(row)))
}

/**
 * 
 * @param {string} stringTable 
 */
function newLine(stringTable) {
  return stringTable += "\n|";
}


/**
 * S'assure que l'objet JSON soit bien valide pour une table markdown
 * @param {string} arrayTable 
 */
function validateTable(arrayTable) {
  // throw Exception("[IMPLEMENTATION WARNING] validate table is not implemented yet")
  return true;
}

/**
 * Self explanatory. Will parse ALL the table
 * @param {Array} arrayTable 
 */
function getMaxCellSize(arrayTable) {
  const flattenedTable = arrayTable.flat();
  const max = flattenedTable.reduce((prevMax, curr) => Math.max(prevMax, curr.length), -Infinity);
  return max + 2;
};

/**
 * Parcourt la table en string et s'arrange pour que toutes les cells soient centrées
 * @param {string} stringCell
 */
function centerCell(stringCell, maxLength) {
  const totalSpace = (maxLength - stringCell.length)
  const leftSpaceSize = Math.floor(totalSpace / 2) + 1;
  const rightSpaceSize = totalSpace - leftSpaceSize + 2;
  const leftSpace = Array(leftSpaceSize).join(" ");
  const rightSpace = Array(rightSpaceSize).join(" ");
  return leftSpace + stringCell + rightSpace;
}


const cell = {
  column_name: "header2",
  row_number: "3",
  value: "data45"
}


function setStringToArrayRow(stringRow) {
  const cells = stringRow.split("|");
  cells.pop();
  cells.shift();
  return cells.map((cell) => cell.trim())
}




function newRow(stringTable) {
  return stringTable;
}


/** 
- Au premier pipe, on attend la suite.
- Si ta plus d'un pipe, quand on tombe sur "entrée", on crée la ligne sous le header et 2 lignes vides
*/




function insertAtCaret(text) {
  var txtarea = document.activeElement;
  var scrollPos = txtarea.scrollTop;
  var strPos = 0;
  var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
    "ff" : (document.selection ? "ie" : false));
  if (br == "ie") {
    txtarea.focus();
    var range = document.selection.createRange();
    range.moveStart('character', -txtarea.value.length);
    strPos = range.text.length;
  }
  else if (br == "ff") strPos = txtarea.selectionStart;

  var front = (txtarea.value).substring(0, strPos);
  var back = (txtarea.value).substring(strPos, txtarea.value.length);
  txtarea.value = front + text + back;
  strPos = strPos + text.length;
  if (br == "ie") {
    txtarea.focus();
    var range = document.selection.createRange();
    range.moveStart('character', -txtarea.value.length);
    range.moveStart('character', strPos);
    range.moveEnd('character', 0);
    range.select();
  }
  else if (br == "ff") {
    txtarea.selectionStart = strPos;
    txtarea.selectionEnd = strPos;
    txtarea.focus();
  }
  txtarea.scrollTop = scrollPos;
};



module.exports = {
  makeHeaderLine, newLine, pipeProcessing, formatTable, validateTable, getMaxCellSize, centerCell, getArrayTable, centerCell, insertAtCaret, newRow
}