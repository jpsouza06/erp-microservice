import { Product } from "@/enterprise/entities/product";

export class ProductPresenter {
	static toHttp(product: Product) {
		return {
			id: product.id.toString(),
			nome: product.name,
			descricao: product.description,
			categoria: product.ean,
			preco: product.price,
			estoque: product.stock,
		}
	}
}