'use client'

import Image from 'next/image';
import logo from '../assets/logo.svg'
import { useState } from 'react';
import { Stars, Trash2 } from 'lucide-react'
import Editor from 'react-simple-code-editor'
import { useCompletion } from 'ai/react'

import { highlight, languages } from 'prismjs'

import 'prismjs/components/prism-sql';
import 'prismjs/themes/prism-dark.css';

export default function Home() {
  const [schema, setSchema] = useState('')

  const { completion, input, handleSubmit, handleInputChange } = useCompletion({
    api: '/api/generate-sql',
    body: {
      schema,
    },
  })

  const result = completion

  return (
    <div className='max-w-[430px] mx-auto px-4 pt-12 pb-4'>
      <header className='flex justify-between items-center'>
        <Image src={logo} alt="logo" />

        <button type='button'>
          <Trash2 className='h-8 w-8 text-snow' strokeWidth={0.8}/>
        </button>
      </header>

      <form onSubmit={handleSubmit} className='py-8 w-full flex flex-col text-foam'>
        <label htmlFor="schema" className='text-lg font-light'>
          Paste your SQL schema:
        </label>
        <div>
          <Editor
            textareaId="schema"
            value={schema}
            onValueChange={code => setSchema(code)}
            highlight={code => highlight(code, languages.sql, 'sql')}
            padding={16}
            textareaClassName='px-4 py-3 outline-none'
            className='my-4 font-mono bg-lime-500/5 border border-lime-500/10 rounded-md focus-within:ring-2 focus-within:ring-lime-600'
          />
        </div>

        <label htmlFor="question" className='text-lg font-light'>
          Your question about the schema:
        </label>
        <textarea
          name="question"
          id="question"
          value={input}
          onChange={handleInputChange}
          className='my-4 p-4 bg-lime-500/5 border border-lime-500/10 rounded-md outline-none focus:ring-2 focus:ring-lime-600'
        />

        <button type='submit' className='text-pistachio flex items-center justify-center rounded-lg border border-pistachio h-14 gap-2 '>
          <Stars className='w-6 h-6' />
          Ask the AI
        </button>
      </form>

      <div className='mt-8'>
        <span className='text-lg font-light text-foam'>
          Answer:
        </span>

        {/* <Editor
          readOnly
          value={result}
          onValueChange={() => {}}
          highlight={code => highlight(code, languages.sql, 'sql')}
          padding={16}
          textareaClassName='outline-none'
          className='my-4 w-full bg-transparent border border-lime-500/10 rounded-md'
        /> */}

        <textarea
          readOnly
          value={result}
          className='p-4 font-mono text-foam my-4 w-full bg-transparent border border-lime-500/10 rounded-md'
        />
      </div>
    </div>
  )
}
