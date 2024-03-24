import React, { useState,useCallback,useEffect,useRef } from 'react'
import './HomePage.css'

const HomePage = () => {

    
    const [lengtH,setLengtH] = useState(8)
    const [charAlw, setCharAlw] = useState(false)
    const [numberAlw,setNumberAlw] = useState(false)
    const [inputT,setInputT] = useState("")

    const password = useCallback(()=>{

        let paswrd = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

        if(numberAlw){
            str+= "0123456789"
        }
        if(charAlw){
            str+= "<>?/!@#$%^&*(')`~"
        }

        // for how many nuber of length
        
        for(let i=1;i<=lengtH;i++){

            let char = Math.floor(Math.random()*str.length+1)

            paswrd += str.charAt(char)

            
        }
        setInputT(paswrd)

    },[lengtH,numberAlw,charAlw, setInputT])

    useEffect(()=>{
        password()

    },[lengtH,charAlw,numberAlw,password])

    //  useRef for copy password 

    const passwordRef = useRef(null)

    // copypass sec 

    const copyPass = useCallback(()=>{
        passwordRef.current ?.select()
        window.navigator.clipboard.writeText(inputT)
    },[inputT])

  return (
    <div className='generate'>
        <h1>Password Generator</h1>
        <div className="input_sec">
            <input type="text" 
            value={inputT}
            readOnly
            ref={passwordRef}
            
            />
            <button

            onClick={copyPass}
            >Copy</button>
        </div>
        <div className="option_sec">
            
            <input type="range" 
                    min={6}
                    max={90}
                    value={lengtH}
                    onChange={(e)=>{
                        setLengtH(e.target.value)
            }}/>
            <label >Length:{lengtH}</label>

            <input type="checkbox"  
                    defaultChecked={numberAlw}
                    id='numberInput'
                    onChange={()=>{
                        setNumberAlw((prev)=>!prev);
                    }} 
           
           />
            <label htmlFor="numberAlw">Numbers</label>

            {/* input type for character  */}

            <input type="checkbox"  
                    defaultChecked={numberAlw}
                    id='numberInput'
                    onChange={()=>{
                        setCharAlw((prev)=> !prev);
           }} 
           
           />
            <label htmlFor="charAlw">Characters</label>

        </div>
    </div>
  )
}

export default HomePage
