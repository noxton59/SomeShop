const userData = JSON.parse(localStorage.getItem("userOrderTemp"));
const userOrderDiv = document.querySelector(".user-order");

let userCart = "";
userData.items.forEach((item) => {
  userCart += `<div class="item">Item name: ${item.name}, quantity: ${item.quantity}</div>`
});

const userOrderHTML = `
  <div class="user-order-main">
    <div class="user-info-label">User information</div>
    <div class="user-info">
      <div class="user-name">User name: ${userData.firstName} ${userData.secondName}</div>
      <div class="user-phone">User phone: ${userData.phone}</div>
      <div class="user-del-address">Delivery address: ${userData.address}</div>
      <div class="user-del-date">Delivery date: ${userData.devDate}</div>
    </div>
    <div class="user-purchases-label">
      User purchases:
    </div>
    <div class="user-purchases">${userCart}</div>
    <div class="price-label">Price to pay: ${userData.summ}</div>
  </div>`;
userOrderDiv.innerHTML = userOrderHTML;

const backToShop = document.querySelector(".thanks-div").addEventListener("click", () => {
  location.href= "../index.html";
})