<template>
	<div class="row">
		<div class="col-xs-7 col-sm-7 col-md-7">
			<div class="items">
				<div class="row">
					<div class="col-xs-6 col-sm-6 col-md-6" v-for="item in items" v-bind:key="item.idItem">
						<div class="card card-body text-center">
							<h5>{{ item.description }}</h5>
							<h6>{{ formatMoney(item.price) }}</h6>
							<br/>
							<button class="btn btn-info btn-sm" @click="addItem(item)"><span class="fa fa-plus"></span> Item</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-xs-5 col-sm-5 col-md-5">
			<div class="order">
				<h5>Pedido</h5>
				<hr/>
				<div v-if="newOrder.code">
					<NewOrder v-bind:value="newOrder"></NewOrder>
				</div>
				<div v-if="!newOrder.code">
					<div v-if="order.orderItems.length === 0" class="padding-lg text-center">
						<div class="padding-md">
							<span class="fa fa-tag fa-3x"></span>
						</div>
						<div>Adicione itens ao pedido</div>
					</div>
					<div v-for="orderItem in order.orderItems" v-bind:key="orderItem.idItem">
						<div class="row">
							<div class="col-xs-2 col-sm-2 col-md-2">
								{{ orderItem.quantity}}
							</div>
							<div class="col-xs-4 col-sm-4 col-md-4">
								{{ itemsIndex[orderItem.idItem].description }}
							</div>
							<div class="col-xs-4 col-sm-4 col-md-4 text-right">
								{{ formatMoney(itemsIndex[orderItem.idItem].price) }}
							</div>
							<div class="col-xs-2 col-sm-2 col-md-2 text-right">
								<button class="btn btn-danger btn-sm" @click="deleteItem(orderItem.idItem)"><span class="fa fa-trash"></span></button>
							</div>
						</div>
					</div>
					<hr/>
					<div class="form-group">
						<label>CPF</label>
						<input type="text" class="form-control" v-model="order.cpf"/>
					</div>
					<div class="form-group">
						<label>Cupom de Desconto</label>
						<input type="text" class="form-control" v-model="order.coupon" @blur="validateCoupon(order)" />
					</div>
					<hr/>
					<div class="text-right">
						<div>
							Subtotal: {{ formatMoney(subtotal) }}
						</div>
						<div>
							Desconto: {{ formatMoney(discount) }}
						</div>
						<div>
							Frete: {{ formatMoney(freight) }}
						</div>
						<div>
							Total: {{ formatMoney(total) }}
						</div>
					</div>
					<hr/>
					<button class="btn btn-info btn-block" @click="confirm(order)">Confirmar</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import APIService from "./services/APIService";
import AxiosAdapter from "./infra/AxiosAdapter";
import OrderService from "./services/OrderService";
import MoneyService from "./services/MoneyService";
import NewOrder from "./components/NewOrder.vue";

export default {
	name: "App",
	components: {
		NewOrder
	},
	data() {
		return {
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
			apiService: {}
		};
	},
	async created() {
		this.formatMoney = MoneyService.formatMoney;
		const apiService = new APIService(new AxiosAdapter());
		new OrderService(apiService, this);
		await this.getItems();
	}
};
</script>

<style>
.items {
	padding: 20px;
	overflow: scroll;
	height: 100vh;
}
.order {
	padding: 20px;
	background-color: #DDD;
	min-height: 100vh;
}
.card {
	margin-bottom: 10px;
}
.btn {
	margin-bottom: 10px;
}
.padding-lg {
	padding-top: 40px;
	padding-bottom: 40px;
}
.padding-md {
	padding: 20px;
}
</style>