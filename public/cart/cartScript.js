import { products } from "../products/products.js";
import { formatCurrency } from "../products/shopProducts.js";

document.querySelector(".link-back-to-shop").addEventListener("click", () => {
  location.href = "../index.html";
});

let showAlertInterval;
let isUpdate = false;
let confirmAddress = false;
let showAlertAttention;
let deliveryPrice;

function showAlert(alert, msg) {
  alert.classList.remove("hidden");
  alert.textContent = msg;
  alert.classList.add("fade-in-3s");
  if (alert.classList.contains("fade-in-3s")) {
    alert.classList.remove("fade-in-3s");
    requestAnimationFrame(()=>{
      alert.classList.add("fade-in-3s");
    })
  }
  clearInterval(showAlertInterval);
  showAlertInterval = setTimeout(() => {
    alert.classList.add("hidden");
    alert.classList.remove("fade-in-3s");
    alert.textContent = "";
  }, 2800);
}

function attentionWarning() {
  location.href = "#payment-gap";
  const confirmDelWrapper = document.querySelector(".confirm-del-wrapper");
  confirmDelWrapper.classList.add("attention-warning");
  if (confirmDelWrapper.classList.contains("attention-warning")) {
    confirmDelWrapper.classList.remove("attention-warning");
    requestAnimationFrame(()=>{
      confirmDelWrapper.classList.add("attention-warning");
    })
  }
  clearInterval(showAlertAttention);
  showAlertAttention = setTimeout(()=>{
    confirmDelWrapper.classList.remove("attention-warning");
  }, 2800);
}


renderCartProducts();

