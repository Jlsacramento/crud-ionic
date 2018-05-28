import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) {  }

  public getDB() {
    return this.sqlite.create({
      name: 'products.db',
      location: 'default'
    });
  }

  public createDatabase() {
    return this.getDB()
    .then((db: SQLiteObject) => {
      this.createTables(db);
      this.insertDefaultItems(db);
    })
    .catch(e => console.error(e));
  }

  private createTables(db: SQLiteObject) {
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS categorias (cat_id integer primary key AUTOINCREMENT NOT NULL, nome TEXT)'],
      ['CREATE TABLE IF NOT EXISTS produtos (pro_id integer primary key AUTOINCREMENT NOT NULL, nome TEXT, preco REAL, vencimento DATE, ativo integer, cat_id integer, FOREIGN KEY(cat_id) REFERENCES categorias(cat_id))']
    ])
      .then(() => console.log('Tabelas criadas.'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }

  private insertDefaultItems(db: SQLiteObject) {
    db.executeSql('select COUNT(cat_id) as qtd from categorias', {})
    .then((data: any) => {
      if(data.rows.item(0).qtd == 0) {

        db.sqlBatch([
          ['insert into categorias (nome) values (?)', ['Hamburgueres']],
          ['insert into categorias (nome) values (?)', ['Bebidas']],
          ['insert into categorias (nome) values (?)', ['Sobremesas']]
        ])
        .then(() => console.log('Dados padrões incluídos.'))
        .catch(e => console.error('Erro ao incluir dados padrões.', e));
      }
    })
    .catch(e => console.error('Erro ao consultar a quantidade de categorias.', e));
  }

}
