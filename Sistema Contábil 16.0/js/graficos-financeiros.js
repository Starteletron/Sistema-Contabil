// Dados fictícios
const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

const dadosFaturamento = {
  labels: meses,
  datasets: [{
    label: "Faturamento",
    data: [12000, 15000, 13000, 14500, 16000, 17000, 18000, 17500, 15500, 16500, 19000, 20000],
    borderColor: 'rgba(75, 192, 192, 1)',
    fill: false,
    tension: 0.1
  }]
};

const dadosDespVariaveis = {
  labels: meses,
  datasets: [{
    label: "Despesas Variáveis",
    data: [8000, 9000, 8500, 9500, 11000, 10000, 12000, 11500, 10500, 11500, 12500, 13000],
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgba(255, 99, 132, 1)',
    borderWidth: 1
  }]
};

const dadosDespFixas = {
  labels: meses,
  datasets: [{
    label: "Despesas Fixas",
    data: [4000, 4200, 4100, 4500, 4600, 4800, 4900, 5000, 5100, 5200, 5300, 5400],
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 1
  }]
};

const dadosPizza = {
  labels: ["Faturamento", "Despesas Variáveis", "Despesas Fixas", "Lucro"],
  datasets: [{
    label: "Distribuição Financeira",
    data: [120000, 30000, 35000, 85000],
    backgroundColor: [
      'rgba(75, 192, 192, 0.2)',
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
      'rgba(75, 192, 192, 1)',
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
  }]
};

const dadosRosca = {
  labels: ["Lucro", "Despesas", "Impostos"],
  datasets: [{
    label: "Distribuição",
    data: [60000, 35000, 15000],
    backgroundColor: [
      'rgba(255, 206, 86, 0.6)',
      'rgba(75, 192, 192, 0.6)',
      'rgba(255, 99, 132, 0.6)'
    ],
    borderColor: [
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(255, 99, 132, 1)'
    ],
    borderWidth: 1
  }]
};

const dadosLinhaComparativa = {
  labels: meses,
  datasets: [
    {
      label: "Faturamento",
      data: [12000, 15000, 13000, 14500, 16000, 17000, 18000, 17500, 15500, 16500, 19000, 20000],
      borderColor: 'rgba(75, 192, 192, 1)',
      fill: false,
      tension: 0.3
    },
    {
      label: "Despesas Totais",
      data: [12000, 13200, 12600, 14000, 15600, 14800, 16900, 16500, 15600, 16700, 17800, 18400],
      borderColor: 'rgba(255, 99, 132, 1)',
      fill: false,
      tension: 0.3
    }
  ]
};

// Funções para renderizar gráficos
function gerarGrafico(tipo, id, dados, opcoesExtras = {}) {
  new Chart(document.getElementById(id), {
    type: tipo,
    data: dados,
    options: {
      responsive: true,
      scales: tipo === 'bar' || tipo === 'line' ? {
        x: { title: { display: true, text: 'Meses' } },
        y: { beginAtZero: true, title: { display: true, text: 'Valor (R$)' } }
      } : {},
      ...opcoesExtras
    }
  });
}

// Gerar gráficos
gerarGrafico("bar", "graficoColunaDespVariaveis", dadosDespVariaveis);
gerarGrafico("line", "graficoLinhaFaturamento", dadosFaturamento);
gerarGrafico("bar", "graficoColunaDespFixas", dadosDespFixas);
gerarGrafico("pie", "graficoPizza", dadosPizza);
gerarGrafico("doughnut", "graficoRosca", dadosRosca);
gerarGrafico("line", "graficoLinhaComparativa", dadosLinhaComparativa);