function renderCartProducts() {
  const userData = JSON.parse(localStorage.getItem("userDataTemp"));
  let cartProductsHTML = "";
  let itemsQuantity = 0;

  userData.cart.forEach((item) => {
    const itemID = item.id;
    itemsQuantity += item.quantity;
    let matchingProduct;

    products.forEach((product) => {
      if (product.id === itemID) {
        matchingProduct = product;
      }
    });

    cartProductsHTML += `
      <div class="cart-item-container js-item-container-${matchingProduct.id}">
        <div class="cart-item-image col-12 col-sm-3">
          <img class="product-image" src="${matchingProduct.image}">
        </div>
        <div class="cart-item-details col">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            ${formatCurrency(matchingProduct.priceCents * item.quantity)} $
          </div>
          <div class="product-quantity">
            <div class="quantity-label">Quantity: <span class="item-quantity-${item.id}">${item.quantity}</span></div>
            <div class="quantity-upd-wrapper quantity-update-${item.id}">
              <button class="update-quantity-button UQB-${item.id}" data-id=${item.id}>Update</button>
              <button class="delete-item-button DI-${item.id}" data-id=${item.id}>Delete</button>
              <div class="update-warning UW-${item.id} hidden"></div>
            </div>
          </div>
        </div>
      </div>`
  });
  if (userData.cart.length === 0) {
    document.querySelector(".products-field").innerHTML = `<div class="empty-cart-label">Cart is empty</div>`;
    document.querySelector(".items-quantity").innerHTML = 0;
    document.querySelector(".total-items").innerHTML = 0;
  } else {
    document.querySelector(".products-field").innerHTML = cartProductsHTML;
    document.querySelector(".items-quantity").innerHTML = itemsQuantity;
    document.querySelector(".total-items").innerHTML = itemsQuantity;
  }

  function updateQuantityFunc(button) {
    const productID = button.dataset.id;

    if (confirmAddress) {
      showAlert(document.querySelector(`.UW-${productID}`), "Cancel address confirmation");
      const confirmAddressAlert = document.querySelector(".confirm-address-alert");
      confirmAddressAlert.classList.remove("fade-in-3s");
      confirmAddressAlert.textContent = "";
      confirmAddressAlert.classList.add("hidden");
      attentionWarning();
      const otherWarnings = document.querySelectorAll(".update-warning");
      otherWarnings.forEach((warning) => {
        if (!warning.classList.contains(`UW-${productID}`)) {
          warning.textContent = "";
          warning.classList.add("hidden");
          warning.classList.remove("fade-in-3s");
        }
      });
    } else {
      if (isUpdate === false) {
        isUpdate = true;
        const updateWrapper = document.querySelector(`.quantity-update-${productID}`);
        const updateQuantityButton = document.querySelector(`.UQB-${productID}`);
        const deleteItemButton = document.querySelector(`.DI-${productID}`);
        const updateInputWrapper = document.createElement("div");
        updateInputWrapper.classList.add("update-input-wrapper");
        const updateInputLabel = document.createElement("label");
        updateInputLabel.htmlFor = "update-input";
        updateInputLabel.textContent = "New quantity";
        const updateInput = document.createElement("input");
        updateInput.id = "update-input";
        updateInput.type = "number";
        updateInput.min = 1;
        updateInput.max = 10;
        updateInput.value = document.querySelector(`.item-quantity-${productID}`).textContent;
        const updateButtonsWrapper = document.createElement("div");
        updateButtonsWrapper.classList.add("update-buttons-wrapper");
        const saveButton = document.createElement("button");
        saveButton.classList.add("save-button");
        saveButton.textContent = "Save";
        const cancelUpdate = document.createElement("button");
        cancelUpdate.classList.add("cancel-update");
        cancelUpdate.textContent = "Cancel";
        const saveWarning = document.createElement("div");
        saveWarning.classList.add("save-warning", "hidden");
        updateInputWrapper.append(updateInputLabel, updateInput);
        updateButtonsWrapper.append(saveButton, cancelUpdate, saveWarning);
        updateWrapper.removeChild(updateQuantityButton);
        updateWrapper.removeChild(deleteItemButton);
        updateWrapper.removeChild(document.querySelector(`.UW-${productID}`));
        updateWrapper.append(updateInputWrapper, updateButtonsWrapper);
  
        document.querySelector("#update-input").addEventListener("input", (event) => {
          const input = event.target;
          if (input.value < 0 ) {
            input.value = 1;
          } else if (input.value > 10) {
            input.value = 10;
          }
        });
  
        saveButton.addEventListener("click", async () => {
          const newQuantity = Number(updateInput.value);
          const userEmail = JSON.parse(localStorage.getItem("userDataShop")).email;
          const userQuantity = {email: userEmail, productID: productID, quantity: newQuantity};
          if (newQuantity == "" || newQuantity == 0) {
            showAlert(saveWarning, "Enter new quantity");
            const updateWarnings = document.querySelectorAll(".update-warning");
            updateWarnings.forEach((warning) => {
              warning.classList.add("hidden");
              warning.textContent = "";
            });
            const orderWarning = document.querySelector(".order-warning");
            orderWarning.classList.remove("fade-in-3s");
            orderWarning.classList.add("hidden");
            orderWarning.textContent = "";
          } else {
            try {
              const options = {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json"
                }, 
                body: JSON.stringify(userQuantity)
              };
              const request = await fetch("/api/user/updateItemQuantity", options);
              const json = await request.json();
              if (json === "quantity updated") {
                const index = userData.cart.findIndex(item => item.id === productID);
                userData.cart[index].quantity = newQuantity;
                localStorage.setItem("userDataTemp", JSON.stringify(userData));
                isUpdate = false;
                renderCartProducts();
                countPayment(deliveryPrice);
              } else {
                alert(json);
              }
            } catch (error) {
              alert(error);
            }
          }
        });
  
        cancelUpdate.addEventListener("click", () => {
          isUpdate = false;
          const updateQuantityButton = document.createElement("button");
          updateQuantityButton.classList.add("update-quantity-button", `UQB-${productID}`);
          updateQuantityButton.textContent = "Update";
          updateQuantityButton.dataset.id = productID;
          const deleteItemButton = document.createElement("button");
          deleteItemButton.classList.add("delete-item-button", `DI-${productID}`);
          deleteItemButton.textContent = "Delete";
          deleteItemButton.dataset.id = productID;
          const updateWarning = document.createElement("div");
          updateWarning.classList.add("update-warning", `UW-${productID}`, "hidden");
          updateWrapper.removeChild(updateInputWrapper);
          updateWrapper.removeChild(updateButtonsWrapper);
          updateWrapper.append(updateQuantityButton);
          updateWrapper.append(deleteItemButton);
          updateWrapper.append(updateWarning);
  
          updateQuantityButton.addEventListener("click", () => {
            updateQuantityFunc(button);
          })
  
          deleteItemButton.addEventListener("click", () => {
            deleteItem(button);
          })
        })
      } else if (isUpdate === true) {
        const UW = document.querySelector(`.UW-${productID}`);
        showAlert(UW, "Finish previous update");
        const otherWarnings = document.querySelectorAll(".update-warning");
        otherWarnings.forEach((warning) => {
          if (!warning.classList.contains(`UW-${productID}`)) {
            warning.textContent = "";
            warning.classList.add("hidden");
            warning.classList.remove("fade-in-3s");
          }
        });
        const orderWarning = document.querySelector(".order-warning");
        orderWarning.classList.remove("fade-in-3s");
        orderWarning.classList.add("hidden");
        orderWarning.textContent = "";
        const saveWarning = document.querySelector(".save-warning");
        saveWarning.classList.remove("fade-in-3s");
        saveWarning.classList.add("hidden");
        saveWarning.textContent = "";
      }
    }
  }

  async function deleteItem(button) {
    const productID = button.dataset.id;
    if (confirmAddress) {
      showAlert(document.querySelector(`.UW-${productID}`), "Cancel address confirmation");
      const confirmAddressAlert = document.querySelector(".confirm-address-alert");
      confirmAddressAlert.classList.remove("fade-in-3s");
      confirmAddressAlert.textContent = "";
      confirmAddressAlert.classList.add("hidden");
      attentionWarning();
      const otherWarnings = document.querySelectorAll(".update-warning");
      otherWarnings.forEach((warning) => {
        if (!warning.classList.contains(`UW-${productID}`)) {
          warning.textContent = "";
          warning.classList.add("hidden");
          warning.classList.remove("fade-in-3s");
        }
      });
    } else {
      const productID = button.dataset.id;
      const userEmail = JSON.parse(localStorage.getItem("userDataShop")).email;
      const userEmailAndId = {email: userEmail, productId: productID};
      try {
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          }, 
          body: JSON.stringify(userEmailAndId)
        };
        const request = await fetch("/api/user/deleteProduct", options);
        const json = await request.json();
        if (json === "product deleted") {
          const index = userData.cart.findIndex(item => item.id === productID);
          if (index !== -1) {
            userData.cart.splice(index, 1);
            localStorage.setItem("userDataTemp", JSON.stringify(userData));
            isUpdate = false;
            renderCartProducts();
            countPayment(deliveryPrice);
          } else {
            alert("item was not found");
          }
        } else {
          alert(json);
        }
      } catch (error) {
        alert(error);
      }
    }
  }

  const updateButtons = document.querySelectorAll(".update-quantity-button");
  updateButtons.forEach((button) => {
    button.addEventListener("click", () => {
      updateQuantityFunc(button);
    })
  });

  const deleteButtons = document.querySelectorAll(".delete-item-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      deleteItem(button);
    })
  });
}

