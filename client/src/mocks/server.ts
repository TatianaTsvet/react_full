import { setupServer } from 'msw/node';
import { rest } from 'msw';

const books = [
  {"author":"Vladimir","title":"JS","_id":"B4Li8k79uFLthHkf"},
{"author":"Pushkin","title":"Eugene Onegin","_id":"DBHxziigSiIQsAGY"},
{"author":"Shevchenko","title":"Kobzar","_id":"Hr7co2zEo72bDDKk"},
{"title":"Timur","author":"React","_id":"WKiD2xJqCnlrIzir"},
{"title":"JUnit 5","author":"Catalin Tudose","_id":"XkjWxcMOiJ71tDm6"},
{"author":"Lermontov","title":"Mzyri","_id":"xqoikHbOfO5qnhm7"},
]

function getRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const server = setupServer( 
    rest.get('http://localhost:3001/books', (_req, res, ctx) => { 
        return res(ctx.json(books)) 
        
    }), 
    rest.post('http://localhost:3001/books', (req, res, ctx) => {
    const { title, author } = req.body;
    books.push({title, author, _id: getRandomString(10)})

    
    return res(
      ctx.status(201),
      ctx.json({ title, author }),
    );
  }),
)


