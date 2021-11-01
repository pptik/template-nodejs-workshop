const Admin = require("../models/admin_model");
const { requestResponse } = require("../utils");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let response;

const getUsers = async () => {
  const user = await Admin.find({})
  return { ...requestResponse.success, data: user };
}

const deleteUsers = async (id) => {
  const user = await Admin.deleteOne({_id: id});
  return { ...requestResponse.success };
}

const registration = async ({email, password}) => {
  const saltRounds = 12;

  const user = await findAdminByEmail(email);
  if (user !== null) {
    response = { ...requestResponse.unprocessable_entity };
    response.message = "E-mail already registered";

    return response;
  }

  const hashPassword = await bcrypt.hash(password, saltRounds);
  
  await Admin.create({
    EMAIL: email,
    PASSWORD: hashPassword
  });

  return { ...requestResponse.success };
}

const login = async ({ email, password }) => {
  const admin = await Admin.findOne({ EMAIL: email }, {}, { lean: true });

  if (admin === null) {
    response = { ...requestResponse.unauthorized };
    response.message = "Entered e-mail does not match with any credentials.";

    return response;
  }

  const comparePassword = await bcrypt.compare(password, admin.PASSWORD);

  if (!comparePassword) {
    return { ...requestResponse.unauthorized };
  }

  const token = jwt.sign(
    {
      email: admin.EMAIL
    },
    'PPTIK'
  );

  return {
    ...requestResponse.success,
    data: {
      email: admin.EMAIL,
      token
    }
  };
}

const findAdminByEmail = async (email) => {
  const user = await Admin.findOne(
    {
      EMAIL: email
    }
  );

  return user;
};

module.exports = {
  registration,
  deleteUsers,
  getUsers,
  login
}