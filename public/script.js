import renderProducts from "./products/shopProducts.js";
import {products} from "./products/products.js";

const tempCart = JSON.parse(localStorage.getItem('tempCart')) || [];
const cartDescription = document.querySelector(".cart-description");

let loggedUser = [];
let loggedUserBool = false;
const regExEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regExPhone = /^\+*\d{1,3}[-\s]*\d{1,4}[-\s]*\d{1,4}[-\s]*\d{1,4}[-\s]*\d{1,4}$/;

checkLoggedUser();
renderCartDescription(cartDescription);

document.querySelector(".shop-name").addEventListener("click", () => {
  location.href = "/index.html";
})

//cart menu

let isMenuVisible = false;
const cartMenu = document.querySelector(".cart-field-main");
cartMenu.addEventListener("click", () => {
  document.querySelector(".cart-menu-main").classList.remove("hidden");
  isMenuVisible = true;
});

function toggleMenu() {
  if (isMenuVisible) {
    document.querySelector(".cart-menu-main").classList.add("hidden");
    document.querySelector(".go-to-cart-warning").classList.add("hidden");
    isMenuVisible = false;
  } else {
    document.querySelector(".cart-menu-main").classList.remove("hidden");
    isMenuVisible = true;
  }
} 

function clickOutside(event) {
  if (isMenuVisible && !cartMenu.contains(event.target)) {
    toggleMenu();
  }
}

document.addEventListener("mousedown", clickOutside);

let showAlertIntervalId;

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
  clearInterval(showAlertIntervalId);
  showAlertIntervalId = setTimeout(() => {
    alert.classList.add("hidden");
    alert.classList.remove("fade-in-3s");
    alert.textContent = "";
  }, 2800);
}

//Sign up function

const signUpButtonMain = document.querySelector(".sign-up-button-main");

