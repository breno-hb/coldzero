const oculto = document.getElementById('oculto');
const botao = document.getElementById('botao');

botao.onclick = function() {
    oculto.classList.toggle('visivel')
    if (oculto.style.display === 'none' || oculto.style.display ===  '') {
        oculto.style.display = 'flex';
        botao.textContent = '------ > Ver menos < ------'
    } else {
        oculto.style.display = 'none'
        botao.textContent = '------ > Ver mais < ------'
    }
}


fetch("https://ws-public.interpol.int/notices/v1/red")
  .then(res => res.json())
  .then(data => {
    const div = document.getElementById("procurados");

    // Pega apenas os 6 primeiros resultados
    const primeirosSeis = data._embedded.notices.slice(0, 6);

    primeirosSeis.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${item._links.thumbnail.href}">
        <h3>${item.name}</h3>
        <p>${item.forename || ""}</p>
      `;

      div.appendChild(card);
    });
  })
  .catch(err => console.log("Erro:", err));
