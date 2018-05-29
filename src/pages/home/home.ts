import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { ProductProvider, Product } from '../../providers/product/product';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  produtos: any[] = [];
  onlyInactives: boolean = false;
  searchText: string = null;

  constructor(public navCtrl: NavController, private toast: ToastController, private productProvider: ProductProvider) { }

  ionViewDidEnter() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productProvider.getAll(!this.onlyInactives, this.searchText)
      .then((result: any) => {
        this.produtos = result;
      });
  }

  addProduct() {
    this.navCtrl.push('EditProductPage');
  }

  editProduct(id: number) {
    this.navCtrl.push('EditProductPage', { id: id });
  }

  removeProduct(produto: Product) {
    this.productProvider.remove(produto.pro_id)
      .then(() => {
        var index = this.produtos.indexOf(produto);
        this.produtos.splice(index, 1);
        this.toast.create({ message: 'Produto removido.', duration: 3000, position: 'botton' }).present();
      })
  }

  filterProducts(ev: any) {
    this.getAllProducts();
  }
}
