from components import Menu,Valida
from utilities import borrarPantalla,gotoxy
from utilities import reset_color,red_color,green_color,yellow_color,blue_color,purple_color,cyan_color
from clsJson import JsonFile
from company  import Company
from customer import RegularClient
from sales import Sale
from product  import Product
from iCrud import ICrud
import datetime
import time,os
from functools import reduce
import json

path, _ = os.path.split(os.path.abspath(__file__))
# Procesos de las Opciones del Menu Facturacion


def agregar_cliente_a_json(nuevo_cliente, ruta_archivo):
    try:
        with open(ruta_archivo, 'r') as archivo:
            clientes = json.load(archivo)  # Cargar el contenido del archivo JSON en una lista de clientes
    except FileNotFoundError:
        clientes = []  # Si el archivo no existe, inicializar la lista de clientes como vacía

    clientes.append(nuevo_cliente)  # Agregar el nuevo cliente a la lista de clientes

    with open(ruta_archivo, 'w') as archivo:
        json.dump(clientes, archivo, indent=2)  # Guardar la lista actualizada de clientes en el archivo JSON
import time

def limpiar_linea(func):
    def wrapper(*args, **kwargs):
        x, y = args[3], args[4]
        while True:
            result = func(*args, **kwargs)
            if result:
                return result
            else:
                gotoxy(x, y)
                print(" " * (len(args[2]) + 30), end="")  # Limpiar línea
                gotoxy(x, y)
                print("Por favor, ingrese un valor válido.", end="")
                time.sleep(2)
                gotoxy(x, y)
                print(" " * (len(args[2]) + 30), end="")  # Limpiar línea
    return wrapper

class CrudClients(ICrud):

    @limpiar_linea
    def validar_dni(self, validar, mensaje, x, y):
        while True:
            dni = validar.solo_numeros(mensaje, x, y)
            if len(dni) == 10:
                return dni
            else:
                return None

    def create(self):
        validar = Valida()
        borrarPantalla()
        print('\033c', end='')
        gotoxy(2,1);print(green_color+"*"*90+reset_color)
        gotoxy(30,2);print(blue_color+"Registro de Cliente")
        gotoxy(17,3);print(blue_color+Company.get_business_name())
        gotoxy(5,4);print("Ingrese los datos del cliente:")
        gotoxy(3,6);print("DNI: ", end="")
        dni = self.validar_dni(validar, "", 8, 6)  # Utiliza el método para validar el DNI
        nombre = input("Nombre: ")
        apellido = input("Apellido: ")
        num_telef = int(input("Numero de telefono: "))

        # Crear el objeto cliente
        nuevo_cliente = {"dni": dni, "nombre": nombre, "apellido": apellido, "num_telef": num_telef}
        
        # Guardar el cliente en el archivo JSON
        ruta_archivo_clientes = path + '/archivos/clients.json'	
        agregar_cliente_a_json(nuevo_cliente, ruta_archivo_clientes)
        
        gotoxy(35,9);print("Cliente creado satisfactoriamente")
        time.sleep(2)

    def update(self):
      validar = Valida()
      borrarPantalla()
      print('\033c', end='')
      gotoxy(2,1);print(green_color+"*"*90+reset_color)
      gotoxy(30,2);print(blue_color+"Actualizacion de Cliente")
      gotoxy(17,3);print(blue_color+Company.get_business_name())
      gotoxy(5,4);print("Ingrese los datos del cliente:")
      gotoxy(3,6);print("DNI: ", end="")
      dni = self.validar_dni(validar, "", 8, 6)
      json = JsonFile(path+'/archivos/clients.json')
      clients = json.read()
      updated_clients = []
      for client in clients:
          if client["dni"] == dni:
              num_telef = int(input("Nuevo número de teléfono: "))
              client["num_telef"] = num_telef
          updated_clients.append(client)

      json.save(updated_clients)
      gotoxy(35,12);print("Numero de telefono actualizado satisfactoriamente")
      time.sleep(2)


  
    def delete(self):
        validar = Valida()
        borrarPantalla()
        print('\033c', end='')
        gotoxy(2,1);print(green_color+"*"*90+reset_color)
        gotoxy(30,2);print(blue_color+"Eliminacion de Cliente")
        gotoxy(17,3);print(blue_color+Company.get_business_name())
        gotoxy(5,4);print("Ingrese los datos del cliente:")
        gotoxy(3,6);print("DNI: ", end="")
        dni = self.validar_dni(validar, "", 8, 6)
        json_file = JsonFile(path+'/archivos/clients.json')
        client = json_file.find("dni", dni)
        if not client:
            gotoxy(35,9);print("Cliente no existe")
            time.sleep(2)
            return
        client = client[0]
        json_file.delete(client)
        gotoxy(35,9);print("Cliente eliminado satisfactoriamente")
        time.sleep(2)

  
    def consult(self):
        print('\033c', end='')
        gotoxy(2,1);print(green_color+"*"*90+reset_color)
        gotoxy(30,2);print(blue_color+"Consulta de Clientes")
        gotoxy(17,3);print(blue_color+Company.get_business_name())
        json_file = JsonFile(path+'/archivos/clients.json')
        clients = json_file.read()
        gotoxy(2,4);print("DNI"+" "*10+"Nombre"+" "*10+"Apellido"+" "*10+"Num.Telefono")
        gotoxy(2,5);print("="*90)
        line = 6
        for client in clients:
            gotoxy(2,line);print(f"{client['dni']}   {client['nombre']}   {client['apellido']}   {client['num_telef']}")
            line += 1
        x = input("Presione una tecla para continuar...")

        return clients
    