function signUp() {
  const blackBG = document.createElement("div");
  blackBG.classList.add("black-background");
  const signUpField = document.createElement("div");
  signUpField.classList.add("sign-up-field", "col-12", "col-sm-10", "col-lg-6");
  const signUpLabel = document.createElement("div");
  signUpLabel.classList.add("sign-up-label");
  signUpLabel.textContent = "Enter your data";
  const signUpData = document.createElement("div");
  signUpData.classList.add("sign-up-data");
  const userEmailField = document.createElement("div");
  userEmailField.classList.add("form-floating");
  const userEmailInput = document.createElement("input");
  userEmailInput.classList.add("form-control");
  userEmailInput.type = "email";
  userEmailInput.id = "user-email-input";
  userEmailInput.placeholder = "name@example.com";
  const userEmailLabel = document.createElement("label");
  userEmailLabel.htmlFor = "user-email-input";
  userEmailLabel.textContent = "Email address";
  const userFirstNameField = document.createElement("div");
  userFirstNameField.classList.add("form-floating");
  const userFirstNameInput = document.createElement("input");
  userFirstNameInput.classList.add("form-control");
  userFirstNameInput.id = "user-first-name-input";
  userFirstNameInput.type = "text";
  userFirstNameInput.placeholder = "First Name";
  const userFirstNameLabel = document.createElement("label");
  userFirstNameLabel.textContent = "First Name";
  userFirstNameLabel.htmlFor = "user-first-name-input";
  const userSecondNameField = document.createElement("div");
  userSecondNameField.classList.add("form-floating");
  const userSecondNameInput = document.createElement("input");
  userSecondNameInput.classList.add("form-control");
  userSecondNameInput.id = "user-second-name-input";
  userSecondNameInput.type = "text";
  userSecondNameInput.placeholder = "Second Name";
  const userSecondNameLabel = document.createElement("label");
  userSecondNameLabel.textContent = "Second Name";
  userSecondNameLabel.htmlFor = "user-second-name-input";
  const userPhoneField = document.createElement("div");
  userPhoneField.classList.add("form-floating");
  const userPhoneInput = document.createElement("input");
  userPhoneInput.classList.add("form-control");
  userPhoneInput.id = "user-phone-input";
  userPhoneInput.type = "tel";
  userPhoneInput.placeholder = "Phone Number";
  const userPhoneLabel = document.createElement("label");
  userPhoneLabel.textContent = "Phone";
  userPhoneLabel.htmlFor = "user-phone-input";
  const userAddressField = document.createElement("div");
  userAddressField.classList.add("form-floating");
  const userAddressInput = document.createElement("input");
  userAddressInput.classList.add("form-control");
  userAddressInput.id = "user-address-input";
  userAddressInput.type = "text";
  userAddressInput.placeholder = "Address";
  const userAddressLabel = document.createElement("label");
  userAddressLabel.textContent = "Address";
  userAddressLabel.htmlFor = "user-address-input";
  const userFirstPasswordField = document.createElement("div");
  userFirstPasswordField.classList.add("form-floating");
  const userFirstPasswordInput = document.createElement("input");
  userFirstPasswordInput.classList.add("form-control");
  userFirstPasswordInput.id = "user-first-password-input";
  userFirstPasswordInput.type = "password";
  userFirstPasswordInput.placeholder = "Password";
  const userFirstPasswordLabel = document.createElement("label");
  userFirstPasswordLabel.textContent = "Password";
  userFirstPasswordLabel.htmlFor = "user-first-password-input";
  const userSecondPasswordField = document.createElement("div");
  userSecondPasswordField.classList.add("form-floating");
  const userSecondPasswordInput = document.createElement("input");
  userSecondPasswordInput.classList.add("form-control");
  userSecondPasswordInput.id = "user-second-password-input";
  userSecondPasswordInput.type = "password"; 
  userSecondPasswordInput.placeholder = "Repeat password";
  const userSecondPasswordLabel = document.createElement("label");
  userSecondPasswordLabel.textContent = "Repeat password";
  userSecondPasswordLabel.htmlFor = "user-second-password-input";

  const buttonsWrapper = document.createElement("div");
  buttonsWrapper.classList.add("sign-up-buttons-wrapper");
  const signUpButton = document.createElement("button");
  signUpButton.classList.add("sign-up-button");
  signUpButton.textContent = "Sign Up";
  const cancelSignUpButton = document.createElement("button");
  cancelSignUpButton.classList.add("cancel-sign-up-button");
  cancelSignUpButton.textContent = "Cancel";
  const warningMsg = document.createElement("div");
  warningMsg.classList.add("sign-up-warning-msg", "hidden");

  buttonsWrapper.append(signUpButton, cancelSignUpButton, warningMsg);
  userEmailField.append(userEmailInput, userEmailLabel);
  userFirstNameField.append(userFirstNameInput, userFirstNameLabel);
  userSecondNameField.append(userSecondNameInput, userSecondNameLabel);
  userPhoneField.append(userPhoneInput, userPhoneLabel);
  userAddressField.append(userAddressInput, userAddressLabel);
  userFirstPasswordField.append(userFirstPasswordInput, userFirstPasswordLabel);
  userSecondPasswordField.append(userSecondPasswordInput, userSecondPasswordLabel);
  signUpData.append(userEmailField, userFirstNameField, userSecondNameField, userPhoneField, userAddressField, userFirstPasswordField, userSecondPasswordField);

  signUpField.append(signUpLabel, signUpData, buttonsWrapper);
  blackBG.append(signUpField);
  document.body.append(blackBG);

  async function sendData() {
    const email = document.querySelector('#user-email-input').value;
    const firstName = document.querySelector("#user-first-name-input").value;
    const secondName = document.querySelector("#user-second-name-input").value;
    const phoneNumber = document.querySelector("#user-phone-input").value;
    const address = document.querySelector("#user-address-input").value;
    const password = document.querySelector("#user-first-password-input").value;
    const repPassword = document.querySelector("#user-second-password-input").value;
    
    if (email == "" || firstName == "" || secondName == "" || phoneNumber == "" || address == "" || password == "") {
      showAlert(warningMsg, "Fill all fields");
    } else {
      if (regExEmail.test(email)) {
        if (regExPhone.test(phoneNumber)) {
          const firstNameInput = firstName.toLowerCase();
          const secondNameInput = secondName.toLowerCase();
          if (password === repPassword) {
            const data = {
              email: email, 
              firstName: firstNameInput[0].toUpperCase() + firstNameInput.slice(1), 
              secondName: secondNameInput[0].toUpperCase() + secondNameInput.slice(1), 
              phoneNumber: phoneNumber, 
              address: address, 
              password: password, 
              cart: []
            };
            const options = {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
            }
            try {
              const request = await fetch("/api/createUser", options);
              const json = await request.json();
              if (json === "success") {
                const regSuccess = document.createElement("div");
                regSuccess.classList.add("reg-success-field");
                regSuccess.textContent = "Registration is successful";
                blackBG.removeChild(signUpField);
                blackBG.append(regSuccess);
                regSuccess.classList.add("fade-in-2s");
                setTimeout(()=>{
                  document.body.removeChild(blackBG);
                }, 1900);
              } else if (json === "user exists") {
                showAlert(warningMsg, "User already exists");
              } else {
                alert(json);
              }
            } catch(error) {
              alert(error);
            }          
          } else {
            showAlert(warningMsg, "Passwords don't match")
          }
        } else {
          showAlert(warningMsg, "Enter valid phone number");
        }
      } else {
        showAlert(warningMsg, "Enter valid email")
      }
    }
  }

  signUpButton.addEventListener("click", sendData);

  cancelSignUpButton.addEventListener("click", () => {
    document.body.removeChild(blackBG);
  })
}

