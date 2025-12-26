const express = require("express");
const https = require("https");

const app = express();
app.use(express.json());

// liberar acesso (CORS)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// rota teste
app.get("/", (req, res) => {
  res.send("Cérebro online 🚀");
});

// função para buscar texto da página
function buscarPagina(url) {
  return new Promise((resolve, reject) => {
    https.get(url, resp => {
      let data = "";

      resp.on("data", chunk => {
        data += chunk;
      });

      resp.on("end", () => {
        const textoLimpo = data
          .replace(/<script[\s\S]*?<\/script>/gi, "")
          .replace(/<style[\s\S]*?<\/style>/gi, "")
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim();

        resolve(textoLimpo);
      });
    }).on("error", err => reject(err));
  });
}

// rota de resumo
app.post("/gerar", async (req, res) => {
  const url = req.body.url;

  if (!url || !url.startsWith("http")) {
    return res.json({ erro: "URL inválida" });
  }

  try {
    const texto = await buscarPagina(url);

    const resumo = texto.substring(0, 800) + "...";

    res.json({
      resumo
    });
  } catch (e) {
    res.json({ erro: "Erro ao acessar a página" });
  }
});

app.listen(3000);
