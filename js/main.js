const url = "https://www.cheapshark.com/api/1.0";
const list = ["p-4", "sm:w-1/2", "lg:w-1/3"];

fetch(`${url}/games?title=batman&limit=60&exact=0`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log("içerisinde batman geçen oyunların listesi", data);
    let gameList = data;
    let gameListLength = gameList.length;
    let gameListElement = document.getElementById("gameList");
    for (let i = 0; i < gameListLength; i++) {
      let game = gameList[i];
      let gameElement = document.createElement("div");
      gameElement.classList.add(...list);
      gameElement.innerHTML = `
        <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <img class="lg:h-72 md:h-48 w-full object-cover object-center"
                src="${game.thumb}" alt="blog">
            <div class="p-6 hover:bg-indigo-700 hover:text-white transition duration-300 ease-in">
                <h2 class="text-base font-medium text-indigo-300 mb-1">October 29,
                    2021</h2>
                <h1 class="text-2xl font-semibold mb-3">${game.external}</h1>
                <p class="leading-relaxed mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aperiam modi, expedita quos doloremque autem ipsum itaque incidunt ipsam reprehenderit
                    fuga! Dolores quisquam eius cum accusamus?</p>
                <div class="flex items-center flex-wrap ">
                    <a onClick="detailId(${game.gameID})" class="text-indigo-300 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer">Read More
                        <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                            fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                        </svg>
                    </a>
                    <span
                        class="inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-md">
                        ${game.cheapest}
                    </span>
                </div>
            </div>
        </div>
      `;
      gameListElement.appendChild(gameElement);
    }
  });

function detailId(game) {
  fetch(`${url}/games?id=${game}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("ids verilen oyunun fiyatları", data);
    });
}

fetch(`${url}/deals?id=tyTH88J0PXRvYALBjV3cNHd5Juq1qKcu4tG4lBiUCt4%3D`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log("idi verilen fiyatın detayları", data);
  });
