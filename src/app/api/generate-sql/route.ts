import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
})

export async function POST(req: Request) {
  const { schema, prompt } = await req.json()

  const message = `
    Your work is to create SQL queries given the SQL schema provided below:

    SQL schema:
    '''
    ${schema}
    '''

    Given the schema above, write an SQL query to answer the question below.
    Return only the SQL code.

    Question: ${prompt}
  `.trim()

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      { role: 'user', content: message },
    ],
  })

  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}
