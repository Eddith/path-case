const url = "https://www.cheapshark.com/api/1.0";
const list = ["p-4", "sm:w-1/2", "lg:w-1/3"];
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
        gameElement.classList.add(...list);
        gameElement.innerHTML = `
        <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <img class="h-64 w-full object-cover object-center"
                src="${game.thumb}" alt="blog">
            <div class="p-6 hover:bg-indigo-700 hover:text-white transition duration-300 ease-in">
                <h1 class="text-2xl font-semibold mb-3 overflow-ellipsis overflow-hidden whitespace-nowrap">${game.external}</h1>
                <div class="flex items-center flex-wrap ">
                    <a onClick="detailId(${game.gameID})" class="text-red-500 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer">
                    Detail
                    </a>
                    <span
                        class="inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-md">
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
        <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
          <img class="lg:h-72 md:h-48 w-full object-cover object-center"
            src="${gameDetail.info.thumb}" alt="blog">
          <div class="p-6 hover:bg-indigo-700 hover:text-white transition duration-300 ease-in">
            <h2 class="text-base font-medium text-indigo-300 mb-1">${new Date(
              gameDetail.cheapestPriceEver.date
            ).toLocaleDateString()}</h2>
            <h1 class="text-2xl font-semibold mb-3">${
              gameDetail.info.title
            }</h1>
            <div class="flex items-center flex-wrap ">
              <a onClick="behind()" class="text-red-500 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer">
                Back
              </a>
              ${
                gameDetail.deals[0].savings.split(".")[0] !== "0"
                  ? `<span
                class="inline-flex font-bold items-center leading-none lg:ml-auto md:ml-0 ml-auto leading-none text-md text-2xl">
                ${gameDetail.deals[0].savings.split(".")[0]}%
              </span>
              &nbsp;&nbsp;&nbsp;
              <span class="text-red-500 inline-flex items-center line-through">$${
                gameDetail.deals[0].retailPrice
              }
              </span>
              &nbsp;&nbsp;&nbsp;
              <span class="text-2xl inline-flex items-center">
                $${gameDetail.cheapestPriceEver.price}
              </span>`
                  : `
                <span class="text-2xl lg:ml-auto md:ml-0 ml-auto leading-none text-md  inline-flex items-center">
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
