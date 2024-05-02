import json

class JsonFile:
    def __init__(self, filename):
        self.filename = filename

    def save(self, data):
        with open(self.filename, 'w') as file:
            json.dump(data, file, indent=2)  # Indentación para una mejor legibilidad

    def read(self):
        try:
            with open(self.filename, 'r') as file:
                data = json.load(file)
        except FileNotFoundError:
            data = []
        return data
     
    def find(self, attribute, value):
        try:
            with open(self.filename, 'r') as file:
                datas = json.load(file)
                data = [item for item in datas if item.get(attribute) == value]
        except FileNotFoundError:
            data = []
        return data
    
    def delete(self, client_to_delete ):
        clients = self.read()
        updated_clients = [client for client in clients if client['dni'] != client_to_delete['dni']]
        self.save(updated_clients)  # Utiliza el método save para guardar los datos actualizados
    def delete_product(self, product_to_delete):
        products = self.read()  # Carga todos los productos existentes

        # Elimina el producto específico de la lista de productos
        updated_products = [product for product in products if product['id'] != product_to_delete['id']]

        # Guarda la lista actualizada de productos en el archivo JSON
        self.save(updated_products)
