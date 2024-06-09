import DataStore from "@seald-io/nedb";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, ()=>{console.log(`listenning to ${port}`)});
app.use(express.static("public"));
app.use(express.json({ limit: "1mb"}))

const dataBase = new DataStore({ filename: "dataBase.db", autoload: true});
dataBase.setAutocompactionInterval(10000);


app.post("/api/createUser", (request, response) => {
  const data = request.body;
  dataBase.find({email: data.email}, (err, doc) => {
    if (err) {
      response.json(err);
    } 
    if (doc.length === 0) {
      dataBase.insert(data);
      response.json("success");
    } else {
      response.json("user exists");
    }
  })
});

app.post("/api/loginUser", (request, response) => {
  const data = request.body;
  const email = data.email;
  const password = data.password;
  dataBase.find({email: email}, (err, data) => {
    if (err) {
      response.json(err);
    }
    if (data.length === 0) {
      response.json("user not found");
    } else {
      if (data[0].password === password) {
        response.json({
          login: "success",
          firstName: data[0].firstName,
          secondName: data[0].secondName,
          phone: data[0].phoneNumber,
          address: data[0].address,
          cart: data[0].cart
        })
      } else {
        response.json("wrong password");
      }
    }
  })
});

app.put("/api/user/changeName", (request, response) => {
  const userData = request.body;
  dataBase.findOne({email: userData.email}, async (err, data) => {
    if (err) {
      response.json(err);
    }
    if (data.password === userData.password) {
      dataBase.updateAsync({email: userData.email}, {$set: {firstName: userData.firstName, secondName: userData.secondName}});
      response.json("name changed");
    } else {
      response.json("passwrod doesn't match");
    }
  })
});

app.put("/api/user/changePhone", (request, response) => {
  const userData = request.body;
  dataBase.findOne({email: userData.email}, async (err, data) => {
    if (err) {
      response.json(err);
    } 
    if (data.password === userData.password) {
      dataBase.updateAsync({email: userData.email}, {$set: {phoneNumber: userData.phoneNumber}});
      response.json("phone changed");
    } else {
      response.json("wrong password");
    }
  })
});

app.put("/api/user/changeAddress", (request, response) => {
  const userData = request.body;
  dataBase.findOne({email: userData.email}, async (err, data) => {
    if (err) {
      response.json(err);
    }
    if (data.password === userData.password) {
      dataBase.updateAsync({email: userData.email}, {$set: {address: userData.address}});
      response.json("address changed");
    } else {
      response.json("wrong password");
    }
  })
});

app.put("/api/user/checkPassword", (reqest, response) => {
  const userData = reqest.body;
  dataBase.findOne({email: userData.email}, (err, data) => {
    if (err) {
      response.json(err);
    }
    if (data.password === userData.password) {
      response.json("dobro");
    } else {
      response.json("wrong password");
    }
  })
});

app.put("/api/user/changePassword", (request, response) => {
  const userData = request.body;
  dataBase.findOne({email: userData.email}, async (err, data) => {
    if (err) {
      response.json(err);
    }
    if (data.length == 0) {
      response.json("user not found");
    } else {
      dataBase.updateAsync({email: userData.email}, {$set: {password: userData.password}});
      response.json("password changed");
    }
  })
});

app.put("/api/user/deleteProfile", (request, response) => {
  const userData = request.body;
  dataBase.findOne({email: userData.email}, async (err, data) => {
    if (err) {
      response.json(err);
    } 
    if (data.password === userData.password) {
      await dataBase.removeAsync({email: userData.email}, {});
      response.json("user deleted");
    } else {
      response.json("wrong password");
    }
  })
});

app.put("/api/user/updateCart", (request, response) => {
  const userData = request.body;
  dataBase.findOne({email: userData.email}, async (err, data) => {
    if (err) {
      response.json(err);
    }
    if (data) {
      dataBase.updateAsync({email: userData.email}, {$set: {cart: userData.cart}});
      response.json("success");
    } else {
      response.json("user not found");
    }
  })
});

app.put("/api/user/deleteProduct", (request, response) => {
  const userData = request.body;
  dataBase.findOne({email: userData.email}, async (err, data) => {
    if (err) {
      response.json(err);
    } 
    if (data) {
      const index = data.cart.findIndex(item => item.id == userData.productId);
      if (index !== -1) {
        await dataBase.updateAsync({email: userData.email}, {$pull: {cart: {id: userData.productId}}});
        response.json("product deleted");
      } else {
        response.json("product was not found");
      }
    } else {
      response.json("user not found");
    }
  })
});

app.put("/api/user/updateItemQuantity", (request, response) => {
  const userData = request.body;
  dataBase.findOne({email: userData.email}, async (err, data) => {
    if (err) {
      response.json(err);
    }
    if (data) {
      const index = data.cart.findIndex(item => item.id === userData.productID);
      if (index !== -1) {
        data.cart[index].quantity = userData.quantity;
        dataBase.update({email: userData.email}, data, {});
        response.json("quantity updated");
      } else {
        response.json("product was not found");
      }
    } else {
      response.json("user not found");
    }
  })
})

