const crypto = require("crypto");
const algorithm = "aes-256-cbc";

const decodeCTC = async function (data, vi) {
  let orginalVi = Buffer.from(vi, "base64");
  let decipher = crypto.createDecipheriv(
    algorithm,
    process.env.CTC_SECRETE_KEY.slice(0, 32),
    orginalVi
  );
  let decryptedData = decipher.update(data, "hex", "utf-8");

  decryptedData += decipher.final("utf8");

  return decryptedData;
};

module.exports = decodeCTC;
