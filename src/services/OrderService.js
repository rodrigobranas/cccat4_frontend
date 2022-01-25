export default class OrderService {

	constructor (apiService, data) {
		this.data = data;

		this.data.convertOrder = (order) => {
			order.items = order.orderItems;
			return order;
		};

		this.data.updateTotal = async () => {
			this.data.subtotal = 0;
			this.data.discount = 0;
			this.data.freight = 0;
			this.data.total = 0;

			const response = await apiService.simulateFreight(this.data.convertOrder(this.data.order));
			const freight = response.data;
			this.data.freight = freight.amount;
			for (const orderItem of this.data.order.orderItems) {
				this.data.subtotal += this.data.itemsIndex[orderItem.idItem].price * orderItem.quantity;
			}
			if (this.data.coupon.percentage) this.data.discount = (this.data.coupon.percentage * this.data.subtotal) / 100;
			this.data.total = this.data.subtotal - this.data.discount + this.data.freight;
		};

		this.data.addItem = async (item) => {
			const existingItem = this.data.order.orderItems.find(orderItem => orderItem.idItem === item.idItem);
			if (existingItem) {
				existingItem.quantity++;
			} else {
				this.data.order.orderItems.push({ idItem: item.idItem, quantity: 1 });
			}
			await this.data.updateTotal();
		};

		this.data.deleteItem = async (idItem) => {
			const existingItem = this.data.order.orderItems.find(orderItem => orderItem.idItem === idItem);
			if (existingItem) {
				existingItem.quantity--;
			}
			if (existingItem.quantity === 0) this.data.order.orderItems.splice(this.data.order.orderItems.indexOf(existingItem), 1);
			await this.data.updateTotal();
		};

		this.data.validateCoupon = async (order) => {
			const response = await apiService.validateCoupon({ coupon: order.coupon });
			this.data.coupon = response.data;
			await this.data.updateTotal();
		};

		this.data.confirm = async (order) => {
			const response = await apiService.placeOrder(order);
			this.data.newOrder = response.data;
		}

		this.data.getItems = async () => {
			const response = await apiService.getItems();
			this.data.items = response.data;
			this.data.itemsIndex = {};
			for (const item of this.data.items) {
				this.data.itemsIndex[item.idItem] = item;
			}
		}
	}
}