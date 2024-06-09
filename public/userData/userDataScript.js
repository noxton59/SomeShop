const userData = JSON.parse(localStorage.getItem("userDataTemp"));
const userEmailPass = JSON.parse(localStorage.getItem("userDataShop"));

const linkBackToShop = document.querySelector(".link-back-to-shop");
linkBackToShop.addEventListener("click", ()=>{
  location.href = "../index.html";
});

const userInfoWrapper = document.querySelector(".user-info-wrapper");

renderUserInfo();

function renderUserInfo() {
  let showAlertWarningMsg;

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
    clearInterval(showAlertWarningMsg);
    showAlertWarningMsg = setTimeout(() => {
      alert.classList.add("hidden");
      alert.classList.remove("fade-in-3s");
      alert.textContent = "";
    }, 2800);
  }
  
  const userNameWrapper = document.createElement("div");
  userNameWrapper.classList.add("user-name-wrapper");
  const userNameLabel = document.createElement("div");
  userNameLabel.classList.add("user-name-label");
  userNameLabel.textContent = "Name";
  const userName = document.createElement("div");
  userName.classList.add("user-name");
  userName.textContent = `${userData.firstName} ${userData.secondName}`;
  const userChangeNameWrapper = document.createElement("div");
  userChangeNameWrapper.classList.add("user-change-name-wrapper");
  const userNameChangeButton = document.createElement("button");
  userNameChangeButton.classList.add("user-name-change-button");
  userNameChangeButton.textContent = "Change Name";
  userChangeNameWrapper.append(userNameChangeButton);
  userNameWrapper.append(userNameLabel, userName, userChangeNameWrapper);
  const userPhoneWrapper = document.createElement("div");
  userPhoneWrapper.classList.add("user-phone-wrapper");
  const userPhoneLabel = document.createElement("div");
  userPhoneLabel.classList.add("user-phone-label");
  userPhoneLabel.textContent = "Phone"
  const userPhone = document.createElement("div");
  userPhone.classList.add("user-phone");
  userPhone.textContent = `${userData.phone}`;
  const userChangePhoneWrapper = document.createElement("div");
  userChangePhoneWrapper.classList.add("user-change-phone-wrapper");
  const userPhoneChangeButton = document.createElement("button");
  userPhoneChangeButton.classList.add("user-phone-change-button");
  userPhoneChangeButton.textContent = "Change Phone";
  userChangePhoneWrapper.append(userPhoneChangeButton);
  userPhoneWrapper.append(userPhoneLabel, userPhone, userChangePhoneWrapper);
  const userAddressWrapper = document.createElement("div");
  userAddressWrapper.classList.add("user-address-wrapper");
  const userAddressLabel = document.createElement("div");
  userAddressLabel.classList.add("user-address-label");
  userAddressLabel.textContent = "Address";
  const userAddress = document.createElement("div");
  userAddress.classList.add("user-address");
  userAddress.textContent = `${userData.address}`;
  const userChangeAddressWrapper = document.createElement("div");
  userChangeAddressWrapper.classList.add("user-change-address-wrapper");
  const userAddressChangeButton = document.createElement("button");
  userAddressChangeButton.classList.add("user-address-change-button");
  userAddressChangeButton.textContent = "Change Address";
  userChangeAddressWrapper.append(userAddressChangeButton);
  userAddressWrapper.append(userAddressLabel, userAddress, userChangeAddressWrapper);
  const userCartWrapper = document.createElement("div");
  userCartWrapper.classList.add("user-cart-wrapper");
  const userCart = document.createElement("div");
  userCart.classList.add("user-cart");
  countCartItems();
  const goToCart = document.createElement("button");
  goToCart.classList.add("go-to-cart-user");
  goToCart.textContent = "Go to Cart";
  userCartWrapper.append(userCart, goToCart);
  const userChangePasswordWrapper = document.createElement("div");
  userChangePasswordWrapper.classList.add("user-change-password-wrapper");
  const userChangePasswordButton = document.createElement("button");
  userChangePasswordButton.classList.add("user-change-password-button");
  userChangePasswordButton.textContent = "Change Password";
  userChangePasswordWrapper.append(userChangePasswordButton);
  const userDeleteProfileWrapper = document.createElement("div");
  userDeleteProfileWrapper.classList.add("user-delete-profile-wrapper");
  const userDeleteProfileButton = document.createElement("button");
  userDeleteProfileButton.classList.add("user-delete-profile-button");
  userDeleteProfileButton.textContent = "Delete profile";
  userDeleteProfileWrapper.append(userDeleteProfileButton);

  userInfoWrapper.append(userNameWrapper, userPhoneWrapper, userAddressWrapper, userCartWrapper, userChangePasswordWrapper, userDeleteProfileWrapper);

  function changeName() {
    const wrapper = document.querySelector(".user-change-name-wrapper");
    const userInfoChangeNameWrapper = document.createElement("div");
    userInfoChangeNameWrapper.classList.add("user-info-change-name-wrapper");
    const userInfoFirstNameLabel = document.createElement("label");
    userInfoFirstNameLabel.classList.add("user-info-first-name-label");
    userInfoFirstNameLabel.htmlFor = "user-info-first-name-input";
    userInfoFirstNameLabel.textContent = "First Name";
    const userInfoFirstNameInput = document.createElement("input");
    userInfoFirstNameInput.type = "text";
    userInfoFirstNameInput.id = "user-info-first-name-input";
    const userInfoSecondNameLabel = document.createElement("label");
    userInfoSecondNameLabel.classList.add("user-info-second-name-label");
    userInfoSecondNameLabel.htmlFor = "user-info-second-name-input";
    userInfoSecondNameLabel.textContent = "Second Name";
    const userInfoSecondNameInput = document.createElement("input");
    userInfoSecondNameInput.type = "text";
    userInfoSecondNameInput.id = "user-info-second-name-input";
    const userInfoChangeNameButtonWrapper = document.createElement("div");
    userInfoChangeNameButtonWrapper.classList.add("user-info-change-name-button-wrapper");
    const userInfoChangeNameButton = document.createElement("button");
    userInfoChangeNameButton.classList.add("user-info-change-name-button");
    userInfoChangeNameButton.textContent = "Change Name";
    const userInfoChangeNameCancelButton = document.createElement("button");
    userInfoChangeNameCancelButton.classList.add("user-info-change-name-cancel-button");
    userInfoChangeNameCancelButton.textContent = "Cancel";
    const userInfoChangeNameWarningMsg = document.createElement("div");
    userInfoChangeNameWarningMsg.classList.add("user-info-change-name-warning-msg", "hidden");
    userInfoChangeNameWrapper.append(userInfoFirstNameLabel, userInfoFirstNameInput, userInfoSecondNameLabel, userInfoSecondNameInput);
    userInfoChangeNameButtonWrapper.append(userInfoChangeNameButton, userInfoChangeNameCancelButton, userInfoChangeNameWarningMsg);

    wrapper.removeChild(userNameChangeButton);
    wrapper.append(userInfoChangeNameWrapper, userInfoChangeNameButtonWrapper);

    userInfoChangeNameButton.addEventListener("click", async () => {
      const firstNameValue = userInfoFirstNameInput.value;
      const secondNameValue = userInfoSecondNameInput.value;

      if (firstNameValue == "" || secondNameValue == "") {
        showAlert(userInfoChangeNameWarningMsg, "Fill all fields");
      } else {
        const firstNameInput = firstNameValue.toLowerCase();
        const firstName = firstNameInput[0].toUpperCase() + firstNameInput.slice(1);
        const secondNameInput = secondNameValue.toLowerCase();
        const secondName = secondNameInput[0].toUpperCase() + secondNameInput.slice(1);
        const userName = {
          firstName: firstName,
          secondName: secondName, 
          email: userEmailPass.email, 
          password: userEmailPass.password};
        try {
          const options = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(userName)
          };
          const request = await fetch("/api/user/changeName", options);
          const json = await request.json();
          if (json === "name changed") {
            userData.firstName = firstName;
            userData.secondName = secondName;
            localStorage.setItem("userDataTemp", JSON.stringify(userData));
            document.querySelector(".user-name").textContent = `${userData.firstName} ${userData.secondName}`;
            wrapper.removeChild(userInfoChangeNameWrapper);
            wrapper.removeChild(userInfoChangeNameButtonWrapper);
            wrapper.append(userNameChangeButton);
          } else {
            alert(json);
          }
        } catch (error) {
          alert(error);
        }
      }
    })
    
    userInfoChangeNameCancelButton.addEventListener("click", () => {
      wrapper.removeChild(userInfoChangeNameWrapper);
      wrapper.removeChild(userInfoChangeNameButtonWrapper);
      wrapper.append(userNameChangeButton);
    })
  }

  userNameChangeButton.addEventListener("click", changeName);

  function changePhone() {  
    const userInfoChangePhoneField = document.createElement("div");
    userInfoChangePhoneField.classList.add("user-info-change-phone-field");
    const userInfoChangePhoneLabel = document.createElement("label");
    userInfoChangePhoneLabel.htmlFor = "user-info-change-phone-input";
    userInfoChangePhoneLabel.textContent = "Phone Number";
    const userInfoChangePhoneInput = document.createElement("input");
    userInfoChangePhoneInput.id = "user-info-change-phone-input";
    userInfoChangePhoneInput.type = "tel";
    userInfoChangePhoneInput.placeholder = "+1-234-567-89-01";
    const userInfoChangePhoneButtonWrapper = document.createElement("div");
    userInfoChangePhoneButtonWrapper.classList.add("user-info-change-phone-button-wrapper");
    const userInfoChangePhoneChangeButton = document.createElement("button");
    userInfoChangePhoneChangeButton.classList.add("user-info-change-phone-button");
    userInfoChangePhoneChangeButton.textContent = "Change Phone";
    const userInfoChangePhoneCancelButton = document.createElement("button");
    userInfoChangePhoneCancelButton.classList.add("user-info-change-phone-cancel-button");
    userInfoChangePhoneCancelButton.textContent = "Cancel";
    const userInfoChangePhoneWarningMsg = document.createElement("div");
    userInfoChangePhoneWarningMsg.classList.add("user-info-change-phone-warning", "hidden");
    userInfoChangePhoneField.append(userInfoChangePhoneLabel, userInfoChangePhoneInput);
    userInfoChangePhoneButtonWrapper.append(userInfoChangePhoneChangeButton, userInfoChangePhoneCancelButton, userInfoChangePhoneWarningMsg);

    userChangePhoneWrapper.removeChild(userPhoneChangeButton);
    userChangePhoneWrapper.append(userInfoChangePhoneField, userInfoChangePhoneButtonWrapper);

    userInfoChangePhoneChangeButton.addEventListener("click", async () => {
      const phoneNumber = userInfoChangePhoneInput.value;
      const regEx = /^\+*\d{1,3}[-\s]*\d{1,4}[-\s]*\d{1,4}[-\s]*\d{1,4}[-\s]*\d{1,4}$/;

      if (phoneNumber == "") {
        showAlert(userInfoChangePhoneWarningMsg, "Enter phone number");
      } else {
        if (regEx.test(phoneNumber)) {
          const userPhone = {phoneNumber: phoneNumber, email: userEmailPass.email, password: userEmailPass.password};
          try {
            const options = {
              method: "PUT", 
              headers: {
                "Content-Type": "application/json"
              }, 
              body: JSON.stringify(userPhone)
            };
            const request = await fetch("/api/user/ChangePhone", options);
            const json = await request.json();
            if (json === "phone changed") {
              userData.phone = phoneNumber;
              localStorage.setItem("userDataTemp", JSON.stringify(userData));
              document.querySelector(".user-phone").textContent = userData.phone;
              userChangePhoneWrapper.removeChild(userInfoChangePhoneField);
              userChangePhoneWrapper.removeChild(userInfoChangePhoneButtonWrapper);
              userChangePhoneWrapper.append(userPhoneChangeButton);
            } else {
              alert(json);
            }
          } catch (error) {
            alert(error);
          }
        } else {
          showAlert(userInfoChangePhoneWarningMsg, "Enter valid phone number");
        }
      }
    });

    userInfoChangePhoneCancelButton.addEventListener("click", () => {
      userChangePhoneWrapper.removeChild(userInfoChangePhoneField);
      userChangePhoneWrapper.removeChild(userInfoChangePhoneButtonWrapper);
      userChangePhoneWrapper.append(userPhoneChangeButton);
    })
  }
  
  userPhoneChangeButton.addEventListener("click", changePhone);

  function changeAddress() {
    const userInfoChangeAddressField = document.createElement("div");
    userInfoChangeAddressField.classList.add("user-info-change-address-field");
    const userInfoChangeAddressLabel = document.createElement("label");
    userInfoChangeAddressLabel.htmlFor = "user-info-change-address-input";
    userInfoChangeAddressLabel.textContent = "Address";
    const userInfoChangeAddressInput = document.createElement("input");
    userInfoChangeAddressInput.id = "user-info-change-address-input";
    userInfoChangeAddressInput.type = "text";
    const userInfoChangeAddressButtonWrapper = document.createElement("div");
    userInfoChangeAddressButtonWrapper.classList.add("user-info-change-address-button-wrapper");
    const userInfoChangeAddressButton = document.createElement("button");
    userInfoChangeAddressButton.classList.add("user-info-change-address-button");
    userInfoChangeAddressButton.textContent = "Change address";
    const userInfoChangeAddressCancelButton = document.createElement("button");
    userInfoChangeAddressCancelButton.classList.add("user-info-change-address-cancel-button");
    userInfoChangeAddressCancelButton.textContent = "Cancel";
    const userInfoChangeAddressWarning = document.createElement("div");
    userInfoChangeAddressWarning.classList.add("user-info-change-address-warning", "hidden");

    userInfoChangeAddressField.append(userInfoChangeAddressLabel, userInfoChangeAddressInput);
    userInfoChangeAddressButtonWrapper.append(userInfoChangeAddressButton, userInfoChangeAddressCancelButton, userInfoChangeAddressWarning);
    userChangeAddressWrapper.removeChild(userAddressChangeButton);
    userChangeAddressWrapper.append(userInfoChangeAddressField, userInfoChangeAddressButtonWrapper);

    userInfoChangeAddressButton.addEventListener("click", async () => {
      const newAddress = userInfoChangeAddressInput.value;
      if (newAddress == "") {
        showAlert(userInfoChangeAddressWarning, "Enter address");
      } else {
        const userAddress = {address: newAddress, email: userEmailPass.email, password: userEmailPass.password};
        try {
          const options = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            }, 
            body: JSON.stringify(userAddress)
          };
          const request = await fetch("/api/user/changeAddress", options);
          const json = await request.json();
          if (json === "address changed") {
            userData.address = newAddress;
            localStorage.setItem("userDataTemp", JSON.stringify(userData));
            document.querySelector(".user-address").textContent = `${userData.address}`;
            userChangeAddressWrapper.removeChild(userInfoChangeAddressField);
            userChangeAddressWrapper.removeChild(userInfoChangeAddressButtonWrapper);
            userChangeAddressWrapper.append(userAddressChangeButton);
          } else {
            alert(json);
          }
        } catch (error) {
          alert(error);
        }
      }
    });

    userInfoChangeAddressCancelButton.addEventListener("click", () => {
      userChangeAddressWrapper.removeChild(userInfoChangeAddressField);
      userChangeAddressWrapper.removeChild(userInfoChangeAddressButtonWrapper);
      userChangeAddressWrapper.append(userAddressChangeButton);
    });
    
  }

  goToCart.addEventListener("click", ()=> {
    location.href = "../cart/cart.html";
  })
  function countCartItems() {
    if (userData.cart.length == 0) {
      userCart.textContent = "Cart is empty";
    } else {
      let itemsCount = 0;
      userData.cart.forEach((item) => {
        itemsCount += item.quantity;
      });
      userCart.textContent = `${itemsCount} ${itemsCount == 1 ? "item" : "items"} in cart`;
    }
  }

  userAddressChangeButton.addEventListener("click", changeAddress);

  function changePassword() {
    const userInfoPreviousPasswordField = document.createElement("div");
    userInfoPreviousPasswordField.classList.add("user-info-previous-password");
    const userInfoPreviousPasswordLabel = document.createElement("label");
    userInfoPreviousPasswordLabel.htmlFor = "user-info-previous-password-input";
    userInfoPreviousPasswordLabel.textContent = "Previous Password";
    const userInfoPreviousPasswordInput = document.createElement("input");
    userInfoPreviousPasswordInput.id = "user-info-previous-password-input";
    userInfoPreviousPasswordInput.type = "password";
    const userInfoPreviousPasswordButtonWrapper = document.createElement("div");
    userInfoPreviousPasswordButtonWrapper.classList.add("user-info-previous-password-button-wrapper");
    const userInfoPreviousPasswordContinueButton = document.createElement("button");
    userInfoPreviousPasswordContinueButton.classList.add("user-info-previous-password-continue-button");
    userInfoPreviousPasswordContinueButton.textContent = "Continue";
    const UIPPCancelButton = document.createElement("button");
    UIPPCancelButton.classList.add("UIPP-cancel-button");
    UIPPCancelButton.textContent = "Cancel";
    const UIPPWarning = document.createElement("div");
    UIPPWarning.classList.add("UIPP-warning", "hidden");

    userInfoPreviousPasswordField.append(userInfoPreviousPasswordLabel, userInfoPreviousPasswordInput);
    userInfoPreviousPasswordButtonWrapper.append(userInfoPreviousPasswordContinueButton, UIPPCancelButton, UIPPWarning);
    userChangePasswordWrapper.removeChild(userChangePasswordButton);
    userChangePasswordWrapper.append(userInfoPreviousPasswordField, userInfoPreviousPasswordButtonWrapper);

    userInfoPreviousPasswordContinueButton.addEventListener("click", async () => {
      const previousPassword = userInfoPreviousPasswordInput.value;
      try {
        if (previousPassword == "") {
          showAlert(UIPPWarning, "Enter previous password");
        } else {
          const userPassword = {password: previousPassword, email: userEmailPass.email};
          const options = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            }, 
            body: JSON.stringify(userPassword)
          };
          const request = await fetch("/api/user/checkPassword", options);
          const json = await request.json();
          if (json === "dobro") {
            const UINPWrapper = document.createElement("div");
            UINPWrapper.classList.add("UINP-wrapper");
            const UINPField = document.createElement("div");
            UINPField.classList.add("UINP-field");
            const UIFPLabel = document.createElement("label");
            UIFPLabel.htmlFor = "UIFP-input";
            UIFPLabel.textContent = "New Password";
            const UIFPInput = document.createElement("input");
            UIFPInput.type = "password";
            UIFPInput.id = "UIFP-input";
            const UISPLabel = document.createElement("label");
            UISPLabel.htmlFor = "UISP-input";
            UISPLabel.textContent = "Repeat Password";
            const UISPInput = document.createElement("input");
            UISPInput.type = "password";
            UISPInput.id = "UISP-input";
            const UINPButtonWrapper = document.createElement("div");
            UINPButtonWrapper.classList.add("UINP-button-wrapper");
            const UINPConfirmButton = document.createElement("button");
            UINPConfirmButton.classList.add("UINP-confirm-button");
            UINPConfirmButton.textContent = "Confirm";
            const UINPCancelButton = document.createElement("button");
            UINPCancelButton.classList.add("UINP-cancel-button");
            UINPCancelButton.textContent = "Cancel";
            const UINPWarning = document.createElement("div");
            UINPWarning.classList.add("UINP-warning", "hidden");
  
            UINPField.append(UIFPLabel, UIFPInput, UISPLabel, UISPInput);
            UINPWrapper.append(UINPField);
            UINPButtonWrapper.append(UINPConfirmButton, UINPCancelButton, UINPWarning);
  
            userChangePasswordWrapper.removeChild(userInfoPreviousPasswordField);
            userChangePasswordWrapper.removeChild(userInfoPreviousPasswordButtonWrapper);
  
            userChangePasswordWrapper.append(UINPWrapper, UINPButtonWrapper);
  
            UINPConfirmButton.addEventListener("click", async () => {
              const newPassword = UIFPInput.value;
              const repPassword = UISPInput.value;
  
              if (newPassword == "") {
                showAlert(UINPWarning, "Enter new password");
              } else {
                if (newPassword === repPassword) {
                  const userNewPassword = {email: userEmailPass.email, password: newPassword};
                  try {
                    const options = {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify(userNewPassword)
                    };
                    const request = await fetch("/api/user/changePassword", options);
                    const json = await request.json();
                    if (json === "password changed") {
                      userEmailPass.password = newPassword;
                      localStorage.setItem("userDataShop", JSON.stringify(userEmailPass));
                      const passChanged = document.createElement("div");
                      passChanged.classList.add("pass-changed");
                      passChanged.textContent = "Password changed";
                      userChangePasswordWrapper.append(passChanged);
                      passChanged.classList.add("fade-in-2s");
                      setTimeout(()=>{
                        userChangePasswordWrapper.removeChild(UINPWrapper);
                        userChangePasswordWrapper.removeChild(UINPButtonWrapper);
                        userChangePasswordWrapper.removeChild(passChanged);
                        userChangePasswordWrapper.append(userChangePasswordButton);
                      }, 1900);
                    } else if (json === "user not found") {
                      alert("Login error occurred, relogin on main page");
                    }
                  } catch (err) {
                    alert(err);
                  }
                } else {
                  showAlert(UINPWarning, "Passwords don't match");
                }
              }
            });
            
            UINPCancelButton.addEventListener("click", () => {
              userChangePasswordWrapper.removeChild(UINPWrapper);
              userChangePasswordWrapper.removeChild(UINPButtonWrapper);
              userChangePasswordWrapper.append(userChangePasswordButton);
            })
          } else if (json === "wrong password") {
            showAlert(UIPPWarning, "Wrong previous password");
          }
        }
      } catch (error) {
        alert(error);
      }
    })

    UIPPCancelButton.addEventListener("click", () => {
      userChangePasswordWrapper.removeChild(userInfoPreviousPasswordField);
      userChangePasswordWrapper.removeChild(userInfoPreviousPasswordButtonWrapper);
      userChangePasswordWrapper.append(userChangePasswordButton);
    })
  }

  userChangePasswordButton.addEventListener("click", changePassword);

  function deleteProfile() {
    const UICDWrapper = document.createElement("div");
    UICDWrapper.classList.add("UICD-wrapper");
    const UICDText = document.createElement("div");
    UICDText.classList.add("UICDText");
    UICDText.textContent = "Are you sure? Your account will be impossible to recover."
    const UICDPasswordWrapper = document.createElement("div");
    UICDPasswordWrapper.classList.add("UICD-password-wrapper");
    const UICDLabel = document.createElement("label");
    UICDLabel.htmlFor = "UICD-password-input";
    UICDLabel.textContent = "Enter password";
    const UICDPasswordInput = document.createElement("input");
    UICDPasswordInput.id = "UICD-password-input";
    UICDPasswordInput.type = "password";
    const UICDButtonWrapper = document.createElement("div");
    UICDButtonWrapper.classList.add("UICD-button-wrapper");
    const UICDButton = document.createElement("button");
    UICDButton.classList.add("UICD-button");
    UICDButton.textContent = "Delete";
    const UICDCancelButton = document.createElement("button");
    UICDCancelButton.classList.add("UICD-cancel-button");
    UICDCancelButton.textContent = "Cancel";
    const UICDWarning = document.createElement("div");
    UICDWarning.classList.add("UICD-warning", "hidden");

    UICDPasswordWrapper.append(UICDLabel, UICDPasswordInput);
    UICDButtonWrapper.append(UICDButton, UICDCancelButton, UICDWarning);
    UICDWrapper.append(UICDText, UICDPasswordWrapper, UICDButtonWrapper);
    userDeleteProfileWrapper.removeChild(userDeleteProfileButton)
    userDeleteProfileWrapper.append(UICDWrapper);
    
    UICDButton.addEventListener("click", async () => {
      const userPassword = UICDPasswordInput.value;
      if (userPassword == "") {
        showAlert(UICDWarning, "Enter password");
      } else {
        try {
          const userInfo = {email: userEmailPass.email, password: userPassword};
          const options = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            }, 
            body: JSON.stringify(userInfo)
          };
          const request = await fetch("/api/user/deleteProfile", options);
          const json = await request.json();
          if (json === "user deleted") {
            const UICDSuccess = document.createElement("div");
            UICDSuccess.classList.add("UICD-success");
            UICDSuccess.textContent = "User deleted";
            UICDWrapper.append(UICDSuccess);
            UICDSuccess.classList.add("fade-in-2s");
            setTimeout(()=>{
              localStorage.removeItem("userDataTemp");
              localStorage.removeItem("userDataShop");
              localStorage.removeItem("tempCart");
              localStorage.removeItem("userOrderTemp");
              localStorage.removeItem("saveUser");
              location.href = "../index.html";
            }, 1900);
          } else if (json === "wrong password") {
            showAlert(UICDWarning, "Wrong password");
          } else {
            alert(json);
          }
        } catch (error) {
          alert(error);
        }
      }
      
    })

    UICDCancelButton.addEventListener("click", () => {
      userDeleteProfileWrapper.removeChild(UICDWrapper);
      userDeleteProfileWrapper.append(userDeleteProfileButton);
    })
  }

  userDeleteProfileButton.addEventListener("click", deleteProfile);
}