signUpButtonMain.addEventListener("click", signUp);

/* login function */

const loginButtonMain = document.querySelector(".login-button-main");

function logIn() {
  const blackBG = document.createElement("div");
  blackBG.classList.add("black-background");
  const loginField = document.createElement("div");
  loginField.classList.add("login-field", "col-12", "col-sm-8", "col-lg-6", "col-xl-4");
  const loginLabel = document.createElement("div");
  loginLabel.classList.add("login-label");
  loginLabel.textContent = "Enter your email and password";
  const loginData = document.createElement("div");
  loginData.classList.add("login-data");
  const userLoginField = document.createElement("div");
  userLoginField.classList.add("form-floating");
  const userLoginInput = document.createElement("input");
  userLoginInput.classList.add("form-control");
  userLoginInput.type = "text";
  userLoginInput.id = "user-login-input";
  userLoginInput.placeholder = "Email";
  const userLoginLabel = document.createElement("label");
  userLoginLabel.htmlFor = "user-login-input";
  userLoginLabel.textContent = "Email";
  const userPasswordField = document.createElement("div");
  userPasswordField.classList.add("form-floating");
  const userPasswordInput = document.createElement("input");
  userPasswordInput.classList.add("form-control");
  userPasswordInput.id = "user-password-input";
  userPasswordInput.type = "password";
  userPasswordInput.placeholder = "Password";
  const userPasswordLabel = document.createElement("label");
  userPasswordLabel.htmlFor = "user-password-input";
  userPasswordLabel.textContent = "Password";
  const loginButtonsWrapper = document.createElement("div");
  loginButtonsWrapper.classList.add("login-buttons-wrapper");
  const loginButton = document.createElement("button");
  loginButton.classList.add("login-button");
  loginButton.textContent = "Login";
  const cancelLoginButton = document.createElement("button");
  cancelLoginButton.classList.add("cancel-login-button");
  cancelLoginButton.textContent = "Cancel";
  const warningLoginMsg = document.createElement("div");
  warningLoginMsg.classList.add("login-warning-msg");
  userLoginField.append(userLoginInput, userLoginLabel);
  userPasswordField.append(userPasswordInput, userPasswordLabel);
  loginButtonsWrapper.append(loginButton, cancelLoginButton, warningLoginMsg);
  loginData.append(userLoginField, userPasswordField);
  loginField.append(loginLabel, loginData, loginButtonsWrapper);
  blackBG.append(loginField);
  document.body.append(blackBG);

  async function loginUser() {
    const login = document.querySelector("#user-login-input").value;
    const password = document.querySelector("#user-password-input").value;
    
    if (login == "" || password == "") {
      showAlert(warningLoginMsg, "Fill all fields");
    } else {
      if (regExEmail.test(login)) {
        const userData = {email: login, password: password};
        try {
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
          };
          const request = await fetch("/api/loginUser", options);
          const json = await request.json();
          if (json === "user not found") {
            showAlert(warningLoginMsg, "User not found");
          } else if (json === "wrong password") {
            showAlert(warningLoginMsg, "Wrong password");
          } else if (json.login === "success") {
            localStorage.setItem("userDataShop", JSON.stringify(userData));
            delete json.login;
            loggedUser = json;
            loggedUserBool = true;
            if (tempCart.length !== 0) {
              if (loggedUser.cart.length == 0) {
                tempCart.forEach((item) => {
                  loggedUser.cart.push(item);
                })
              } else {
                tempCart.forEach((item) => {
                  let matchingItem;
                  
                  loggedUser.cart.forEach((product) => {
                    if (item.id === product.id) {
                      matchingItem = product;
                    }
                  })
                  if (matchingItem) {
                    matchingItem.quantity += item.quantity;
                  } else {
                    loggedUser.cart.push(item);
                  }
                });
              }
              
              tempCart.length = 0;
              localStorage.removeItem("tempCart");
              updateCart(loggedUser.cart);
            } 
            localStorage.setItem("userDataTemp", JSON.stringify(loggedUser));
            let firstName = loggedUser.firstName.length > 13 ? loggedUser.firstName.slice(0,13) + "..." : loggedUser.firstName;
            let secondName = loggedUser.secondName.length > 13 ? loggedUser.secondName.slice(0,13) + "..." : loggedUser.secondName;
            const loginSuccess = document.createElement("div");
            loginSuccess.classList.add("login-success");
            loginSuccess.textContent = `Welcome ${firstName} ${secondName}`;
            blackBG.removeChild(loginField);
            blackBG.append(loginSuccess);
            loginSuccess.classList.add("fade-in-2s");
            renderCartMenu(loggedUser);
            setTimeout(()=>{
              document.body.removeChild(blackBG);
            }, 1900);
          } else {
            alert(json);
          }
        } catch (error) {
          alert(error);
        }
      } else {
        showAlert(warningLoginMsg, "Enter valid email");
      }
    }
  }

  loginButton.addEventListener("click", loginUser);

  function cancelLogin() {
    document.body.removeChild(blackBG);
  };
  cancelLoginButton.addEventListener("click", cancelLogin);
}

