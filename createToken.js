/* eslint-disable indent */
const jwt = require('jsonwebtoken');
/* luodaan token jos user (username ja password) on saatu.
    Token muodostuu user-objektista (payload),
    secret keystä ja optioista (tässä expiresIn)
    tokeniin ei pitäisi laittaa salasanaa koska se
    voidaan dekryptata tokenista. Kannattaa laittaa tokeniin
    vain tieto siitä onko käyttäjä admin. */
//const payload = {};

function createToken(user) {

  const payload = {
    'username': user.username,
  };
  console.log(payload);
  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: 60 * 60 * 24, // expiroituu 24 tunnissa
  });
  // const decodedtoken = jwt.decode(token);
  // console.log(decodedtoken);
  return token;
}

// Jos token olisi localstoragessa, se sailyisi siella seuraavalle kayttajalle, joka tulee
// kayttamaan tietokonettasi, vaikka olisit sulkenut sovelluksen ja uusi kayttaja avaa sen
// uudestaan. Mutta session storagessa token haviaa aina kun sessio on ohi.

module.exports = createToken;