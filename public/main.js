const deleteText = document.querySelectorAll('.fa-trash')
const item = document.querySelectorAll('.incomplete')
const itemCompleted = document.querySelectorAll('.complete')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteItem)
})

Array.from(item).forEach((element)=>{
    element.addEventListener('click', markComplete)
})

Array.from(itemCompleted).forEach((element)=>{
    element.addEventListener('click', markIncomplete)
})

async function deleteItem(){
    const iName = this.parentNode.childNodes[1].innerText.trim()
    try{
        const response = await fetch('deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemName': iName,
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

// Array.from(item).forEach((element)=>{
//     element.addEventListener('click', markComplete)
// })

async function markComplete(){
    const itemText = this.parentNode.childNodes[1].innerText.trim()
    try{
        const response = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemName': itemText,
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}


// Array.from(itemCompleted).forEach((element)=>{
//     element.addEventListener('click', markIncomplete)
// })

async function markIncomplete(){
    const itemText = this.parentNode.childNodes[1].innerText.trim()
    try{
        const response = await fetch('markIncomplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemName': itemText,
            })
          })
        const data = await response.json()
        console.log(this.parentNode.querySelector('.complete').innerText.trim())
        location.reload()

    }catch(err){
        console.log(err)
    }
}