class CrudProducts(ICrud):
    def create(self):
        validar = Valida()
        borrarPantalla()
        print('\033c', end='')
        gotoxy(2,1);print(green_color+"*"*90+reset_color)
        gotoxy(30,2);print(blue_color+"Registro de Producto")
        gotoxy(17,3);print(blue_color+Company.get_business_name())
        gotoxy(5,4);print("Ingrese los datos del producto:")
        gotoxy(3,6);print("ID: ", end="")
        id = validar.solo_numeros("Error: Solo numeros", 8, 6)
        descrip = input("Descripcion: ")
        precio = float(input(f'Precio:$ '))
        stock = int(input("Stock: "))

        nuevo_producto = {"id": id, "descripcion": descrip, "precio": precio, "stock": stock}
        ruta_archivo_productos = path + '/archivos/products.json'
        agregar_cliente_a_json(nuevo_producto, ruta_archivo_productos)
        
        gotoxy(35,9);print("Producto creado satisfactoriamente")
        time.sleep(2)
    
    def update(self):
        validar = Valida()
        borrarPantalla()
        print('\033c', end='')
        gotoxy(2,1);print(green_color+"*"*90+reset_color)
        gotoxy(30,2);print(blue_color+"Actualizacion de Producto")
        gotoxy(17,3);print(blue_color+Company.get_business_name())
        gotoxy(5,4);print("Ingrese los datos del producto:")
        gotoxy(3,6);print("ID: ", end="")
        id = validar.solo_numeros("Error: Solo numeros", 8, 6)
        json = JsonFile(path+'/archivos/products.json')
        products = json.read()
        updated_products = []
        for product in products:
            if product["id"] == id:
                stock = int(input("Nuevo stock: "))
                product["stock"] = stock
            updated_products.append(product)

        json.save(updated_products)
        gotoxy(35,12);print("Stock actualizado satisfactoriamente")
        time.sleep(2)
    
    def delete(self):
        validar = Valida()
        borrarPantalla()
        print('\033c', end='')
        gotoxy(2,1);print(green_color+"*"*90+reset_color)
        gotoxy(30,2);print(blue_color+"Eliminacion de Producto")
        gotoxy(17,3);print(blue_color+Company.get_business_name())
        gotoxy(5,4);print("Ingrese los datos del producto:")
        gotoxy(3,6);print("ID: ", end="")
        id = validar.solo_numeros("Error: Solo numeros", 8, 6)
        json_file = JsonFile(path+'/archivos/products.json')
        product = json_file.find("id", id)
        if not product:
            gotoxy(35,9);print("Producto no existe")
            time.sleep(2)
            return
        product = product[0]
        json_file.delete_product(product)
        gotoxy(35,9);print("Producto eliminado satisfactoriamente")
        time.sleep(2)
    
    def consult(self):
        print('\033c', end='')
        gotoxy(2,1);print(green_color+"*"*90+reset_color)
        gotoxy(30,2);print(blue_color+"Consulta de Productos")
        gotoxy(17,3);print(blue_color+Company.get_business_name())
        json_file = JsonFile(path+'/archivos/products.json')
        products = json_file.read()
        gotoxy(2,4);print("ID"+" "*10+"Descripcion"+" "*10+"Precio"+" "*10+"Stock")
        gotoxy(2,5);print("="*90)
        line = 6
        for product in products:
            try:
                gotoxy(2,line);print(f"{product['id']}   {product['descripcion']}   {product['precio']}   {product['stock']}")
            except KeyError:
                gotoxy(2,line);print(f"{product['id']}   {product['descripcion']}   {product['precio']}   Stock no disponible")
            line += 1
        x = input("Presione una tecla para continuar...")

        return products


