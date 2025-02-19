const qrBtn = document.querySelector(".gen-qrcode-btn");
const input = document.querySelector("#input");
const qrCode = document.querySelector("#qr-code");


async function genQrCode() {
  
  
  if (input.value === "") {
    alert("fill the input feild")
    return
  }
  
  try {
    const URL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${input.value}`
    let response = await fetch(URL);
    
    
    if (!response.ok) {
      throw console.error("didnt get the response as expected");
    } else {
      qrCode.src = response.url;
      qrCode.style.display = "inline-block";
    }
    
    
  } catch (e) {
    throw console.error(e);
  }
}
  



qrBtn.addEventListener("click",genQrCode);
