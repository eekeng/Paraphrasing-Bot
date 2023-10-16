import { data } from 'autoprefixer';
import React, {useEffect, useState} from 'react'
// import './globals.css' 

function index() {
const [apiMessage, setApi] = useState("Hi! Welcome to the paraphrasing bot powered by GPT-3.5. Please enter a paragraph to be paraphrased")
const [text, setText] = useState("")

    useEffect(() => {
      fetch("http://localhost:8080/api/home")
      .then((response) => response.json())
      .then((data) => {
          console.log(data);
          // setApi(data.api_call)
          // console.log(data.people)
        });
    }, []);

    async function submitText(event){
      event?.preventDefault()
      var userText = {text}
      console.log(userText.text)

      const myData = {
        inputText: userText
      }

      const result = await fetch("http://localhost:8080/api/home", {
        // mode: 'no-cors',
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          // 'Accept': 'application/json',
        },
        body: JSON.stringify(myData)
      }).then((response) => response.json())
        .then((data) => {
          console.log(data)
          setApi(data.response_data.reply.content)
        })
      
    }


    const  handleChange = (event) => {
      setText(event.target.value);
    };

  return (
  <div>
      <div>
        {/* {text} */}
      </div>
      <div id="form">
        <form onSubmit={submitText} id="userForm" action='POST'>
          <label>Enter text: <textarea rows={7} cols={50} id='textBox' value={text} onChange={handleChange} /></label>
          <input type="submit" id='submitButton' />
        </form>
        {apiMessage}
      </div>
    </div>
  );
}

export default index