class CrudSales(ICrud):
    def create(self):
        # cabecera de la venta
        validar = Valida()
        borrarPantalla()
        print('\033c', end='')
        gotoxy(2,1);print(green_color+"*"*90+reset_color)
        gotoxy(30,2);print(blue_color+"Registro de Venta")
        gotoxy(17,3);print(blue_color+Company.get_business_name())
        gotoxy(5,4);print(f"Factura#:F0999999 {' '*3} Fecha:{datetime.datetime.now()}")
        gotoxy(66,4);print("Subtotal:")
        gotoxy(66,5);print("Decuento:")
        gotoxy(66,6);print("Iva     :")
        gotoxy(66,7);print("Total   :")
        gotoxy(15,6);print("Cedula:")
        dni=validar.solo_numeros("Error: Solo numeros",23,6)
        json_file = JsonFile(path+'/archivos/clients.json')
        client = json_file.find("dni",dni)
        if not client:
            gotoxy(35,6);print("Cliente no existe")
            return
        client = client[0]
        cli = RegularClient(client["nombre"],client["apellido"], client["dni"], card=True) 
        sale = Sale(cli)
        gotoxy(35,6);print(cli.fullName())
        gotoxy(2,8);print(green_color+"*"*90+reset_color) 
        gotoxy(5,9);print(purple_color+"Linea") 
        gotoxy(12,9);print("Id_Articulo") 
        gotoxy(24,9);print("Descripcion") 
        gotoxy(38,9);print("Precio") 
        gotoxy(48,9);print("Cantidad") 
        gotoxy(58,9);print("Subtotal") 
        gotoxy(70,9);print("n->Terminar Venta)"+reset_color)
        # detalle de la venta
        follow ="s"
        line=1
        while follow.lower()=="s":
            gotoxy(7,9+line);print(line)
            gotoxy(15,9+line);
            id=int(validar.solo_numeros("Error: Solo numeros",15,9+line))
            json_file = JsonFile(path+'/archivos/products.json')
            prods = json_file.find("id",id)


            if not prods:
                gotoxy(24,9+line);print("Producto no existe")
                time.sleep(1)
                gotoxy(24,9+line);print(" "*20)
            else:    
                prods = prods[0]
                product = Product(prods["id"],prods["descripcion"],prods["precio"],prods["stock"])
                gotoxy(24,9+line);print(product.descrip)
                gotoxy(38,9+line);print(product.preci)
                gotoxy(49,9+line);qyt=int(validar.solo_numeros("Error:Solo numeros",49,9+line))
                gotoxy(59,9+line);print(product.preci*qyt)
                sale.add_detail(product,qyt)
                gotoxy(76,4);print(round(sale.subtotal,2))
                gotoxy(76,5);print(round(sale.discount,2))
                gotoxy(76,6);print(round(sale.iva,2))
                gotoxy(76,7);print(round(sale.total,2))
                gotoxy(74,9+line);follow=input() or "s"  
                gotoxy(76,9+line);print(green_color+"✔"+reset_color)  
                line += 1
        gotoxy(15,9+line);print(red_color+"Esta seguro de grabar la venta(s/n):")
        gotoxy(54,9+line);procesar = input().lower()
        if procesar == "s":
            gotoxy(15,10+line);print("😊 Venta Grabada satisfactoriamente 😊"+reset_color)
            # print(sale.getJson())  
            json_file = JsonFile(path+'/archivos/invoices.json')
            invoices = json_file.read()
            ult_invoices = invoices[-1]["factura"]+1
            data = sale.getJson()
            data["factura"]=ult_invoices
            invoices.append(data)
            json_file = JsonFile(path+'/archivos/invoices.json')
            json_file.save(invoices)
        else:
            gotoxy(20,10+line);print("🤣 Venta Cancelada 🤣"+reset_color)    
        time.sleep(2)    
    
    def update(self):
        borrarPantalla()
        print('\033c', end='')
        gotoxy(2,1);print(green_color+"*"*90+reset_color)
        gotoxy(30,2);print(blue_color+"Actualización de Producto de Venta")
        gotoxy(17,3);print(blue_color+Company.get_business_name())
        gotoxy(5,4);print("Ingrese el número de factura de la venta:")
        factura_numero = input("Factura #: ")
        if not factura_numero.isdigit():
            gotoxy(5,6);print("Error: El número de factura debe ser un número entero.")
            time.sleep(2)
            return
        
        factura_numero = int(factura_numero)
        # Lógica para buscar la venta según el número de factura
        json_file = JsonFile(path+'/archivos/invoices.json')
        invoices = json_file.find("factura", factura_numero)
        if not invoices:
            gotoxy(5,6);print("Error: La venta no existe.")
            time.sleep(2)
            return

        factura = invoices[0]  # Obtener la primera factura encontrada (suponiendo que solo haya una)
        
        # Mostrar los detalles de la venta
        print(f"Impresion de la Factura #{factura_numero}")
        print("Fecha de la factura:", factura['Fecha'])
        print("Cliente:", factura['cliente'])
        print("Total:", factura['total'])
        if 'detalle' in factura:  # Verificar si la clave 'detalle' está presente en el diccionario
            print("Detalle de venta:")
            for detalle in factura['detalle']:
                print(f"  - Producto: {detalle['poducto']}, Precio: {detalle['precio']}, Cantidad: {detalle['cantidad']}")
        else:
            print("No hay información de productos asociada con esta factura.")

        # Solicitar al usuario si desea añadir o eliminar un producto
        gotoxy(5,10);print("Desea añadir o eliminar un producto? (a/e):")
        opcion = input("Opción: ")
        if opcion.lower() == "a":
            # Lógica para añadir un producto a la factura
            gotoxy(5,12);print("Ingrese el ID del producto a añadir:")
            id_producto = input("ID del producto: ")
            if not id_producto.isdigit():
                gotoxy(5,14);print("Error: El ID del producto debe ser un número entero.")
                time.sleep(2)
                return
            
            factura_modificar = None
            for factura in invoices:
                if factura['factura'] == factura_numero:
                    factura_modificar = factura
                    break

        # Verifica si se encontró la factura a modificar
            if factura_modificar is None:
                gotoxy(5,6);print("Error: La venta no existe.")
                time.sleep(2)
                return
            json_file = JsonFile(path+'/archivos/products.json')
            producto = json_file.find("id", id_producto)
            json_file1 = JsonFile(path+'/archivos/invoices.json')
            invoices = json_file1.read()
            if not producto or len(producto) == 0:
                gotoxy(5,14);print("Error: El producto no existe.")
                time.sleep(2)
                return

            producto_info = producto[0]

            # Solicitar al usuario la cantidad de producto a añadir
            gotoxy(5,14);print("Ingrese la cantidad de producto a añadir:")
            cantidad_producto = input("Cantidad: ")
            if not cantidad_producto.isdigit() or int(cantidad_producto) <= 0:
                gotoxy(5,16);print("Error: La cantidad debe ser un número entero positivo.")
                time.sleep(2)
                return

            cantidad_producto = int(cantidad_producto)

            # Añadir el producto a la lista de productos de la factura
            producto_info = producto[0]
            producto_nuevo = {
                "id": producto_info["id"],
                "descripcion": producto_info["descripcion"],
                "precio": producto_info["precio"],
                "cantidad": cantidad_producto
            }
        elif opcion.lower() == "e":
            # Lógica para eliminar un producto de la factura
            gotoxy(5,14);print("Ingrese el número del producto a eliminar:")
            num_producto = input("Producto #: ")
            if not num_producto.isdigit() or int(num_producto) < 1 or int(num_producto) > len(productos):
                gotoxy(5,16);print("Error: Ingrese un número de producto válido.")
                time.sleep(2)
                return

            num_producto = int(num_producto)

            # Eliminar el producto de la lista de productos de la factura
            producto_eliminado = productos.pop(num_producto - 1)

            # Actualizar la factura en el archivo JSON
            productos = factura["detalle"]

            json_file1.save(invoices)

            # Mostrar un mensaje de confirmación
            gotoxy(5,16);print(f"El producto '{producto_eliminado['descripcion']}' ha sido eliminado de la factura #{factura_numero}.")
            time.sleep(2)

            # Eliminar el producto de la lista de productos de la factura
            producto_eliminado = productos.pop(num_producto - 1)
    # Lógica para eliminar un producto de la factura
            gotoxy(5,14);print("Ingrese el número del producto a eliminar:")
            num_producto = input("Producto #: ")
            if not num_producto.isdigit() or int(num_producto) < 1 or int(num_producto) > len(productos):
                gotoxy(5,16);print("Error: Ingrese un número de producto válido.")
                time.sleep(2)
                return

            num_producto = int(num_producto)

            # Eliminar el producto de la lista de productos de la factura
            producto_eliminado = productos.pop(num_producto - 1)

            # Actualizar la factura en el archivo JSON
            productos = factura["detalle"]

            json_file1.save(invoices)

            # Mostrar un mensaje de confirmación
            gotoxy(5,16);print(f"El producto '{producto_eliminado['descripcion']}' ha sido eliminado de la factura #{factura_numero}.")
            time.sleep(2)

            # Eliminar el producto de la lista de productos de la factura
            producto_eliminado = productos.pop(num_producto - 1)

            # Actualizar la factura en el archivo JSON
            json_file1.save(invoices)

            # Mostrar un mensaje de confirmación
            gotoxy(5,14);print(f"El producto '{producto_eliminado['descripcion']}' ha sido eliminado de la factura #{factura_numero}.")
            time.sleep(2)

    
    def delete(self):
      borrarPantalla()
      print('\033c', end='')
      gotoxy(2,1);print(green_color+"*"*90+reset_color)
      gotoxy(30,2);print(blue_color+"Eliminación de Producto de Venta")
      gotoxy(17,3);print(blue_color+Company.get_business_name())
      gotoxy(5,4);print("Ingrese el número de factura de la venta:")
      factura_numero = input("Factura #: ")
      if not factura_numero.isdigit():
          gotoxy(5,6);print("Error: El número de factura debe ser un número entero.")
          time.sleep(2)
          return
      
      factura_numero = int(factura_numero)
      # Lógica para buscar la venta según el número de factura
      json_file = JsonFile(path+'/archivos/invoices.json')
      invoice = json_file.find("factura", factura_numero)
      if not invoice:
          gotoxy(5,6);print("Error: La venta no existe.")
          time.sleep(2)
          return

      # Mostrar los productos de la factura
      factura = invoice[0]  # Suponiendo que solo hay una factura con ese número
      productos = factura["productos"]
      gotoxy(2,6);print("Productos de la factura:")
      for i, producto in enumerate(productos, start=1):
          print(f"{i}. {producto['descripcion']}")

      # Solicitar al usuario el número del producto a eliminar
      gotoxy(5,8);print("Ingrese el número del producto a eliminar:")
      num_producto = input("Producto #: ")
      if not num_producto.isdigit() or int(num_producto) < 1 or int(num_producto) > len(productos):
          gotoxy(5,9);print("Error: Ingrese un número de producto válido.")
          time.sleep(2)
          return

      num_producto = int(num_producto)

      # Eliminar el producto de la lista de productos de la factura
      producto_eliminado = productos.pop(num_producto - 1)

      # Actualizar la factura en el archivo JSON
      json_file.save(invoice)

      # Mostrar un mensaje de confirmación
      gotoxy(5,9);print(f"El producto '{producto_eliminado['descripcion']}' ha sido eliminado de la factura #{factura_numero}.")
      time.sleep(2)
      pass

    
    def consult(self):
        print('\033c', end='')
        gotoxy(2,1);print(green_color+"█"*90)
        gotoxy(2,2);print("██"+" "*34+"Consulta de Venta"+" "*35+"██")
        gotoxy(2,4);invoice= input("Ingrese Factura: ")
        
        if invoice.isdigit():
            invoice = int(invoice)
            json_file = JsonFile(path+'/archivos/invoices.json')
            invoices = json_file.find("factura",invoice)
            print(f"Impresion de la Factura #{invoice}")
            if invoices:
                invoice_data = invoices[0]  # Suponiendo que solo estás interesado en la primera factura encontrada
                print("Fecha de la factura:", invoice_data['Fecha'])
                print("Cliente:", invoice_data['cliente'])
                print("Total:", invoice_data['total'])
                if 'detalle' in invoice_data:  # Verificar si la clave 'detalle' está presente en el diccionario
                    print("Detalle de venta:")
                    for detalle in invoice_data['detalle']:
                        print(f"  - Producto: {detalle['poducto']}, Precio: {detalle['precio']}, Cantidad: {detalle['cantidad']}")
                else:
                    print("No hay información de productos asociada con esta factura.")
            else:
                print("La factura no existe.")

        else:
            json_file = JsonFile(path+'/archivos/invoices.json')
            invoices = json_file.read()
            print("Consulta de Facturas")
            print("Factura | Fecha      | Cliente            | Total")
            print("="*60)
            for fac in invoices:
                print(f"{fac['factura']: <7} | {fac['Fecha']: <10} | {fac['cliente']: <18} | {fac['total']: >6}")
            pass
