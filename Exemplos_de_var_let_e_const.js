// Exemplos de var, let e const

var nomeVar = 'Var';
console.log(nomeVar);
console.log(typeof nomeVar);

var nomeVar = 'Novo nome';
console.log(nomeVar);

let nomeLet = 'Let';
console.log(nomeLet);

nomeLet = 'Novo nome do let';
console.log(nomeLet);

// const
const nomeConst = 'Const';
console.log(nomeConst);

// Exemplos do tipo Array

// Array: 1. Array vazio
const colecao = [];
console.log(colecao);

// 2. Array com elementos
const times = ['CRF', 'São Paulo', 'Palmeiras', 'Corinthians'];
console.log(times);

// 3. Tamanho
console.log(times.length);

// 4. Recuperação de elementos
console.log(times[0]);

// 5. Inclusão de elementos
times[4] = 'Flamengo';
console.log(times);

// 6. push e pop
times.push('Botafogo');
console.log(times);

times.pop();
console.log(times);

// 7. shift e unshift
times.shift();
console.log(times);

times.unshift('CRF', 'Grêmio');
console.log(times);