async function updateCart(cart) {
  const userEmailPass = JSON.parse(localStorage.getItem("userDataShop"));
  const userCart = {email: userEmailPass.email, cart: cart};
  try {
    const options = {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userCart)
    };
    const request = await fetch("/api/user/updateCart", options);
    const json = await request.json();
    if (json !== "success") {
      alert(json);
    }
  } catch (error) {
    alert(error);
  }
}

loginButtonMain.addEventListener("click", logIn);

function renderCartDescription(cartDescription) {
  const cartCountDiv = document.querySelector(".cart-count-div");
  function renderCart(cart) {
    if (cart.length === 0) {
      cartDescription.textContent = "Cart is empty";
      cartCountDiv.textContent = "";
      cartCountDiv.classList.add("hidden");
    } else {
      let cartQuantity = 0;
      cart.forEach((item) => {
        cartQuantity += item.quantity;
        
      });
      cartDescription.textContent = `${cartQuantity} ${cartQuantity === 1 ? "item" : "items"} in cart`;
      cartCountDiv.textContent = cartQuantity;
      cartCountDiv.classList.remove("hidden");
    }
  }
  if (loggedUserBool) {
    renderCart(loggedUser.cart);
  } else {
    renderCart(tempCart);
  }
  
}

function renderCartMenu(loggedUser) {
  if (loggedUserBool) {
    const loginMenu = document.querySelector(".login-field-main");
    const loginButtonMain = document.querySelector(".login-button-main");
    const signUpButtonMain = document.querySelector(".sign-up-button-main");
    const userNameWrapper = document.createElement("div");
    userNameWrapper.classList.add("user-name-wrapper");
    const userFirstName = document.createElement("div");
    userFirstName.classList.add("user-first-name-menu");
    const userSecondName = document.createElement("div");
    userSecondName.classList.add("user-second-name-menu");
    const logOutButton = document.createElement("div");
    logOutButton.classList.add("log-out-button");
    logOutButton.textContent = "Log out";
    
    let firstName = loggedUser.firstName;
    let secondName = loggedUser.secondName;
    if (loggedUser.firstName.length > 12) {
      firstName = loggedUser.firstName.slice(0,12) + "...";
    }
    if (loggedUser.secondName.length > 12) {
      secondName = loggedUser.secondName.slice(0,12) + "...";
    }
    userFirstName.textContent = firstName;
    userSecondName.textContent = secondName;
    userNameWrapper.append(userFirstName, userSecondName);
    loginMenu.removeChild(loginButtonMain);
    loginMenu.removeChild(signUpButtonMain);
    loginMenu.append(userNameWrapper, logOutButton);
    renderCartDescription(cartDescription);

    function logOut() {
      loginMenu.removeChild(userNameWrapper);
      loginMenu.removeChild(logOutButton);
      loginMenu.innerHTML = `
      <div class="login-button-main">Login</div>
      <div class="sign-up-button-main">Sign up</div>`;
      loggedUser.length = 0;
      loggedUserBool = false;
      localStorage.removeItem("userDataShop");
      localStorage.removeItem("userDataTemp");
      localStorage.removeItem("tempCart");
      localStorage.removeItem("userOrderTemp");
      localStorage.removeItem("saveUser");
      document.querySelector(".cart-count-div").textContent = "";
      document.querySelector(".cart-count-div").classList.add("hidden");
      cartDescription.textContent = "Cart is empty";
      const loginButton = document.querySelector(".login-button-main");
      const signUpButton = document.querySelector(".sign-up-button-main");
      loginButton.addEventListener("click", logIn);
      signUpButton.addEventListener("click", signUp);
    }

    userNameWrapper.addEventListener("click", ()=> {
      localStorage.setItem("userDataTemp", JSON.stringify(loggedUser));
      location.href = "userData/userData.html";
    });

    logOutButton.addEventListener("click", logOut);
    
  } else {
    console.log("empty");
  }
}