/* Delivery field */
const deliveryOptions = [
  {
    date: calcDelivery(new Date(), 7),
    cost: "Free",
    id: "del-free",
    selected: "checked"
  },
  {
    date: calcDelivery(new Date(), 5),
    cost: 799,
    id: "del-799",
    selected: ""
  },
  {
    date: calcDelivery(new Date(), 3),
    cost: 1099,
    id: "del-1099",
    selected: ""
  }
]
function calcDelivery(date, days) {
  const oneDay = 24 * 60 * 60 * 1000; 
  let newDate = new Date(date.getTime());

  while (days > 0) {
    newDate.setTime(newDate.getTime() + oneDay);

    if (newDate.getDay() !== 0 && newDate.getDay() !== 6) {
      days--;
    }
  }
  return newDate;
}

const months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October", 
  10: "November",
  11: "December"

}

function renderDelivery() {
  const deliveryField = document.querySelector(".delivery-options");
  let deliveryHTML = "";
  deliveryOptions.forEach((item)=>{
    deliveryHTML += `
    <div class="delivery-option">
      <input type="radio" name="delivery" id=${item.id} value=${item.cost} ${item.selected}>
      <label for=${item.id}>
        <div>Date: ${item.date.getDate()} ${months[item.date.getMonth()]} ${item.date.getFullYear()}</div>
        <div>Cost: ${item.cost === "Free" ? "Free" : formatCurrency(item.cost) + " $"} </div>
      </label>
    </div>`
  });
  deliveryField.innerHTML = deliveryHTML;
  const deliveryDate = document.querySelector(".delivery-date");
  const devDate = deliveryOptions[0].date.getDate() + " " + months[deliveryOptions[0].date.getMonth()] + " " + deliveryOptions[0].date.getFullYear();
  deliveryDate.textContent = devDate;
  localStorage.setItem("devDate", JSON.stringify(devDate));

  const delFree = document.querySelector("#del-free");
  delFree.addEventListener("input", () => {
    deliveryPrice = 0;
    countPayment(delFree.value);
    const devDate = deliveryOptions[0].date.getDate() + " " + months[deliveryOptions[0].date.getMonth()] + " " + deliveryOptions[0].date.getFullYear();
    deliveryDate.textContent = devDate;
    localStorage.setItem("devDate", JSON.stringify(devDate));
  });
  const del799 = document.querySelector("#del-799");
  del799.addEventListener("input", () => {
    deliveryPrice = 799;
    countPayment(del799.value);
    const devDate = deliveryOptions[1].date.getDate() + " " + months[deliveryOptions[1].date.getMonth()] + " " + deliveryOptions[1].date.getFullYear();
    deliveryDate.textContent = devDate;
    localStorage.setItem("devDate", JSON.stringify(devDate));
  });
  const del1099 = document.querySelector("#del-1099");
  del1099.addEventListener("input", () => {
    deliveryPrice = 1099;
    countPayment(del1099.value);
    const devDate = deliveryOptions[2].date.getDate() + " " + months[deliveryOptions[2].date.getMonth()] + " " + deliveryOptions[2].date.getFullYear();
    deliveryDate.textContent = devDate;
    localStorage.setItem("devDate", JSON.stringify(devDate));
  });
};
renderDelivery();

