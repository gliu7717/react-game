import { useEffect, useState } from "react"
import createBlocks from "./createBlocks"
import {validateMove,rotateBlocks,resolveFields} from "./moveBlocks"
import './index.css';


const width = 18
const xoffset = 76
const yoffset = 79

function App() {
  const [blocks, setBlocks] = useState([])
  const [fields, setFields] = useState([])

  useEffect(() => {
    setBlocks(createBlocks())    
    //setFields(createBlocks()) 
  }, [])

  function keyPress(e) {
    let dx = 0
    let canMove = false
    if (e.key === 'ArrowLeft') {
      canMove = validateMove(blocks,fields,-1, 0)
      dx = -1
    } else if (e.key === 'ArrowRight') {
      canMove = validateMove(blocks,fields,1, 0)
      dx = 1
    }
    else if (e.key === 'ArrowUp') {
      rotateBlocks(blocks,fields)
      setBlocks([...blocks])
      
    }
    if( canMove ){
      blocks.forEach(function(block){
        block.positionX += dx 
      })
      setBlocks([...blocks])
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  const moveIntoSquareBelow = () => {
    let canMove = validateMove(blocks,fields,0, 1)

    if(canMove){
      blocks.forEach(function(block) {
        block.positionY ++
      });
    }
    else{
      let newfields = fields.concat(blocks)
      let newfields1 = resolveFields(blocks, newfields)
      setFields(newfields1)
      //setBlocks(createBlocks())   
      let newBlock = createBlocks()      
      setBlocks(newBlock)
      console.log("position x:", blocks)      
    }
  }


  useEffect(() => {
    const timer = setInterval(() => {
      setBlocks([...blocks])
      moveIntoSquareBelow()
    }, 200)
    return () => clearInterval(timer)
  }, [ moveIntoSquareBelow, setBlocks, blocks])


  const dragStart = (e) => {
    console.log(e.target)
  }
  const dragDrop = (e) => {
    console.log(e.target)
  }
  const dragEnd = (e) => {
    console.log(e.target)
  }


  return (
    <div className="App" >
      <div className="bg">
      {fields.map((block,index) => (
            <img 
              className={block.cname}
              key = {index}
              src={block.image}
              style={{backgroundColor:block.color, width: block.width*width, height: block.height*width, position: 'absolute', 
              top: block.positionY * width + yoffset, left: block.positionX * width + xoffset}}
              alt={block.name}
              data-id={block.id   }
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
             />
        ))}

        {blocks.map((block,index) => (
            <img 
              className={block.cname}
              key = {index}
              src={block.image}
              style={{backgroundColor:block.color, width: block.width*width, height: block.height*width, position: 'absolute', 
              top: block.positionY * width + yoffset, left: block.positionX * width + xoffset}}
              alt={block.name}
              data-id={block.id   }
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}

             />
        ))}

      </div>
      <br/> <br/>
      ~score~
    </div>
  );
}

export default App;
