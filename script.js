const url = "http://localhost:3000/contenido";
const buttonEditar = document.createElement('button');
buttonEditar.innerText = 'Guardar Editado';
buttonEditar.className = 'btn btn-warning';

const form = document.querySelector('form');

async function getContenido() {
    
    const respuesta = await fetch(url);

    if(!respuesta.ok){
        console.error('Error al obtener los elementos');
    }

    const contenidos = await respuesta.json();

    const ul = document.querySelector('#ulElemento');

    form.append(buttonEditar);

        contenidos.forEach(elemento => {
            const li = document.createElement('li');
            const edit = document.createElement('button');
            const remove = document.createElement('button');

            edit.innerText='Edit';
            remove.innerText ='Delete';

            edit.id='edit';
            remove.id='remove';

            edit.className = 'btn btn-warning';
            remove.className ='btn btn-danger';

            li.innerText = `ID: ${elemento.id}, Titulo: ${elemento.titulo}, Descripcion: ${elemento.descripcion}, Tipo: ${elemento.tipo} `
            li.append(edit);
            li.append(remove);
            ul.append(li);

            edit.addEventListener('click', async (event) => {
                event.preventDefault();
                
                const id = document.getElementById('id');
                const inputTitulo = document.getElementById('titulo');
                const inputDescripcion = document.getElementById('descripcion');
                const inputTipoContenido = document.getElementById('tipo_contenido');
    
                inputTitulo.value = elemento.titulo;
                inputDescripcion.value = elemento.descripcion;
                inputTipoContenido.value = elemento.tipo;
                id.value = elemento.id;


            });
            

        remove.addEventListener('click', () => {

            async function deleteElemento(){

                const urlID = `${url}/${elemento.id} `;

                const respuesta = await fetch(urlID, {
                    method: 'DELETE',
                });

                if(!respuesta.ok){
                    console.error('Error al eliminar un elemento');
                }
            }
            deleteElemento();
        });
    });
}


buttonEditar.addEventListener('click', async (event) => {

    event.preventDefault();

    const id = document.getElementById('id').value;
    const urlID = `${url}/${id}`;
    console.log(urlID);

    const inputTitulo = document.getElementById('titulo');
    const inputDescripcion = document.getElementById('descripcion');
    const inputTipoContenido = document.getElementById('tipo_contenido');



    const respuesta = await fetch(urlID, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            titulo: inputTitulo.value,
            descripcion: inputDescripcion.value,
            tipo: inputTipoContenido.value
        })
    });

    if (!respuesta.ok) {
        console.error('Error al editar un elemento');
    }
});

async function addContenido(){

    const button = document.getElementById('submit');

    button.addEventListener('click', async (event) =>{

        event.preventDefault();

        const titulo = document.getElementById('titulo').value;
        const descripcion = document.getElementById('descripcion').value;
        const tipo_contenido = document.getElementById('tipo_contenido').value;

        const repsuesta = await fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titulo: titulo,
                descripcion: descripcion,
                tipo: tipo_contenido
            })
        });

        if(!repsuesta.ok){
            console.error('Error al añadir un elemento');
        }
    })
}


getContenido(); 
addContenido();
