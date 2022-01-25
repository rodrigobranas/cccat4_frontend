import AxiosAdapter from "../src/infra/AxiosAdapter";
import APIService from "../src/services/APIService";
import OrderService from "../src/services/OrderService";

test("Deve testar o OrderService", async function () {
	const data = {
		items: [],
			order: {
				orderItems: [],
				cpf: "872.336.816-00"
			},
			subtotal: 0,
			discount: 0,
			total: 0,
			freight: 0,
			newOrder: {},
			coupon: {},
	};
	const apiService = new APIService(new AxiosAdapter());
	new OrderService(apiService, data);
	await data.getItems();
	await data.addItem(data.items[0]);
	await data.addItem(data.items[0]);
	await data.addItem(data.items[0]);
	await data.addItem(data.items[1]);
	await data.addItem(data.items[4]);
	await data.addItem(data.items[5]);
	await data.validateCoupon({ coupon: "VALE20" });
	expect(data.subtotal).toBe(5170);
	expect(data.discount).toBe(1034);
	expect(data.freight).toBe(250);
	expect(data.total).toBe(4386)
});
