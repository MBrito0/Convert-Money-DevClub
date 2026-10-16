// Seleção dos elementos do DOM (Document Object Model) uma única vez.
// Isso melhora a performance, pois o JavaScript não precisa procurar esses elementos repetidamente.
const convertButton = document.querySelector("#convert-button");
const currencySelect = document.querySelector(".currency-select");
const valueInput = document.querySelector(".value-input");
const currencyValueToConvert = document.querySelector(".currency-value-convert");
const currencyValueConverted = document.querySelector(".currency-value");
const currencyName = document.getElementById("currency-name");
const currencyImg = document.querySelector(".currency-img");

function convertCurrency() {
    // Converte o valor do input (que é uma string) para um número de ponto flutuante.
    // Essencial para realizar cálculos matemáticos corretamente.
    const inputValue = parseFloat(valueInput.value);

    // Lida com inputs inválidos (ex: texto) ou vazios, exibindo 0 e interrompendo a função.
    if (isNaN(inputValue) || inputValue === 0) {
        currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(0);
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(0);
        return;
    }

    // Valores de câmbio fixos (em um projeto real, seriam obtidos de uma API).
    const dolarValue = 5.05;
    const euroValue = 5.63;
    const libraValue = 6.77;
    const bitcoinValue = 419833.86;

    // Exibe o valor de origem (em Real) formatado.
    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(inputValue);

    // Lógica de conversão usando 'if...else if' para melhor eficiência.
    // Usa '===' para comparação estrita (valor e tipo).
    if (currencySelect.value === "dolar") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(inputValue / dolarValue);
    } else if (currencySelect.value === "euro") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(inputValue / euroValue);
    } else if (currencySelect.value === "libra") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP"
        }).format(inputValue / libraValue);
    } else if (currencySelect.value === "bitcoin") {
        // Formatação específica para Bitcoin, mostrando mais casas decimais para precisão.
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "BTC",
            minimumFractionDigits: 2,
            maximumFractionDigits: 8
        }).format(inputValue / bitcoinValue);
    }
}

function changeCurrency() {
    // Lógica para atualizar o nome e a imagem da moeda de destino.
    // Usa 'if...else if' para melhor eficiência e '===' para comparação estrita.
    if (currencySelect.value === "dolar") {
        currencyName.innerHTML = "Dólar Americano";
        currencyImg.src = "./assets/dolar.png";
    } else if (currencySelect.value === "euro") {
        currencyName.innerHTML = "Euro";
        currencyImg.src = "./assets/euro.png";
    } else if (currencySelect.value === "libra") {
        currencyName.innerHTML = "Libra Esterlina";
        currencyImg.src = "./assets/libra.png"; // Certifique-se de ter esta imagem na pasta assets!
    } else if (currencySelect.value === "bitcoin") {
        currencyName.innerHTML = "Bitcoin";
        currencyImg.src = "./assets/bitcoin.png"; // Certifique-se de ter esta imagem na pasta assets!
    }

    // Chama a função de conversão para atualizar o valor sempre que a moeda de destino é alterada.
    // Isso é importante para que, ao mudar de Dólar para Euro, o valor já existente seja recalculado.
    convertCurrency();
}

// Adiciona "ouvintes de evento" aos elementos.
// 'change': dispara quando o valor de um <select> muda (para a moeda de destino).
// 'click': dispara quando o botão de converter é clicado.
currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertCurrency);


// Garante que o script só execute após o HTML estar completamente carregado.
// Isso evita erros de elementos não encontrados e configura o estado inicial do conversor.
document.addEventListener("DOMContentLoaded", () => {
    changeCurrency(); // Configura a moeda de destino inicial (ex: Dólar)
    convertCurrency(); // Realiza a primeira conversão (ex: 0 Real para 0 Dólar)
});