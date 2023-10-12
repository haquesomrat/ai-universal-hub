//! load phones data
const loadData = async (isShowMore) => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  const phones = data.data.tools;
  displayPhones(phones, isShowMore);
};

//! display phones card
const displayPhones = (phones, isShowMore) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";

  // sorting card according to date
  // document.getElementById("sort-card").addEventListener("click", () => {
  //   handleSortDate(phones);
  // });
  // handleSortDate(phones);

  // show how much card you want to show
  if (!isShowMore) {
    phones = phones.slice(0, 9);
  }

  phones.forEach((phone) => {
    // add card to card conatiner
    const phoneCard = document.createElement("div");

    const features = phone.features;

    phoneCard.classList = `card p-5 shadow-xl`;
    phoneCard.innerHTML = `
        <figure class="rounded-lg">
            <img
              class="aspect-video"
              src=${phone.image}
              alt="AI"
            />
        </figure>
        <div class="card-body p-0 mt-4">
            <h2 class="card-title text-black">Features</h2>
            <ol id="features-list">
            ${generateListItems(features)}
            </ol>
            <hr class="my-3" />
            <div class="flex justify-between items-center">
              <div>
                <h4 class="text-2xl text-black font-semibold pb-3">${
                  phone.name
                }</h4>
                <p>
                  <i class="fa-regular fa-calendar-days pr-2"></i>
                  <span class="text-lg">${phone.published_in}</span>
                </p>
              </div>
              <div>
                <button onclick="handleShowModal('${
                  phone.id
                }')" class="btn bg-transparent border-0 btn-circle">
                  <i class="fa-solid fa-xl fa-arrow-right"></i>
                </button>
              </div>
            </div>
        </div>`;
    cardContainer.appendChild(phoneCard);
    return phones;
  });
};

//! handle show modal
const handleShowModal = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${id}`
  );
  const data = await res.json();
  const phoneData = data.data;
  showModalDetails(phoneData);
};

//! show modal details
const showModalDetails = (phoneId) => {
  console.log(phoneId);
  show_modal.showModal();
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
        <div
            class="basis-1/2 flex flex-col bg-[rgba(235, 87, 87, 0.05)] justify-between border-2 border-red-200 rounded-2xl p-6"
          >
            <h3 class="text-xl font-semibold">
              ${phoneId.description}
            </h3>
            <div class="flex justify-between">
              <div
                class="p-3 grid justify-center items-center text-center text-green-400 font-bold"
              >
                <p>${phoneId.pricing[0]?.price}</p>
                <p>${phoneId.pricing[0].plan}</p>
              </div>
              <div
                class="p-3 grid justify-center items-center text-center text-yellow-400 font-bold"
              >
                <p>${phoneId.pricing[1]?.price}</p>
                <p>${phoneId.pricing[1].plan}</p>
              </div>
              <div
                class="p-3 grid justify-center items-center text-center text-red-400 font-bold"
              >
                <p>${phoneId.pricing[2]?.price}</p>
                <p>${phoneId.pricing[2].plan}</p>
              </div>
            </div>
            <div class="flex justify-between">
              <div>
                <header class="text-xl font-semibold pb-2">Features</header>
                <ul class="list-disc pl-6">
                  <li>${phoneId.features["1"].feature_name}</li>
                  <li>${phoneId.features["2"].feature_name}</li>
                  <li>${phoneId.features["3"].feature_name}</li>
                </ul>
              </div>
              <div>
                <header class="text-xl font-semibold pb-2">Integrations</header>
                <ul class="list-disc pl-6">
                  <li>${phoneId.integrations[0]}</li>
                  <li>${phoneId.integrations[1]}</li>
                  <li>${phoneId.integrations[2]}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="card bg-gray-100 shadow-xl basis-1/2">
            <figure class="aspect-video p-4">
              <img
                class="rounded-lg"
                src=${phoneId.image_link[0]}
                alt="tools"
              />
              <p
                class="absolute text-white bg-red-400 px-2 rounded-md top-4 right-6"
              >
                ${phoneId.accuracy.score * 100} accuracy
              </p>
            </figure>
            <div class="card-body px-4 py-8 text-center">
              <h2 class="card-title text-xl justify-center">
                ${phoneId.input_output_examples[0]?.input}
              </h2>
              <p>
              ${phoneId.input_output_examples[0]?.output || "No data found"}
              </p>
            </div>
          </div>
          <div class="modal-action absolute -top-3 right-3">
            <form method="dialog">
              <button class="btn btn-circle btn-outline bg-error text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </form>
          </div>
  `;
};
//! load list data form an array
const generateListItems = (listArr) => {
  let items = "";
  for (let i = 0; i < listArr.length; i++) {
    items += `<li>${listArr[i]}</li>`;
  }
  return items;
};
//! handle show more
const handleShowMore = () => {
  const showMore = document.getElementById("show-more");
  showMore.classList.add("hidden");
  loadData(true);
};

// handle date sorting
const handleSortDate = (phonesData) => {
  phonesData.sort((a, b) => {
    return new Date(a.published_in) - new Date(b.published_in);
  });
};

loadData();
