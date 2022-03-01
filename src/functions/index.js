export const checkBoardState = (updatedGameBoard, addScore) => {
  let i = 0;
  const validRows = [];
  const validColumns = [];
  while (i < 10) {
    let rowValid = true;
    for (let j = 0; j < 10; j++) if (!updatedGameBoard[i * 10 + j].isFilled) rowValid = false;
    if (rowValid) validRows.push(i);
    let columnValid = true;
    for (let j = 0; j < 10; j++) if (!updatedGameBoard[i + j * 10].isFilled) columnValid = false;
    if (columnValid) validColumns.push(i);
    i++;
  }
  validRows.forEach((row) => {
    addScore += 10;
    for (let i = 0; i < 10; i++) {
      updatedGameBoard[row * 10 + i].isFilled = false;
    }
  });
  validColumns.forEach((col) => {
    addScore += 10;
    for (let i = 0; i < 10; i++) {
      updatedGameBoard[col + i * 10].isFilled = false;
    }
  });
  const totalClears = validRows.length + validColumns.length;
  if (totalClears >= 2) {
    addScore += (totalClears - 1) * 100;
  }
  return { gameBoard: updatedGameBoard, addScore };
};

export const checkGameOver = (gameBoard, gamePieces) => {
  let placementExists = false;
  let allPiecesChecked = false;

  const invalidPieces = [];
  gamePieces.forEach((piece) => {
    if (!piece.isValid) invalidPieces.push(piece);
  });
  if (invalidPieces.length === 0) return true;

  while (!placementExists && !allPiecesChecked) {
    invalidPieces.forEach((piece) => {
      gameBoard.forEach((square, i) => {
        let isValid = true;
        piece.structure.forEach((piece) => {
          if (piece.isFilled) {
            if (piece.col > 0 && (piece.col + i) % 10 === 0) {
              isValid = false;
            }
            const index = i - 10 * piece.row + piece.col;
            if (index > 99 || index < 0) {
              isValid = false;
            } else if (gameBoard[index].isFilled) {
              isValid = false;
            }
          }
        });
        if (isValid) placementExists = true;
      });
    });
    allPiecesChecked = true;
  }
  return placementExists;
};
