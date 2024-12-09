//Htmlden--
const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const defaultText = document.querySelector(".default-text");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#delete-btn");

let userText = null;

const createElement = (html, className) => {
  //yeni "div" oluşturur
  const chatDiv = document.createElement("div");
  //oluşturulan "div" etiketine "div" ve dişarıdan gelen parametre ile class ismini ekler.
  chatDiv.classList.add("chat", className);

  //oluşturduğumuz "div" içerisine dışarıdan gelen parametreyi html parametresi olarak ekler.
  chatDiv.innerHTML = html;
  return chatDiv;
};
const getChatResponse = async (incomingChatDiv) => {
  const pElement = document.createElement("p");
  console.log(pElement);
  //1. Adım Url' adında bir değişken oluştur ve adresi ver
  const url = "https://chatgpt-42.p.rapidapi.com/geminipro ";
  //2. adım option ekle
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "df36766df4msh611d2126b0e0dd2p1a7b86jsn19e479662678",
      "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: `${userText}`,
        },
      ],
      temperature: 0.9,
      top_k: 5,
      top_p: 0.9,
      max_tokens: 256,
      web_access: false,
    }),
  };
  /* //3. Adım APİ istek at
fetch(url,options)
//gelen cevabı yakala ve json çevir
.then((res)=>res.json())
//json çevirilmiş veriyi yakalyıp işlem yapar
.then((data)=>console.log(data.result))
//hata yakalar
.catch((error)=>console.error(error)) ; */

  //APİ ye url ve options kullanarak istek at ve bekle
  try {
    const response = await fetch(url, options);
    //gelen cevabı "jsona" çevir
    const result = await response.json();
    //APİ' dan gelen cevabı oluşturulan p elementinin içerisine aktarır.
    pElement.innerHTML = result.result;
  } catch (error) {
    //hatayı yakalar
    console.log(error);
  }
  console.log(incomingChatDiv);
  //* Animasyonu kaldırabilmek için querySelector ile seçtik ve ekrandan remove ile kaldırdık.
  incomingChatDiv.querySelector(".typing-animation").remove();
  //* API'den gelen cevabı ekrana aktarabilmek için chat-detailsi seçip bir değişkene aktardık.
  //   const detailDiv = incomingChatDiv.querySelector(".chat-details");
  //   //* Bu detail içerisine oluşturduğumuz pElement etiketini aktardık.
  //   detailDiv.appendChild(pElement);
  incomingChatDiv.querySelector(".chat-details").appendChild(pElement);

  chatInput.value = null;
};
const showTypingAnimation = () => {
  const html = `
    <div class="chat-content">
            <div class="chat-details">
                <img src="./images/chatbot.jpg" alt="">
                <div class="typing-animation">
                    <div class="typing-dot" style="--delay: 0.2s"></div>
                    <div class="typing-dot" style="--delay: 0.3s"></div>
                    <div class="typing-dot" style="--delay: 0.4s"></div>
                </div>
            </div>
        </div>
    `;
  const incomingChatDiv = createElement(html, "incoming");
  chatContainer.appendChild(incomingChatDiv);
  console.log(incomingChatDiv);
  getChatResponse(incomingChatDiv);
};

const handleOutGoingChat = () => {
  userText = chatInput.value.trim(); //inputun içerisindeki değeri alıp fazladan boşlukları siler.

  if (!userText) {
    alert("bir veri giriniz.");
    return;
  }
  const html = `
        <div class="chat-content">
            <div class="chat-details">
                 <img src="./images/user.jpg" alt="">
                <p></p>
          </div>
        </div>
  `;
  //kullanıcının girdiği veriye göre bir "div" olşturur ve bunu "chat-container" yapısına ekler.
  const outgoingChatDiv = createElement(html, "outgoing");
  defaultText.remove();
  outgoingChatDiv.querySelector("p").textContent = userText;
  chatContainer.appendChild(outgoingChatDiv);
  setTimeout(showTypingAnimation, 500);
};

//Olay izleyiciler

sendButton.addEventListener("click", handleOutGoingChat);
//"Textarea" içerisinde klavyeden herhangi bir tuşa bastığımız anda bu olay izleyicisi çalışır.
chatInput.addEventListener("keydown", (e) => {
  //Klavyeden "Enter" tuşuna basıldığı anda "handleOutGoingChat" fonksiyonunu çalıştır.
  if (e.key === "Enter") {
    handleOutGoingChat();
  }
});
//"ThemeButton"a her tıkladığımızda body'e "lightmode" clasını ekle ve çıkar.
themeButton.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    // body light-mode clasını içeriyorsa "themeButton" içerisindeki yazıyı "dark_mode" yap.İçermiyorsa "light_mode" yap.
    themeButton.innerText = document.body.classList.contains("light-mode")
      ? "dark_mode"
      : "light_mode";
  });
  //Sil butonuna tıkladığımızda chat-container div'ini sil ve yerine defaultTexti aktar.
  deleteButton.addEventListener("click", () => {
    // Confirm ile ekrana bir mesaj bastırdık.Confirm bize "true" ve "false" değer döndürür.
    //Tamam tuşuna basıldığında "true" döndürür.
    // İptal tuşuna basıldığında "false" döndürür.
    if (confirm("Tüm sohbetleri silmek istediğinize emin misiniz?")) {
      chatContainer.remove();
    }

  const defaultText = `
  <div class="default-text">
      <h1>ChatGPT Clone</h1>
  </div>
  <div class="chat-container"></div>
  <div class="typing-container">
      <div class="typing-content">
          <div class="typing-textarea">
              <textarea
              id="chat-input"
              placeholder="Aratmak istediğiniz veriyi giriniz..."
              ></textarea>
              <span class="material-symbols-outlined" id="send-btn"> send </span>
          </div>
          <div class="typing-controls">
              <span class="material-symbols-outlined" id="theme-btn">
              light_mode
              </span>
              <span class="material-symbols-outlined" id="delete-btn">
              delete
              </span>
          </div>
      </div>
  </div>
`;

document.body.innerHTML = defaultText;
});