function countPayment(delivery) {
  const userData = JSON.parse(localStorage.getItem("userDataTemp"));
  const totalSumDiv = document.querySelector(".total-summ");
  let totalSum = 0;

  if (userData.cart.length == 0) {
    totalSumDiv.textContent = "0.00 $";
  } else {
    userData.cart.forEach((item) => {
      const itemID = item.id;
      let matchingProduct;
  
      products.forEach((product) => {
        if (product.id === itemID) {
          matchingProduct = product;
        }
      });
  
      totalSum += item.quantity * matchingProduct.priceCents;
    });
  
    if (!delivery) {
      totalSumDiv.textContent = formatCurrency(totalSum) + " $";
    } else {
      if (delivery === "Free") {
        totalSumDiv.textContent  = formatCurrency(totalSum) + " $";
      } else {
        totalSumDiv.textContent = formatCurrency(totalSum + Number(delivery)) + " $";
      } 
    }  
  }
  
}
countPayment();

const orderButton = document.querySelector(".order-button");
orderButton.addEventListener("click", () => {
  const userData = JSON.parse(localStorage.getItem("userDataTemp"));
  const orderWarning = document.querySelector(".order-warning");

  if (userData.cart.length == 0) {
    showAlert(orderWarning, "There is nothing to order!")
  } else {
    if (isUpdate) {
      showAlert(orderWarning, "Finish update item");
      const otherWarnings = document.querySelectorAll(".update-warning");
      otherWarnings.forEach((warning) => {
        warning.textContent = "";
        warning.classList.add("hidden");
        warning.classList.remove("fade-in-3s");
      });
      const saveWarning = document.querySelector(".save-warning");
      saveWarning.classList.remove("fade-in-3s");
      saveWarning.classList.add("hidden");
      saveWarning.textContent = "";
    } else {
      confirmAddress = true;
      document.querySelector("#del-free").disabled = true;
      document.querySelector("#del-799").disabled = true;
      document.querySelector("#del-1099").disabled = true;
      const userData = JSON.parse(localStorage.getItem("userDataTemp"));
      const paymentWrapper = document.querySelector(".payment-wrapper");
  
      const confirmDelWrap = document.createElement("div");
      confirmDelWrap.classList.add("confirm-del-wrapper");
      const confirmDelLabel = document.createElement("label");
      confirmDelLabel.htmlFor = "confirm-del-input";
      confirmDelLabel.textContent = "Confirm delivery address";
      const confirmDelInput = document.createElement("textarea");
      confirmDelInput.id = "confirm-del-input";
      confirmDelInput.value = userData.address;
      const confirmDelBW = document.createElement("div");
      confirmDelBW.classList.add("confirm-del-button-wrapper");
      const confirmDelButton = document.createElement("button");
      confirmDelButton.classList.add("confirm-del-button");
      confirmDelButton.textContent = "Confirm";
      const cancelConfirmDel = document.createElement("button");
      cancelConfirmDel.classList.add("cancel-confirm-del");
      cancelConfirmDel.textContent = "Cancel";
      const confirmAddressAlert = document.createElement("div");
      confirmAddressAlert.classList.add("confirm-address-alert", "hidden");
      confirmDelBW.append(confirmDelButton, cancelConfirmDel, confirmAddressAlert);
      confirmDelWrap.append(confirmDelLabel, confirmDelInput, confirmDelBW);
      paymentWrapper.append(confirmDelWrap);
  
      confirmDelButton.addEventListener("click", () => {
        if (confirmDelInput.value == "") {
          showAlert(confirmAddressAlert, "Enter address!");
        } else {
          const devDate = JSON.parse(localStorage.getItem("devDate"));
        const userOrder = {
          firstName: userData.firstName,
          secondName: userData.secondName,
          phone: userData.phone,
          address: confirmDelInput.value,
          summ: document.querySelector(".total-summ").textContent,
          items: [],
          devDate: devDate
        }
        userData.cart.forEach((item) => {
          const itemID = item.id;
          let matchingProduct;
      
          products.forEach((product) => {
            if (product.id === itemID) {
              matchingProduct = product;
            }
          });
      
          userOrder.items.push({name: matchingProduct.name, quantity: item.quantity});
        });
        localStorage.setItem("userOrderTemp", JSON.stringify(userOrder));
        location.href = "../payment/payment.html";
        localStorage.removeItem("devDate");
        }
      });
  
      cancelConfirmDel.addEventListener("click", () => {
        confirmAddress = false;
        paymentWrapper.removeChild(confirmDelWrap);
        document.querySelector("#del-free").disabled = false;
        document.querySelector("#del-799").disabled = false;
        document.querySelector("#del-1099").disabled = false;
      });
    }  
  }
  
})