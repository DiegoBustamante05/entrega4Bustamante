const fs = require("fs");

class Container {
    constructor() {}
    getAll = async () => {
        try {
            const archive = await fs.promises.readFile("./productos.json", "utf-8");
            const products = JSON.parse(archive);
            return products;
        } catch (e) {
            console.log(e);
        }
    };
    save = async (newProduct) => {
        try {
            const products = await this.getAll();
            const id = products.length + 1;
            newProduct.id = id;
            products.push(newProduct);

            const productsString = JSON.stringify(products);

            await fs.promises.writeFile("./productos.json", productsString);
        } catch (e) {
            console.log(e);
        }
    };
    getById = async (id) => {
        try {
            const readData = await fs.promises.readFile("./productos.json");
            const newData = JSON.parse(readData);
            const title = newData.find((title) => title.id == id);
            if (title) {
                return title;
            } else {
                console.log("Producto no encontrado");
            }
        } catch (error) {
            console.log(error);
        }
    };

    deleteById = async (id) => {
        try {
            const readData = await fs.promises.readFile("./productos.json");
            const newData = JSON.parse(readData);
            const title = newData.find((title) => title.id == id);
            if (!title) {
                console.log("ID inexistente");
            } else {
                const filteredData = newData.filter((e) => e.id != id);
                const dataJSON = JSON.stringify(filteredData);
                await fs.promises.writeFile("./productos.json", dataJSON);
                console.log("Producto borrado");
            }
        } catch (e) {
            console.log(e);
        }
    };
    deleteAll = async () => {
        try {
            await fs.promises.writeFile("./productos.json", JSON.stringify([]));
            console.log("Todos los productos fueron borrados");
        } catch (e) {
            console.log(e);
        }
    };
    updateById = async (id, title, price, thumbnail) => {
        try {
            const productos = await this.getAll();
            const item = productos.find((prod) => prod.id == id);
            if (item) {
                item.title = title;
                item.price = price;
                item.thumbnail = thumbnail;
                console.log(item);
                await fs.promises.writeFile(
                    "./productos.json",
                    JSON.stringify(productos, null, 2)
                );
                return item;
            } else {
                return { error: "product not found" };
            }
        } catch (error) {
            console.log(error);
        }
    };
};



module.exports = Container;