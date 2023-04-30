const CustomerService = require("../services/customer-service");
const UserAuth = require("./middlewares/auth");
const { PublishMessage  } = require("../utils/index");
const { SHOPPING_SERVICE } = require("../config");

module.exports = (app, channel) => {
  const service = new CustomerService();

  // SubscribeMessage(channel, service);

  app.post("/signup", async (req, res, next) => {
      const { email, password, phone } = req.body;
      const { data } = await service.SignUp({ email, password, phone });
      return res.json(data);
  });

  app.post("/login", async (req, res, next) => {
      const { email, password } = req.body;
      const { data } = await service.SignIn({ email, password });
      return res.json(data);
  });

  app.post("/address", UserAuth, async (req, res, next) => {
      const { _id } = req.user;
      const { street, postalCode, city, country } = req.body;
      const { data } = await service.AddNewAddress(_id, {
        street,
        postalCode,
        city,
        country,
      });
      return res.json(data);
  });

  app.get("/profile", UserAuth, async (req, res, next) => {
      const { _id } = req.user;
      const { data } = await service.GetProfile({ _id });
      return res.json(data);

  });

  app.delete("/profile", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const { data, payload } = await service.DeleteProfile(_id);
    // Send message to Shopping Service for removing cart & wishlist
    PublishMessage(channel, SHOPPING_SERVICE, JSON.stringify(payload));
    return res.json(data);
  });

};
