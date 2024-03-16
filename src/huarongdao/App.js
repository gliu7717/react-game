import { useEffect, useState } from "react"
import MOVE_DIR from "./moveDir"
import validMove from "./validMove"
import createBoard from "./createBoard"
import {getDownBlocks,getUpBlocks,getRightBlocks,getLeftBlocks} from "./getBlock"

const width = 4


function App() {
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
  const [blocks, setBlocks] = useState([])
  function findBlockItem(arr, id) {
    return arr.filter((el) => el.id === id )[0];
  }

  
  const dragStart = (e) => {
    console.log(e.target)
    setSquareBeingDragged(e.target)
  }
  const dragDrop = (e) => {
    console.log(e.target)
      setSquareBeingReplaced(e.target)
  }
  const dragEnd = (e) => {
    console.log(e.target)
      const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
      const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))
      if (squareBeingReplacedId && squareBeingReplacedId ){
        if(squareBeingDraggedId === 11 || squareBeingDraggedId === 12)
          return
        if(squareBeingReplacedId !== 11 && squareBeingReplacedId !== 12)
          return

        let sBlock = findBlockItem(blocks, squareBeingDraggedId)
        let dBlock = findBlockItem(blocks, squareBeingReplacedId)
        console.log(sBlock)
        console.log(dBlock)
        const move = validMove(sBlock, dBlock)
        if(move === MOVE_DIR.INVALID_MOVE)
          return

        if(move === MOVE_DIR.MOVE_DOWN){
          console.log(move)
          if(sBlock.width === 1){
            dBlock.positionY = sBlock.positionY
            sBlock.positionY += 1
          } else{
            let [b1,b2] = getDownBlocks(blocks, sBlock)
            if(b1!==null && b2!== null){
              console.log("valid move down")
              b1.positionY = b2.positionY = sBlock.positionY
              sBlock.positionY += 1   
            }
          }
        }
        else if(move === MOVE_DIR.MOVE_UP){
          if(sBlock.width === 1){
            dBlock.positionY = sBlock.positionY + sBlock.height -1
            sBlock.positionY -= 1
          } else {
            let [b1,b2] = getUpBlocks(blocks,sBlock)
            if(b1!==null && b2!== null){
              b1.positionY = b2.positionY = sBlock.positionY + sBlock.height -1
              sBlock.positionY -= 1   
            }
          }
        }
        else if(move === MOVE_DIR.MOVE_LEFT){
          if(sBlock.height === 1){
            dBlock.positionX = sBlock.positionX + sBlock.width -1
            sBlock.positionX -= 1
          }else{
            let [b1,b2] = getLeftBlocks(blocks,sBlock)
            if(b1!==null && b2!== null){
              b1.positionX = b2.positionX = sBlock.positionX + sBlock.width -1
              sBlock.positionX -= 1   
            }
          }
        }
        else if(move === MOVE_DIR.MOVE_RIGHT){
          if(sBlock.height === 1){
            dBlock.positionX = sBlock.positionX 
            sBlock.positionX += 1
          }else{
            let [b1,b2] = getRightBlocks(blocks,sBlock)
            if(b1!==null && b2!== null){
              b1.positionX = b2.positionX = sBlock.positionX 
              sBlock.positionX += 1   
            }
          }
        }
      } else {
      }    
  }

  useEffect(() => {
    setBlocks(createBoard())    
  }, [])

  useEffect(()=>{
    const timer = setInterval(() => {
      setBlocks([...blocks])
    }, 100)
    return () => clearInterval(timer)
  }, [ blocks ])
  //console.log(currentColorArrangement)

  return (
    <div className="app">
      <div className="game">
        {blocks.map((block,index) => (
            <img 
              className={block.cname}
              key = {index}
              src={block.image}
              style={{backgroundColor:block.color, width: block.width*70, height: block.height*70, position: 'absolute', top: block.positionY * 70, left: block.positionX * 70}}
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
    </div>
  )
}

export default App
