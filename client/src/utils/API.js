import axios from "axios";
// const catString = 'https://catfact.ninja/fact';
// const factString = 'https://uselessfacts.jsph.pl/random.json?language=en';
const botString = 'https://some-random-api.ml/bottoken';

export default {
  randomWord: function(){
    axios.get(botString,
      {
        options:{
          crossDomain: true
        }
      })
    .then((resp) => {
      console.log(resp);
      return resp;
    })
    .catch((error)=>{
      console.log(error);
      return error;
    })
  }
};