const cartInfoMain = document.querySelector(".cart-info-main");
function goToCart() {
  if (!loggedUserBool) {
    const goToCartWarning = document.querySelector(".go-to-cart-warning");
    showAlert(goToCartWarning, "Login first!");
  } else {
    location.href = "./cart/cart.html";
  }
}
cartInfoMain.addEventListener("click", goToCart);

async function checkLoggedUser() {
  const loggedUserCheck = JSON.parse(localStorage.getItem("userDataShop")) || "";
  if (loggedUserCheck == "") {
    return;
  } else {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loggedUserCheck)
    };
    const request = await fetch("/api/loginUser", options);
    const json = await request.json();
    delete json.login;
    loggedUser = json;
    loggedUserBool = true;
    renderCartMenu(loggedUser);
  }
}


/* shop-products */
const shopItems = document.querySelector(".shop-products");
let shuffledArray = products;
document.querySelector(".all-products-button").classList.add("highlight-button");

const filterButtons = document.querySelectorAll(".filter-button");
filterButtons.forEach(button => {
  button.addEventListener('click', function() {
    this.classList.add("highlight-button");

    filterButtons.forEach(otherButton => {
      if (otherButton !== this) {
        otherButton.classList.remove("highlight-button");
      }
    });
  });
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

let filteredProducts;
function filterArray(keyword) {
  filteredProducts = products.filter((item) => {
    if (item.keywords === keyword) {
      return item;
    }
  });
  shuffleArray(filteredProducts);
  renderProducts(shopItems, filteredProducts);
  const addButtons = document.querySelectorAll(".add-to-cart-button");
  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      addItem(button);
    })
  });
}

