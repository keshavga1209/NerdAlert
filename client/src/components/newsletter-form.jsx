import classnames from 'clsx'
import { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import {Preferences } from './preferneces.jsx'

export function NewsletterForm({
  className,
  // onSubmit,
  submitText
}) {

  const [success, setSuccess] = useState(false)
  const [inputFields, setInputFields] = useState([{
    topic:'',
} ]);


const addFields = () => {
  let newfield = { topic: ''}

  setInputFields([...inputFields, newfield])
}

const removeFields = (index) => {
  let data = [...inputFields];
  data.splice(index, 1)
  setInputFields(data)
}

  const handleSubmit = (event) => {
    event.preventDefault()
    //const result = await onSubmit(email)
    //console.log(result)
    console.log(inputFields)
    setSuccess(true)
  }
 
 
  function handleChange(index, event) {
    let data = [...inputFields];
    console.log(data)
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
}
  return (
    <>
    <form
      onSubmit={handleSubmit}
      className={classnames('newsletter-form is-revealing md:flex', className)}
    >
      <div className="mr-2 flex-shrink flex-grow">
        {/* <label className="hidden" htmlFor="email" aria-hidden="true">
          Email
        </label> */}
        {inputFields.map((input, index) => {
          return (
            <div key={index}>
              <input
              required
              placeholder="Topic name&hellip;"
              id="topic"
              name="topic"
              type="text"
              onChange={(event) => handleChange(index, event)}
              value={input.topic}
              autoComplete="off"
              className="w-full rounded-sm border border-gray-300 bg-white px-4 py-3 text-sm text-gray-500 shadow-none"
            />
      
      <button onClick={() => removeFields(index)}>Remove</button>
            </div>
          )
        })}
       <button onClick={addFields}>Add more..</button>
      </div>
      {/* <button onClick={addFields}>Add More..</button>
      <button onClick={removeFields}>Remove..</button> */}
      <div className="control">
        <button
          className="-mt-px inline-flex cursor-pointer justify-center whitespace-nowrap rounded-sm border-0 bg-gradient-to-r from-secondary-500 to-secondary-400 py-4 px-7 text-center font-medium leading-4 text-white no-underline shadow-lg"
          type="submit"
          onClick={handleSubmit}
        >
          {submitText}
        </button>
      </div>
    </form>
    {/* <Preferences/> */}
    </>
  )
}
