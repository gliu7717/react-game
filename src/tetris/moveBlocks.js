const tetris_height = 20
const tetris_width = 10

export function validateMove(blocks, fields, dx, dy)
{
    let canMove = true
    blocks.forEach(function(block) {
        let x = block.positionX + dx
        let y = block.positionY + dy
        if( y >= tetris_height  || 
            x >= tetris_width   || 
            x < 0)
            canMove = false      
        fields.forEach(function(field){
        if( x === field.positionX && y === field.positionY) 
          canMove = false
      })        
    })
    return canMove
}

export function rotateBlocks(blocks, fields)
{
    let x = blocks[1].positionX
    let y = blocks[1].positionY
    let canRotate = true
    blocks.forEach(function(block) {
        let newx = block.positionY - y;
        let newy = block.positionX - x;
        newx = x - newx
        newy = y + newy
        if(newx < 0 || newx >= tetris_width || newy>= tetris_height)
            canRotate = false
        fields.forEach(function(field){
            if( newx === field.positionX && newy === field.positionY) 
            canRotate = false
        })        
    })
    if(canRotate)
    {
        blocks.forEach(function(block) {
            let newx = block.positionY - y;
            let newy = block.positionX - x;
            block.positionX = x - newx
            block.positionY = y + newy
        })
    }

}

export function resolveFields(blocks, fields)
{
    const yset = new Set();
    blocks.forEach(function(block) {
        yset.add(block.positionY)
    })
    const rset = new Set();
    yset.forEach (function(y) {
        //console.log("uniq y ", y)
        const xset = new Set();
        fields.forEach(function(field){
            if(field.positionY === y)
                xset.add(field.positionX)
        }) 
        if(xset.size === tetris_width){
            rset.add(y)
        }
    })
    if(rset.size>0){
        let y = Array.from(rset)[0]
        let count = rset.size
        console.log("ressolving line : ", y)
        console.log("ressolving line count : ", count)

        const newfields = []
        fields.forEach(function(field){
            
            if(field.positionY < y){
                let newfield = field
                newfield.positionY += count
                newfields.push(newfield)
            }
            else if(field.positionY> y + count - 1){
                newfields.push(field)
            }            
        }) 
        return newfields
    }
    return fields
}

export default {validateMove,rotateBlocks,resolveFields }