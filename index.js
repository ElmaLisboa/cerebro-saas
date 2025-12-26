const express = require("express");
const app = express();

app.use(express.json());

// liberar acesso (CORS)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// rota de teste
app.get("/", (req, res) => {
  res.send("Cérebro online 🚀");
});

// rota principal
app.post("/gerar", (req, res) => {
  const urlRecebida = req.body.url;

  res.json({
    mensagem: "Recebi a URL com sucesso ✅",
    url: urlRecebida
  });
});

app.listen(3000);
