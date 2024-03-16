import blueBlock from './images/blue_block.png'
import redBlock from './images/red-block.png'
import yellowBlock from './images/yellow_block.png'
import orangeBlock from './images/orange_block.png'
import greenBlock from './images/green_block.png'
import purpleBlock from './images/purple-block.png'
import lightBlueBlock from './images/light_blue_block.png'

const offset = 4

const figures = [
  [1,3,5,7], // I
  [2,4,5,7], // Z
  [3,5,4,6], // S
  [3,5,4,7], // T
  [2,3,5,7], // L
  [3,5,7,6], // J
  [2,3,4,5], // O
];
const colors = [
  blueBlock,
  redBlock,
  yellowBlock,
  orangeBlock,
  greenBlock,
  purpleBlock,
  lightBlueBlock
];


const createBlocks = () =>{
    const blue_block = {
      id :1,
      image: blueBlock,
      positionX : 1 + offset ,
      positionY: 0,
      width : 1,
      height :1
    }

    const red_block = {
      id :2,
      image: redBlock,
      positionX : 0 + offset,
      positionY: 1,
      width : 1,
      height :1,
    }
    const orange_block = {
      id :3,
      image: orangeBlock,
      positionX : 1 + offset,
      positionY: 1,
      width : 1,
      height :1,
    }

    const yellow_block = {
      id :4,
      image: yellowBlock,
      positionX : 1 + offset,
      positionY: 2,
      width : 1,
      height :1,
    }

    const boardArrangement = []
/*    
    boardArrangement.push(blue_block)
    boardArrangement.push(red_block)
    boardArrangement.push(orange_block)
    boardArrangement.push(yellow_block)
*/
    const firstFigure = Math.floor(Math.random() * 7);
    for (let i = 0; i < 4; i++) {
      const block = {
        id : i+1,
        image: colors[firstFigure],
        positionX : figures[firstFigure][i] % 2 + offset,
        positionY:  Math.floor(figures[firstFigure][i] / 2),
        width : 1,
        height :1
      }
      boardArrangement.push(block)
    }

    return boardArrangement
    //console.log(randomColorArrangement)
  }

  export default createBlocks