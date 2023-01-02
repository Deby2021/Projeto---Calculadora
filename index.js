//selecionando todos os elementos necessários
const main = document.querySelector("main");
const root = document.querySelector(":root");
const input = document.getElementById("input");
const resultInput = document.getElementById("result");

//para que o usuário não digite algo que não queremos
//vamos criar um array com todas as possilidades de teclas
//que ele poderá utilizar
//e depois fazemos uma verificação de qual caracter o usuário está digitando
const allowedKeys = [
  "(",
  ")",
  "/",
  "*",
  "-",
  "+",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
  "0",
  ".",
  "%",
  " ",
];

//Funcionamento do botões
//os botões possuem a mesma classe onde podemos colocar o mesmo eventp
//primeiro selecionamos os botões
document.querySelectorAll(".charKey").forEach(function (charKeyBtn) {
  charKeyBtn.addEventListener("click", function () {
    //usamos o dataset para especificar o valor de cada botão
    const value = charKeyBtn.dataset.value;
    input.value += value;
  });
});

//botão clear- para limpar
document.getElementById("clear").addEventListener("click", function () {
  input.value = "";
  //focus - imediatamente focar no input, coloca o cursor
  input.focus();
});

//evento quando uma tecla é apertada
input.addEventListener("keydown", function (ev) {
  //previnir o evento padrão, pois não queremos que o valor
  //seja inserido no valor do input,pois queremos controlar manualmente
  //o que vamos colocar no input
  ev.preventDefault();

  //verifacamos se nosso arrayz allowedkeys inclui o ev.Keys
  //ou seja a tecla que o usuário apertou
  if (allowedKeys.includes(ev.key)) {
    //se a tecla pressionada for um valor válido
    //a gente acrescente ela no input
    input.value += ev.key;
    //inserra
    return;
  }

  //vamos tratar o backspace
  if (ev.key === "Backspace") {
    // o -1 é o penúltimo caracter
    input.value = input.value.slice(0, -1);
  }

  //tecla enter
  if (ev.key === "Enter") {
    calculate();
  }
});

//passamos a própria função
document.getElementById("equal").addEventListener("click", calculate);

function calculate() {
  //iniciamos o input com error, mas
  //se o código fluir até o final este erro não aparece
  //perceba que o result é pintado de vermelho, mas é tão rápido
  //que não podemos ver.
  resultInput.value = "ERROR";
  resultInput.classList.add("error");
  //eval- avaliar o código e executar o código- nela passarmos uma string
  //essa função deve ser usada com muito cuidado
  //pois nessa função eval qualquer usuário pode inserir
  //um código que faça alguma coisa
  //não vamos precisar fazer uma função para cada operação
  const result = eval(input.value);
  resultInput.value = result;
  resultInput.classList.remove("error");
}
//pegar o botão e adicionar o evento
//queremos copiar o valor que está em resultado
//e transferir
document
  .getElementById("copyToClipboard")
  .addEventListener("click", function (ev) {
    //quem acionou o botão que é o próprio botão
    const button = ev.currentTarget;
    if (button.innerText === "Copy") {
      button.innerText = "Copied!";
      //pegamos sua classList e adicionamos a
      //a classe sucees que pinta ela de verdr
      button.classList.add("success");
      //temos uma propriedade no window(navigator)- navegador
      //e selecionamos a propriedade clipboard(área de tranferencia)
      //onde conseguimos escrever um texto nela
      navigator.clipboard.writeText(resultInput.value);
    } else {
      button.innerText = "Copy";
      button.classList.remove("success");
    }
  });

//pegando o botão de trocar o tema
//adicinando o evento a ele
//e a função que ficará responsavel por trocar as cores
document.getElementById("themeSwitcher").addEventListener("click", function () {
  //verifica qual o tema atual
  //como já colocamos o tema dark no html
  //já pegamos o main lá no começo deste código
  if (main.dataset.theme === "dark") {
    //vamos setar-inserir o que queremos
    root.style.setProperty("--bg-color", "#f1f5f9");
    root.style.setProperty("--border-color", "#aaa");
    root.style.setProperty("--font-color", "#212529");
    root.style.setProperty("--primary-color", "#26834a");
    main.dataset.theme = "light";
  } else {
    root.style.setProperty("--bg-color", "#212529");
    root.style.setProperty("--border-color", "#666");
    root.style.setProperty("--font-color", "#f1f5f9");
    root.style.setProperty("--primary-color", "#4dff91");
    main.dataset.theme = "dark";
  }
});
