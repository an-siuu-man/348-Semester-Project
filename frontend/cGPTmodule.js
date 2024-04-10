const { OpenAI } = require('openai');


const key = process.env.OPENAI_API_KEY;
const openai = new OpenAI(key);

async function generateResponse() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "Name me 5 european countries in reverse alphabetical order" }],
    model: "gpt-4",
  });

  console.log(completion.choices[0].message.content);
}

export default generateResponse();