import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true, // Asegúrate de que sea standalone
  imports: [FormsModule, CommonModule], // Añade FormsModule aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  customerName: string = '';  // Nombre del usuario
  selectedOrderType: string = '';  // Sándwich o ensalada
  orders: string[] = [];  // Lista de pedidos
  isPickup: boolean = true; // Estado de si el pedido es para retirar
  shippingAddress: string = ''; // Dirección de envío
  isModalOpen: boolean = false;

  menuCategories = [
    {
      name: 'Minutas',
      items: [
        { name: 'Milanesa con guarnicion', description: 'Milanesa con papas fritas o puré.', quantity: 0 },
        { name: 'Milanesa napolitana', description: 'Milanesa con jamón, queso y salsa de tomate.', quantity: 0 },
        { name: 'Suprema de pollo con guarnicion', description: 'Suprema de pollo con papas fritas o puré.', quantity: 0 },
        { name: 'Suprema de pollo napolitana con guarnicion', description: 'Suprema de pollo napolitana con papas fritas o puré.', quantity: 0 },

      ]
    },
    {
      name: 'Hamburguesas',
      items: [
        { name: 'Hamburguesa Completa', description: 'Hamburguesa con queso, tomate, lechuga y papas fritas.', quantity: 0 },
        { name: 'Hamburguesa con Bacon', description: 'Hamburguesa con queso, bacon crujiente y salsa BBQ.', quantity: 0 },
        { name: 'Hamburguesa Vegetariana', description: 'Hamburguesa a base de garbanzos o lentejas, con verduras frescas y mayonesa vegana.', quantity: 0 },
        { name: 'Hamburguesa Doble', description: 'Dos jugosas hamburguesas con queso, lechuga, tomate y cebolla.', quantity: 0 },
        { name: 'Hamburguesa Picante', description: 'Hamburguesa con jalapeños, salsa picante y queso derretido.', quantity: 0 },
        { name: 'Hamburguesa BBQ', description: 'Hamburguesa con salsa barbacoa, cebolla caramelizada y queso cheddar.', quantity: 0 },
        { name: 'Hamburguesa con Huevo', description: 'Hamburguesa con huevo frito, queso y salsa a elección.', quantity: 0 },
        { name: 'Hamburguesa Mediterránea', description: 'Hamburguesa de pollo o carne con tzatziki, lechuga y tomate.', quantity: 0 },
      ]
    },
    {
      name: 'Pizzas',
      items: [
        { name: 'Pizza Margarita', description: 'Pizza con salsa de tomate, mozzarella y albahaca.', quantity: 0 },
        { name: 'Pizza Fugazzeta', description: 'Pizza con cebolla y abundante mozzarella.', quantity: 0 },
        { name: 'Pizza de Jamón y Morrones', description: 'Pizza con jamón, morrones y mozzarella.', quantity: 0 },
        { name: 'Pizza Napolitana', description: 'Pizza con rodajas de tomate, ajo, orégano y mozzarella.', quantity: 0 },
        { name: 'Pizza Cuatro Quesos', description: 'Pizza con una mezcla de mozzarella, gorgonzola, parmesano y provolone.', quantity: 0 },
        { name: 'Pizza de Ananá', description: 'Pizza con jamón y rodajas de ananá (piña).', quantity: 0 },
        { name: 'Pizza Especial', description: 'Pizza con salsa de tomate, jamón, morrones, huevo duro y aceitunas.', quantity: 0 },
      ]

    },
    {
      name: 'Platos Principales',
      items: [
        { name: 'Bife de chorizo', description: 'Bife de chorizo con guarnición.', quantity: 0 },
        { name: 'Lomito', description: 'Sandwich completo de lomito (jamon, queso, lechuga, tomate y huevo)', quantity: 0 },

      ]
    },
    {
      name: 'Pastas',
      items: [
        { name: 'Ravioles de Ricota', description: 'Ravioles con salsa a elección.', quantity: 0 },
        { name: 'Ravioles de Verdura', description: 'Ravioles con salsa a elección.', quantity: 0 },
        { name: 'Ravioles de Carne', description: 'Ravioles rellenos de carne con salsa a elección.', quantity: 0 },
        { name: 'Ñoquis de Papa', description: 'Ñoquis con salsa de crema.', quantity: 0 },
        { name: 'Fideos al Huevo', description: 'Fideos caseros con salsa de tomate o tu elección.', quantity: 0 },
        { name: 'Lasaña', description: 'Capas de pasta con carne, salsa de tomate y bechamel.', quantity: 0 },
        { name: 'Sorrentinos de Jamón y Queso', description: 'Sorrentinos rellenos de jamón y queso con salsa a elección.', quantity: 0 },
        { name: 'Pasta con Pesto', description: 'Pasta con salsa pesto hecha con albahaca, ajo y nueces.', quantity: 0 },
      ]
    },
    {
      name: 'Postres',
      items: [
        { name: 'Flan con crema y dulce de leche', description: 'Clásico flan casero.', quantity: 0 },
        { name: 'Helado', description: 'Variedad de sabores de helado.', quantity: 0 },
      ]
    },
    {
      name: 'Para Beber',
      items: [
        { name: 'Agua', description: 'Agua mineral.', quantity: 0 },
        { name: 'Coca-Cola', description: 'Gaseosa Coca-Cola.', quantity: 0 },
        { name: 'Sprite', description: '         ', quantity: 0 },
        { name: 'Fanta', description: '         ', quantity: 0 },
        { name: 'Cerveza', description: '         ', quantity: 0 },
        { name: 'Vino Tinto', description: '         ', quantity: 0 },
        { name: 'Vino Blanco', description: '         ', quantity: 0 },
        { name: 'Jugo de Naranja', description: '         ', quantity: 0 },
        { name: 'Limonada', description: '         ', quantity: 0 },
      ]

    }
  ];

  selectedBread = '';
  selectedMeat = '';
  selectedCheese = '';
  selectedBase = '';
  selectedVegetables: string[] = [];
  selectedSaladIngredients: string[] = [];
  selectedSauces: string[] = [];
  selectedExtras: string[] = [];
  selectedDressings: string[] = [];
  selectedDrink: string[] = [];

  showFooter = true;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const container = document.querySelector('.container');
    if (container) {
      const { scrollTop, clientHeight, scrollHeight } = container as HTMLElement;
      this.showFooter = scrollTop + clientHeight >= scrollHeight;
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

    // Aumentar la cantidad de un item
    increaseItemQuantity(item: any) {
      item.quantity++;
    }

    // Disminuir la cantidad de un item
    decreaseItemQuantity(item: any) {
      if (item.quantity > 0) {
        item.quantity--;
      }
    }

    // Obtener la cantidad total de items en el pedido
    getTotalQuantity() {
      let total = 0;
      this.menuCategories.forEach(category => {
        category.items.forEach(item => {
          total += item.quantity;
        });
      });
      return total;
    }

    // Obtener los items del pedido
    getOrderedItems() {
      let orderedItems: any = [];
      this.menuCategories.forEach(category => {
        category.items.forEach(item => {
          if (item.quantity > 0) {
            orderedItems.push(item);
          }
        });
      });
      return orderedItems;
    }

    // Eliminar un item del pedido
    removeItem(item: any) {
      item.quantity = 0; // Restablecer la cantidad a 0
    }

    // Actualizar el tipo de pedido (Retirar o Enviar)
    updateOrderType() {
      if (this.isPickup) {
        this.shippingAddress = ''; // Limpiar la dirección si es para retirar
      }
    }

    // Enviar el pedido por WhatsApp
    sendOrderViaWhatsApp() {
      if ((!this.isPickup && this.shippingAddress === '' )|| this.customerName === '') {
        this.openModal();
      } else {
        let orderSummary = `¡Hola! Soy ${this.customerName.toUpperCase()} y quiero hacer el siguiente pedido:\n\n`;

        // Generar el resumen del pedido
        this.getOrderedItems().forEach((item: { name: any; quantity: any; }) => {
          orderSummary += `${item.name} (Cantidad: ${item.quantity})\n\n`;
        });

        // Añadir si es para retirar o enviar
        orderSummary += this.isPickup ? '*PARA RETIRAR*' : `*ENVÍO A DOMICILIO: ${this.shippingAddress.toUpperCase()}*`;

        // Codificar y abrir WhatsApp con el mensaje
        const encodedMessage = encodeURIComponent(orderSummary);
        const phoneNumber = '5493442507430'; // Reemplaza con el número de teléfono del local
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
      }
    }
}
