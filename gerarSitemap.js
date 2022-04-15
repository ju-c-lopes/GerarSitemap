/*
  Função para formar sitemap para o Sheets (Google Planilhas), onde
  parâmetro:
  - linhas recebe o range de células, por exemplo A2:E5
  - colunas recebe quantidade de colunas a serem adquirida os dados, como acima, de A a E, serão 5 colunas
*/

function gerarSitemap(linhas, colunas) {
  // o if tratará caso seja apenas uma única linha em uma única coluna
  if (typeof linhas === "string") {
    linhas = [linhas];
  }
  
  // Abre o sitemap
  let sitemap = '<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Primeiro for para iterar pelas linhas
  for (let i = 0; i < linhas.length; i++) {
    // Abre a tag url, ou seja, uma linha da tabela
    let tagInside = "\t<url>\n";

    // Segundo for para iterar pelas colunas
    for (let j = 0; j < colunas; j++) {
      // handleTag tratará o dado da célula
      // se coluna maior que 1 trata como matriz, senão trata como vetor
      let handleTag = colunas > 1 ? linhas[i][j].split(":") : linhas[i].split(":");
      
      let c = handleTag.length;
      for (let x = 2; x < c; x++) {
        // for lidará caso encontre numero maior de dois pontos do que esperado
        handleTag[1] = handleTag[1] + ":" + handleTag.splice(2, 1);
      }

      // Tag formará a tag tratada e adicionará dentro da tag url com a identação já formatada
      let tag = `\t\t<${handleTag[0]}>${handleTag[1]}</${handleTag[0]}>\n`;
      tagInside += tag;
    }

    // fechará tag url e adicionará ao sitemap
    tagInside += "\t</url>\n";
    sitemap += tagInside;
  }

  // fechará o sitemap e retornará o valor, podendo ser copiado posteriormente
  sitemap += "</urlset>";
  return sitemap;
}