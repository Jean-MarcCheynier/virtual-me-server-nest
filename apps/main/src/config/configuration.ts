export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    uri: process.env.MONGO_URI,
    name: process.env.MONGO_NAME,
  },
  sap_cai: {
    auth_url: process.env.SAP_CAI_AUTH_URL,
    client_id: process.env.SAP_CAI_CLIENT_ID,
    client_secret: process.env.SAP_CAI_CLIENT_SECRET,
    dialog_url: process.env.SAP_CAI_DIALOG_URL,
    xtoken: process.env.SAP_CAI_XTOKEN,
  },
  google: {
    map_api_key: process.env.GOOGLE_MAP_API_KEY,
  },
  log: {
    level: process.env.LOG_LEVEL,
  },
});
