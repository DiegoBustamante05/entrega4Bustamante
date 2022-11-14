const express = require('express');
const app = express();

const {
    Router
} = express;
const Container = require('./container');
const container = new Container();
const routerProducts = Router();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

const port = process.env.PORT || 8080;
app.use('/api/products', routerProducts);

app.listen(port, () => console.log(`The server is running in: http://localhost:${port} `));
app.get('/', (req, res) => {
    res.send("<h1 >CHECK OUR PRODUCTS</h1>");
});
app.get('/form', (req, res) => {
    res.sendFile(__dirname + '/publics/index.html');
});

app.post('/form', (req, res) => {
    const {
        body
    } = req;
    console.log(body);
    container.save(body);
    res.send('Product uploaded');
});

routerProducts.get('', async (req, res) => {
    const products = await container.getAll();
    res.json(products);
});

routerProducts.get('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const products = await container.getAll();
    const product = await container.getById(id);
    if (id > products.length) {
        res.json({
            error: 'This product was not found',
            productList: products,
        });
    } else {
        res.json(product);
    }
});

routerProducts.delete('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const products = await container.getAll();

    if (id > products.length) {
        res.json({
            error: 'This product was not found',
            productList: products,
        });
    } else {
        await container.deleteById(id);
        res.json({
            success: true,
            msg: 'This product was deleted',
        });
    }
});



routerProducts.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { title, price, thumbnail }= req.body;
    const productos = await container.getAll();
    const indice = productos.findIndex((product) => product.id == id);
    if (indice >= 0) {
    console.log("el indice es " + indice) 
    await container.updateById(id, title, price, thumbnail)
    res.json({ success: true, msg: 'actualizado' });
    } else {
    res.json({ error: true, msg: 'no encontrado' });
    }
});