# suma = reduce(lambda total, invoice: round(total+ invoice["total"],2), 
        #     invoices,0)
        #     totales_map = list(map(lambda invoice: invoice["total"], invoices))
        #     total_client = list(filter(lambda invoice: invoice["cliente"] == "Dayanna Vera", invoices))

        #     max_invoice = max(totales_map)
        #     min_invoice = min(totales_map)
        #     tot_invoices = sum(totales_map)
        #     print("filter cliente: ",total_client)
        #     print(f"map Facturas:{totales_map}")
        #     print(f"              max Factura:{max_invoice}")
        #     print(f"              min Factura:{min_invoice}")
        #     print(f"              sum Factura:{tot_invoices}")
        #     print(f"              reduce Facturas:{suma}")
        # x=input("presione una tecla para continuar...")    

#Menu Proceso Principal
opc=''
while opc !='4':  
    borrarPantalla()      
    menu_main = Menu("Menu Facturacion",["1) Clientes","2) Productos","3) Ventas","4) Salir"],20,10)
    opc = menu_main.menu()
    if opc == "1":
        opc1 = ''
        while opc1 !='5':
            borrarPantalla()    
            menu_clients = Menu("Menu Cientes",["1) Ingresar","2) Actualizar","3) Eliminar","4) Consultar","5) Salir"],20,10)
            opc1 = menu_clients.menu()
            if opc1 == "1":
                borrarPantalla()
                client = CrudClients()
                client.create()
            elif opc1 == "2":
                borrarPantalla()
                client = CrudClients()
                client.update()
            elif opc1 == "3":
                borrarPantalla()
                client = CrudClients()
                client.delete()
            elif opc1 == "4":
                borrarPantalla()
                client = CrudClients()
                client.consult()
                time.sleep(2)
            print("Regresando al menu Clientes...")
            # time.sleep(2)            
    elif opc == "2":
        opc2 = ''
        while opc2 !='5':
            borrarPantalla()    
            menu_products = Menu("Menu Productos",["1) Ingresar","2) Actualizar","3) Eliminar","4) Consultar","5) Salir"],20,10)
            opc2 = menu_products.menu()
            if opc2 == "1":
                borrarPantalla()
                product = CrudProducts()
                product.create()
            elif opc2 == "2":
                borrarPantalla()
                product = CrudProducts()
                product.update()
            elif opc2 == "3":
                borrarPantalla()
                product = CrudProducts()
                product.delete()
            elif opc2 == "4":
                borrarPantalla()
                product = CrudProducts()
                product.consult()
                time.sleep(2)
    elif opc == "3":
        opc3 =''
        while opc3 !='5':
            borrarPantalla()
            menu_sales = Menu("Menu Ventas",["1) Registro Venta","2) Consultar","3) Modificar","4) Eliminar","5) Salir"],20,10)
            opc3 = menu_sales.menu()
            if opc3 == "1":
                sales = CrudSales()
                sales.create()
                time.sleep(2)
            elif opc3 == "2":
                sales = CrudSales()
                sales.consult()
                time.sleep(2)
            elif opc3 == "3":
                sales = CrudSales()
                sales.update()
                time.sleep(2)
            elif opc3 == "4":
                sales = CrudSales()
                sales.delete()
            print("Regresando al menu Ventas...")
            
     
    print("Regresando al menu Principal...")       

borrarPantalla()
input("Presione una tecla para salir...")
borrarPantalla()

