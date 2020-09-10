import { openDB } from 'idb';

class IndexedDBServie {
  constructor() {
    if (!('indexedDB' in window)) {
      throw new Error('Browser does not support IndexedDB');
    }
    this.db = this.init();
    this._instance = null;
  }

  async init() {
    return await openDB('testIndex', 1, {
      upgrade(db) {
        const itemStore = db.createObjectStore('demoItem', { keyPath: 'id', autoIncrement: true });
        itemStore.createIndex('itemKey', 'itemKey');
      },
    });
  }

  static getInstance() {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }

  // 根据 id 查询单个数据项
  async get(storeName, id) {
    const db = await this.db;
    return db.get(storeName, id);
  }

  // 根据 indexName 查询单个数据项
  async getByIndex(storeName, indexName) {
    const db = await this.db;
    return db.getFromIndex(storeName, indexName);
  }

  // 查询所有数据
  async getAll(storeName) {
    const db = await this.db;
    return db.getAll(storeName);
  }

  // 根据 indexName 查询所有数据
  async getAllByIndex(storeName, indexName, indexValue) {
    const db = await this.db;
    return db.getAllFromIndex(storeName, indexName, indexValue);
  }

  // 新增数据项
  async create(storeName, payload) {
    const db = await this.db;
    await db.add(storeName, payload);
  }

  // 修改数据项
  async update(storeName, id, payload) {
    const db = await this.db;
    await db.put(storeName, { ...payload, id });
  }

  // 删除数据项
  async delete(storeName, id) {
    const db = await this.db;
    await db.delete(storeName, id);
  }
}

const IndexedDBInstance = IndexedDBServie.getInstance();
export default IndexedDBInstance;
