const btnForm = document.querySelector('#btnForm')
const btnFormAuth = document.querySelector('#btnFormAuth')
const btnNotes = document.querySelector('#btnNotes')
const divNotesIn = document.querySelector('#divNotesIn')
const btnDelete = document.querySelector('#btnDelete')

const formRegistration = document.querySelector('#formRegistration')
const formAuth = document.querySelector('#formAuth')


btnForm.addEventListener('click', async(e) => {
    e.preventDefault()
    const body = Object.fromEntries(new FormData(formRegistration).entries())

    const response = await fetch('/json/newUser', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)}
    )

    const data = await response.json()
    console.log(data)
})

btnFormAuth.addEventListener('click', async(e) => {
    e.preventDefault()
    const body = Object.fromEntries(new FormData(formAuth).entries())

    const response = await fetch('/json/auth/:id', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)}
    )

    const data = await response.json()
    console.log(data)
})

btnNotes.addEventListener('click', async(e) => {
    e.preventDefault()
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
   
    const data = await response.json()
    console.log(data)
     
    divNotesIn.innerHTML = ''
    for (let post of data) {
        const noteId = Object.keys(data).find(key => data[key] === post);
        let noteTitle = `${post.title}`
        let noteBody = `${post.body}`
        let note = {'noteId': noteId, 'noteTitle': noteTitle, 'noteBody': noteBody}
        console.log(note)

        divNotesIn.innerHTML +=
        `<div id="divNotesIn-${noteId}">
        <p>Title: ${noteTitle} Body: ${noteBody}</p> 
        <button onclick="btnDeleteNote('${noteId}')">delete</button>
        <hr>
        </div`
    }
})

async function btnDeleteNote(noteId) {
    try {    
        const response = await fetch(`/json/delete/${noteId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        })

        if (response.ok) {
            console.log('Заметка удалена');
            const divRemove = document.querySelector(`#divNotesIn-${noteId}`)
            divRemove.innerHTML = ''
        } else {
            console.log('Не получилось удалить');
        }
    
    } catch (error) {
        console.log('Ошибка:', error);
    };
}