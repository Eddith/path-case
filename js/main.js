const url = "https://www.cheapshark.com/api/1.0";
let gameListElement = document.getElementById("gameList");
let gameListDetailElement = document.getElementById("gameDetail");

window.onload = () => {
  getGameList();
};

const getGameList = () => {
  fetch(`${url}/games?title=batman&limit=60&exact=0`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("içerisinde batman geçen oyunların listesi", data);
      let gameList = data.sort((a, b) => a.cheapest - b.cheapest);
      let gameListLength = gameList.length;
      for (let i = 0; i < gameListLength; i++) {
        let game = gameList[i];
        let gameElement = document.createElement("div");
        gameListElement.appendChild(gameElement);
        gameElement.classList.add("top-container");
        gameElement.innerHTML = `
        <div class="card-container">
            <img class="img-container"
                src="${game.thumb}" alt="blog">
            <div class="text-detail">
                <h1>${game.external}</h1>
                <div class="amount-container">
                    <a onClick="detailId(${game.gameID})">
                    Detail
                    </a>
                    <span>
                        $${game.cheapest}
                    </span>
                </div>
            </div>
        </div>
      `;
        gameListElement.appendChild(gameElement);
      }
    });
};

const detailId = async (game) => {
  await fetch(`${url}/games?id=${game}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let gameDetail = data;
      gameListElement.parentNode.removeChild(gameListElement);
      let gameDetailElement = document.createElement("gameDetail");
      console.log("içerisinde seçilen oyunun detayları", gameDetail);
      gameDetailElement.innerHTML = `
        <div class="card-container2">
          <img class="img-container"
            src="${gameDetail.info.thumb}" alt="blog">
          <div class="text-detail">
            <h2>${new Date(
              gameDetail.cheapestPriceEver.date
            ).toLocaleDateString()}</h2>
            <h1>${gameDetail.info.title}</h1>
            <div class="amount-container">
              <a onClick="behind()">
                Back
              </a>
              ${
                gameDetail.deals[0].savings.split(".")[0] !== "0"
                  ? `<span
                class="span-1">
                ${gameDetail.deals[0].savings.split(".")[0]}%
              </span>
              &nbsp;&nbsp;&nbsp;
              <span class="span-2">$${gameDetail.deals[0].retailPrice}
              </span>
              &nbsp;&nbsp;&nbsp;
              <span class="span-3">
                $${gameDetail.cheapestPriceEver.price}
              </span>`
                  : `
                <span class="span-4">
                  $${gameDetail.deals[0].retailPrice}
                </span>
                  `
              }
            </div>
          </div>
        </div>
      `;
      gameListDetailElement.appendChild(gameDetailElement);
    });
};

const behind = () => {
  gameListDetailElement.parentNode.removeChild(gameListDetailElement);
  window.location.reload();
};
