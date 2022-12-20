const { getPropertyValue } = require("./getPriceAndProperty");

exports.FetchProperties = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);

  console.log(`[+]  `, {
    property: getPropertyValue(),
    statusMessage: "property fetched",
    status: true,
  });
  res.send({
    property: getPropertyValue(),
    statusMessage: "property fetched",
    status: true,
  });
};