function filterSearch(word, filteredProducts) {
  let filteredSearch;
  if (filteredProducts) { 
    filteredSearch = filteredProducts.filter((item) => {
      const itemName = item.name.toLowerCase();
      if (itemName.includes(word)) {
        return item;
      }
    });
    renderProducts(shopItems, filteredSearch);
    const addButtons = document.querySelectorAll(".add-to-cart-button");
    addButtons.forEach((button) => {
      button.addEventListener("click", () => {
        addItem(button);
      })
    });
  } else {
    filteredSearch = products.filter((item) => {
      const itemName = item.name.toLowerCase();
      if (itemName.includes(word)) {
        return item;
      }
    });
    renderProducts(shopItems, filteredSearch);
    const addButtons = document.querySelectorAll(".add-to-cart-button");
    addButtons.forEach((button) => {
      button.addEventListener("click", () => {
        addItem(button);
      })
    });
  }
}

document.querySelector(".search-input-main").addEventListener("input", () => {
  const wordInput = document.querySelector(".search-input-main").value.toLowerCase();
  filterSearch(wordInput, filteredProducts);
});

shuffleArray(shuffledArray);
renderProducts(shopItems, shuffledArray);

const allProductsButton = document.querySelector(".all-products-button");
allProductsButton.addEventListener("click", () => {
  filteredProducts = "";
  shuffleArray(shuffledArray);
  renderProducts(shopItems, shuffledArray);
  const addButtons = document.querySelectorAll(".add-to-cart-button");
  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      addItem(button);
    })
  });
})


const GPUButton = document.querySelector(".gpu-button");
GPUButton.addEventListener("click", () => {
  filterArray("gpu");
});

const CPUButton = document.querySelector(".cpu-button");
CPUButton.addEventListener("click", () => {
  filterArray("cpu");
});

const MBButton = document.querySelector(".motherboard-button");
MBButton.addEventListener("click", () => {
  filterArray("motherboard");
});

const RamButton = document.querySelector(".ram-button");
RamButton.addEventListener("click", () => {
  filterArray("ram");
});

const hdButton = document.querySelector(".hd-button");
hdButton.addEventListener("click", () => {
  filterArray("hd");
})

const PSButton = document.querySelector(".power-supply-button");
PSButton.addEventListener("click", () => {
  filterArray("ps");
});

const CCButton = document.querySelector(".computer-case-button");
CCButton.addEventListener("click", () => {
  filterArray("cc");
});

let showAddItemInterval;

function addItem(button) {
  const productID = button.dataset.id;
  let matchingItem;

  if (!loggedUserBool) {
    tempCart.forEach((item) => {
      if (item.id === productID) {
        matchingItem = item;
      };
    });
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      tempCart.push({
        id: productID,
        quantity: 1
      })
    }
    localStorage.setItem("tempCart", JSON.stringify(tempCart));
    renderCartDescription(cartDescription);
  } else {
    loggedUser.cart.forEach((item) => {
      if (item.id === productID) {
        matchingItem = item;
      };
    });
    if (matchingItem) {
      matchingItem.quantity += 1;
      localStorage.setItem("userDataTemp", JSON.stringify(loggedUser));
      updateCart(loggedUser.cart);
      renderCartDescription(cartDescription);
    } else {
      loggedUser.cart.push({
        id: productID,
        quantity: 1
      });
      localStorage.setItem("userDataTemp", JSON.stringify(loggedUser));
      updateCart(loggedUser.cart);
      renderCartDescription(cartDescription);
    }
  }
  const addItem = document.querySelector(`.PA-${productID}`);
  addItem.classList.remove("hidden");
  addItem.classList.add("fade-in-3s");
  if (addItem.classList.contains("fade-in-3s")) {
    addItem.classList.remove("fade-in-3s");
    requestAnimationFrame(()=>{
      addItem.classList.add("fade-in-3s");
    })
  }
  clearInterval(showAddItemInterval);
  showAddItemInterval = setTimeout(() => {
    addItem.classList.add("hidden");
    addItem.classList.remove("fade-in-3s");
  }, 2800);
  const otherPA = document.querySelectorAll(".product-added");
  otherPA.forEach((item) => {
    if (!item.classList.contains(`PA-${productID}`)) {
      item.classList.add("hidden");
      item.classList.remove("fade-in-3s");
    }
  })
}

const addButtons = document.querySelectorAll(".add-to-cart-button");
addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    addItem(button);
  })
});

/* make site for mobile devices  */

