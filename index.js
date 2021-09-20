const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const title= 'Inspiration - Home';

  res.render("inspiration", { title });
});

app.get('/about', (req, res) =>{
  const title = 'Inspiration - What is Inspiration?';

  res.render('about', {title});
})

app.get("/ideas", (req, res) => {
  const title= 'Inspiration - Search';

  res.render("ideasForm", { title });
});

app.post("/ideas", async (req, res) => {
  const type = req.body.type;
  let minPrice = 0;
  let maxPrice = 1;
  let minAccessibility = 0;
  let maxAccessibility = 1;
  const numOfParticipants = [2,3,4,5,8];
  let participants = 1;
  let price = '';
  let people = '';
  let accessibility = '';
  let searchInput = false;

    if(type){
      searchInput = true;
    }

    if (req.body.price === "free") {
      minPrice = 0.1;
      maxPrice = 0.6;
      price = 'free';
      searchInput = true;
    }
    if (req.body.price === "cheap") {
      minPrice = 0.1;
      maxPrice = 0.6;
      price = 'cheap';
      searchInput = true;
    }
    if (req.body.price === "luxury") {
      // seems like api only works with 0.4 as the max min price...
      minPrice = 0.4;
      maxPrice = 1;
      price = 'luxury';
      searchInput = true;
    }

    if(req.body.accessibility === 'easy'){
      minAccessibility = 0;
      maxAccessibility = 0.2;
      accessibility = 'easy';
      searchInput = true;
    }
    if(req.body.accessibility === 'medium'){
      minAccessibility = 0.2;
      maxAccessibility = 0.6;
      accessibility = 'medium';
      searchInput = true;
    }

    if(req.body.accessibility === 'hard'){
      minAccessibility = 0.6;
      maxAccessibility = 1;
      accessibility = 'hard';
      searchInput = true;
    }

    if(req.body.participants === 'alone'){
      people = 'alone';
      searchInput = true;
    }

    if(req.body.participants === 'notAlone'){

      participants = numOfParticipants[Math.floor(Math.random()*4)];
      people = 'not alone';
      searchInput = true;

    }
  
  const getQuote = async () => {
    try {
      const res = await axios.get(
        `http://www.boredapi.com/api/activity?type=${type}&minprice=${minPrice}&maxprice=${maxPrice}&minaccessibility=${minAccessibility}&maxaccessibility=${maxAccessibility}&participants=${participants}`
      );

      if(res.data.activity === undefined){
        return "Sorry, we couldn't find a match. Try a different search."
      }

      return res.data.activity;
    } catch {
      return "Oh no, something went wrong! Ultimately the best way to overcome bordeom is to investigate it closely...";
    }
  };

  const quote = await getQuote();
  const title= 'Inspiration - Results';
  res.render("ideasDisplay", { type, people, accessibility, price, quote, title, searchInput });
});



app.listen(3000, () => {
  console.log("listening on 3000");
});
