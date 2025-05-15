// Substitua pela sua URL do Google Apps Script
const URL = 'https://script.google.com/macros/s/AKfycby4jU7FpomvMasPe8cE_sP9MOMCeV-m7S2AAqiOodN_mI7ZATCW98DobJpCy2QdStvLOA/exec';

let dadosPlanilha = [];

// Nome da empresa que você quer filtrar os dados
const empresaSelecionada = "STARTC TECNOLOGIAS"; // Altere aqui para a empresa que você quer mostrar

// Função para carregar os dados da planilha
fetch(URL)
  .then(response => response.json())
  .then(data => {
    dadosPlanilha = data;
    console.log("Dados carregados:", dadosPlanilha);
    
    // Chama a função que exibe os dados da empresa selecionada
    listarPorEmpresa(empresaSelecionada);
  })
  .catch(err => console.error("Erro ao buscar os dados:", err));

// Função que exibe os dados da empresa predefinida
function listarPorEmpresa(nomeEmpresa) {
  const nomeAlvo = nomeEmpresa.trim().toLowerCase(); // Normaliza o nome da empresa

  const resultados = dadosPlanilha.filter(linha => {
    const nomeNaPlanilha = (linha["EMPRESA"] || "").trim().toLowerCase(); // Normaliza o nome da empresa na planilha
    return nomeNaPlanilha === nomeAlvo;
  });

  if (resultados.length === 0) {
    document.getElementById("tabela").innerHTML = `<p>Nenhum dado encontrado para "${nomeEmpresa}".</p>`;
    return;
  }

  let html = "<table><tr>";
  
  // Cria o cabeçalho da tabela com os nomes das colunas
  Object.keys(resultados[0]).forEach(key => {
    html += `<th>${key}</th>`;
  });
  html += "</tr>";

  // Cria as linhas da tabela com os dados
  resultados.forEach(row => {
    html += "<tr>";
    Object.values(row).forEach(val => {
      html += `<td>${val}</td>`;
    });
    html += "</tr>";
  });

  html += "</table>";
  document.getElementById("tabela").innerHTML = html;
}

