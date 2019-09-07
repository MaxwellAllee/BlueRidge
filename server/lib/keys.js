keys ={
    "type": "service_account",
    "project_id": process.env.G_NAME,
    "private_key_id": process.env.G_keyId,
    "private_key": process.env.G_privateKey,
    "client_email": process.env.G_email,
    "client_id": process.env.G_clientId,
    "auth_uri": process.env.G_authUri,
    "token_uri": process.env.G_token,
    "auth_provider_x509_cert_url": process.env.G_auth,
    "client_x509_cert_url": process.env.G_cert
  }
module.exports = keys