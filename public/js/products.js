const listado = document.querySelector('.listado')
let products;

fetch('http://localhost:3000/products/listar')
    .then(res => res.json())
    .then(data => {

        data.forEach(products => {
            listado.innerHTML += `
                <div class 
            `
        })
        products = data;
    })
    .catch(error => console.log('Not Access Data, Bd Down' + error))

    console.log(products);