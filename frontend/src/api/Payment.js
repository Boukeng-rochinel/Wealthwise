import axios from "axios";

const baseUrl = "https://sandbox.fapshi.com";
const headers = {
  apiuser: "3686c704-3dec-4db3-a833-512de4659128",
  apikey: "FAK_TEST_7bdff1fccce0b72dfc68",
};

// Fonction d'erreur
function error(message, statusCode) {
  return { status: "error", message, statusCode };
}

const fapshiAPI = {
  /**
   * Initialise un paiement avec redirection
   */
  initiatePay: async function (data) {
    try {
      if (!data?.amount) return error("amount required", 400);
      if (!Number.isInteger(data.amount))
        return error("amount must be of type integer", 400);
      if (data.amount < 100)
        return error("amount cannot be less than 100 XAF", 400);

      const config = {
        method: "post",
        url: baseUrl + "/initiate-pay",
        headers: headers,
        data: data,
      };

      const response = await axios(config);
      return { ...response.data, statusCode: response.status };
    } catch (e) {
      return error(
        e?.response?.data?.message || "An error occurred",
        e?.response?.status || 500
      );
    }
  },

  /**
   * Paiement direct sur mobile
   */
  directPay: async function (data) {
    try {
      if (!data?.amount) return error("amount required", 400);
      if (!Number.isInteger(data.amount))
        return error("amount must be of type integer", 400);
      if (data.amount < 100)
        return error("amount cannot be less than 100 XAF", 400);
      if (!data?.phone) return error("phone number required", 400);
      if (typeof data.phone !== "string")
        return error("phone must be of type string", 400);
      if (!/^6[\d]{8}$/.test(data.phone))
        return error("invalid phone number", 400);

      const config = {
        method: "post",
        url: baseUrl + "/direct-pay",
        headers: headers,
        data: data,
      };

      const response = await axios(config);
      return { ...response.data, statusCode: response.status };
    } catch (e) {
      return error(
        e?.response?.data?.message || "An error occurred",
        e?.response?.status || 500
      );
    }
  },

  /**
   * Vérification du statut d'un paiement
   */
  paymentStatus: async function (transId) {
    try {
      if (!transId || typeof transId !== "string")
        return error("invalid type, string expected", 400);
      if (!/^[a-zA-Z0-9]{8,10}$/.test(transId))
        return error("invalid transaction id", 400);

      const config = {
        method: "get",
        url: baseUrl + "/payment-status/" + transId,
        headers: headers,
      };

      const response = await axios(config);
      return { ...response.data, statusCode: response.status };
    } catch (e) {
      return error(
        e?.response?.data?.message || "An error occurred",
        e?.response?.status || 500
      );
    }
  },

  /**
   * Expiration d'un paiement
   */
  expirePay: async function (transId) {
    try {
      if (!transId || typeof transId !== "string")
        return error("invalid type, string expected", 400);
      if (!/^[a-zA-Z0-9]{8,10}$/.test(transId))
        return error("invalid transaction id", 400);

      const config = {
        method: "post",
        url: baseUrl + "/expire-pay",
        headers: headers,
        data: { transId },
      };

      const response = await axios(config);
      return { ...response.data, statusCode: response.status };
    } catch (e) {
      return error(
        e?.response?.data?.message || "An error occurred",
        e?.response?.status || 500
      );
    }
  },

  /**
   * Récupération des transactions d'un utilisateur
   */
  userTrans: async function (userId) {
    try {
      if (!userId || typeof userId !== "string")
        return error("invalid type, string expected", 400);

      const config = {
        method: "get",
        url: baseUrl + "/transaction/" + userId,
        headers: headers,
      };

      const response = await axios(config);
      return response.data;
    } catch (e) {
      return error(
        e?.response?.data?.message || "An error occurred",
        e?.response?.status || 500
      );
    }
  },

  /**
   * Vérification du solde
   */
  balance: async function () {
    try {
      const config = {
        method: "get",
        url: baseUrl + "/balance",
        headers: headers,
      };

      const response = await axios(config);
      return { ...response.data, statusCode: response.status };
    } catch (e) {
      return error(
        e?.response?.data?.message || "An error occurred",
        e?.response?.status || 500
      );
    }
  },
};

export default fapshiAPI;
