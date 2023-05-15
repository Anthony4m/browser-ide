import { useState,useEffect,useRef } from "react"
import * as esbuild from "esbuild-wasm";

function App() {
  const ref = useRef<any>();
const [input,setInput] = useState("");
const [code, setCode] = useState("")

const startService = async ()=>{
  ref.current = await esbuild.startService({
    worker: true,
    wasmURL: '/esbuild.wasm'
  });
}

useEffect(()=>{
startService()
},[])

const onCLick =  async ()=>{
  if(!ref.current){
    return;
  }

  const results = await ref.current.transform(input, {
    loader: 'jsx',
    target: 'es2015'
  });
  setCode(results.code)
}
  return (
    <>
      <div>
        <textarea label="input" value={input} onChange={(e) => setInput(e.target.value)} name="input" id="" cols= "30" rows="10"></textarea>
        <div>
          <button onClick={onCLick}>Submit</button>
        </div>
        <pre>{code}</pre>
      </div>
    </>
  )
}

export default App
