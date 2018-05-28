import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../../providers/database/database';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class ProductProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(product: Product) {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'insert into produtos (nome, preco, vencimento, ativo, cat_id) values (?, ?, ?, ?, ?)';
      let data = [product.nome, product.preco, product.vencimento, product.ativo ? 1 : 0, product.cat_id];

      return db.executeSql(sql, data)
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }

  public update(product: Product) {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'update produtos set nome = ?, preco = ?, vencimento = ?, ativo = ?, cat_id = ? where pro_id = ?';
      let data = [product.nome, product.preco, product.vencimento, product.ativo ? 1 : 0, product.cat_id, product.pro_id];

      return db.executeSql(sql, data)
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'delete from produtos where pro_id = ?';
      let data = [id];

      return db.executeSql(sql, data)
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }

  public get(id: number) {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'select * from produtos where pro_id = ?';
      let data = [id];

      return db.executeSql(sql, data)
        .then((data: any) => {
          if(data.rows.length > 0) {
            let item = data.rows.item(0);
            let product = new Product();
            product.pro_id = item.pro_id;
            product.nome = item.nome;
            product.vencimento = item.vencimento;
            product.ativo = item.ativo;
            product.cat_id = item.cat_id;

            return product;
          }

          return null;
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }

  public getAll(ativo: boolean, nome: string = null) {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT p.*, c.nome as nome_categoria FROM produtos p inner join categorias c on p.cat_id = c.cat_id where p.ativo = ?';
      let data: any[] = [ativo ? 1 : 0];

      if(nome) {
        sql += ' and p.nome like ?';
        data.push('%' + nome + '%');
      }

      return db.executeSql(sql, data)
        .then((data: any) => {
          if(data.rows.length > 0) {
            let products: any[] = [];            
            for (var i = 0; i < data.rows.length; i++) {
              var product = data.rows.item(i);
              products.push(product);
            }

            return products;
          } else {
            return [];
          }
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }

}

export class Product {
  pro_id: number;
  nome: string;
  preco: number;
  vencimento: Date;
  ativo: boolean;
  cat_id: number;
}
