let nfeTotal = 0;
let nfceTotal = 0;

function processFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Por favor, selecione um arquivo ZIP.");
    return;
  }

  const reader = new FileReader();
  reader.onload = async function(event) {
    const zipData = event.target.result;
    const zip = await JSZip.loadAsync(zipData);

    // Resetar totais antes de processar um novo arquivo
    nfeTotal = 0;
    nfceTotal = 0;

    // Processar os arquivos dentro do ZIP
    for (const fileName in zip.files) {
      const file = zip.files[fileName];
      if (fileName.endsWith(".xml")) {
        const xmlData = await file.async("string");
        processXML(xmlData, fileName);
      }
    }

    // Atualizar o relatório com os totais calculados
    updateReport();
  };

  reader.readAsArrayBuffer(file);
}

function processXML(xmlData, fileName) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlData, "application/xml");

  // Aqui buscamos o valor da nota fiscal de maneira mais robusta
  let valor = 0;
  
  // Tentando diferentes tags que podem conter o valor da nota
  const totalTag = xmlDoc.querySelector("cfop");
  const valorTag = xmlDoc.querySelector("total");
  const vNFTag = xmlDoc.querySelector("vNF");
  if (vNFTag) {
    valor = parseFloat(vNFTag.textContent.replace(",", "."));
  } else if (valorTag) {
    valor = parseFloat(valorTag.textContent.replace(",", "."));
  }

  // Checar se é NFe ou NFCe e calcular o total
  if (fileName.toLowerCase().includes("nfe")) {
    nfeTotal += valor;
  } else if (fileName.toLowerCase().includes("nfce")) {
    nfceTotal += valor;
  }
}

function updateReport() {
  // Atualiza os totais no relatório
  document.getElementById("nfeTotal").textContent = `R$ ${nfeTotal.toFixed(2)}`;
  document.getElementById("nfceTotal").textContent = `R$ ${nfceTotal.toFixed(2)}`;
}
