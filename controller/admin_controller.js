const adminService = require("../services/admin_service");
const { requestResponse } = require("../utils");
const logger = require("../utils/logger");

let response;


const registration = async (req, res) => {
  const { email, password } = req.body
  try {
    const admin = await adminService.registration({email, password})
    response = { ...admin };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
}

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const loginResponse = await adminService.login({ email, password });

    response = { ...loginResponse };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
}


module.exports = {
  login,
  registration
};