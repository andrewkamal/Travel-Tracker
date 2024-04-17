import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Password123",
  port: 5432,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
db.connect();

async function getVistedCountries() {
  const result = await db.query("SELECT country FROM visited_countries");
  var codes = [];
  for (let i = 0; i < result.rowCount; i++) {
    codes.push(result.rows[i].country);
  }
  return codes;
}

app.get("/", async (req, res) => {
  const codes = await getVistedCountries();
  res.render("index.ejs", { countries: codes, total: codes.length });
});

app.post("/add", async (req, res) => {
  const country = req.body.country;
  var codes = await getVistedCountries();
  try {
    var result = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE $1", [`%${country.toLowerCase()}%`]);
    console.log(result);
    if (result.rows.length === 0) {
      throw new Error("Country name does not exist");
    }

    var countryResult = await db.query("SELECT country FROM visited_countries WHERE country = $1", [result.rows[0].country_code]);
    if (countryResult.rows.length > 0) {
      throw new Error("Country already exists");
    }

    await db.query("INSERT INTO visited_countries (country) VALUES ($1)", [result.rows[0].country_code]);
    res.redirect("/");
  } catch (err) {
    res.render("index.ejs", { countries: codes, total: codes.length, error: err.message });
  }
});

app.post("/delete", async (req, res) => {
  const country = req.body.country;
  try {
    var result = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE $1", [`%${country.toLowerCase()}%`]);
    if (result.rows.length === 0) {
      throw new Error("Country does not exist");
    }

    await db.query("DELETE FROM visited_countries WHERE country = $1", [result.rows[0].country_code]);
    res.redirect("/");

  } catch (err){
    var codes = await getVistedCountries();
    res.render("index.ejs",{ countries: codes, total: codes.length, error: err.message});
  }
});

app.get("/reset", async (req, res) => {
  await db.query("DELETE FROM visited_countries");
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
