const btnForm = document.querySelector('#btnForm')
const btnFormAuth = document.querySelector('#btnFormAuth')
const btnNotes = document.querySelector('#btnNotes')
const divNotesIn = document.querySelector('#divNotesIn')
const btnDelete = document.querySelector('#btnDelete')

const formRegistration = document.querySelector('#formRegistration')
const formAuth = document.querySelector('#formAuth')


btnForm.addEventListener('click', async(e) => {
    // console.log('qqq')
    e.preventDefault()
    
    const body = Object.fromEntries(new FormData(formRegistration).entries())

    const response = await fetch('/json/new', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)}
    )


    if (response.ok) {
        const data = await response.json();
        console.log(data);
    } else {
        console.log('Error Reg');
    }
    const data = await response.json()
 
    
})

btnFormAuth.addEventListener('click', async(e) => {
    e.preventDefault()
    console.log('auth')
    
    
    const body = Object.fromEntries(new FormData(formAuth).entries())

    const response = await fetch('/json/auth/:id', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)}
    )
    if (response.ok) {
        const data = await response.json();
        console.log(data);
    } else {
        console.log('Error Auth');
    }



})

btnNotes.addEventListener('click', async(e) => {
    e.preventDefault()
    console.log('aaa')
    
    const formNotes = document.querySelector('#formNotes')
    const body1 = Object.fromEntries(new FormData(formNotes).entries())

    const response = await fetch('/json/notes', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body1)}
    )
    if (response.ok) {
        const data = await response.json();
        console.log(data);
    } else {
        console.log('User notes not found');
    }
   


    divNotesIn.innerHTML = ''
    for (let post of data) {
        divNotesIn.innerHTML +=
        `<p>Title: ${post.title} Body: ${post.body}</p> 
        <button onclick="btnDelete()">delete</button>
        <hr>`
    }

   
})
