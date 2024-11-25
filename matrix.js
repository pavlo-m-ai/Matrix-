const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const ask = (q) => new Promise((res) => rl.question(q, res));
const getMatrix = async (rows, cols) => {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        let row;
        do {
            row = (await ask(`Введіть ${cols} елементів для рядка ${i + 1}: `)).split(' ').map(Number);
        } while (row.length !== cols);
        matrix.push(row);
    }
    return matrix;
};

const multiplyMatrices = (m1, m2) => {
    if (m1[0].length !== m2.length) return null;
    return m1.map((row) => m2[0].map((_, j) => row.reduce((sum, _, k) => sum + m1[row][k] * m2[k][j], 0)));
};

(async () => {
    const rows1 = +await ask("Рядки першої матриці: ");
    const cols1 = +await ask("Стовпці першої матриці: ");
    const rows2 = +await ask("Рядки другої матриці: ");
    const cols2 = +await ask("Стовпці другої матриці: ");
    if (cols1 !== rows2) return console.log("Множення неможливе"), rl.close();

    const matrix1 = await getMatrix(rows1, cols1);
    const matrix2 = await getMatrix(rows2, cols2);

    console.table(matrix1);
    console.table(matrix2);

    const result = multiplyMatrices(matrix1, matrix2);
    result ? console.table(result) : console.log("Помилка множення");

    rl.close();
})();
