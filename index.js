const express = require("express");
const app = express();

app.use(express.json());

app.post("/gerar", (req, res) => {
  const urlRecebida = req.body.url;

  res.json({
    mensagem: "Recebi a URL com sucesso ✅",
    url: urlRecebida
  });
});

app.listen(3000);
