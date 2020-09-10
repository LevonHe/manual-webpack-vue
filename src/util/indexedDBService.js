class IndexedDBServie {
  constructor() {
    if (!('indexedDB' in window)) {
      throw new Error('Browser does not support IndexedDB');
    }
    this.db = null;
    this._instance = null;
    this.init();
  }

  async init() {
    await new Promise((resolve, reject) => {
      // 打开数据库,如果数据库不存在则会新建,但新建的后续操作在 upgradeneeded 事件中执行
      const request = window.indexedDB.open('testIndex', 1);
      request.onerror = (e) => {
        console.error('Failed to open IndexedDB');
        reject(false);
      };
      request.onsuccess = (e) => {
        this.db = request.result;
        resolve(true);
      };
      // 如果指定的版本号大于数据库的实际版本号,则执行数据库升级
      // 第一次打开数据库时,会触发 upgradeneeded 事件,然后触发 success 事件
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        // 新建对象仓库
        if (!db.objectStoreNames.contains('demoItem')) {
          const objectStore = db.createObjectStore('demoItem', { keyPath: 'id', autoIncrement: true });
          objectStore.createIndex('itemKey', 'itemKey');
        }
      };
    });
  }

  static getInstance() {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }

  /**
   * @description 根据 id 查询单个数据项
   * @param {*} storeName objectStore 名称
   * @param {*} id id值
   */
  async get(storeName, id) {
    let response;
    await new Promise((resolve, reject) => {
      const request = this.db.transaction([storeName]).objectStore(storeName).get(id);
      request.onsuccess = (e) => {
        response = request.result;
        resolve(true);
      };
      request.onerror = reject;
    });
    return response;
  }

  /**
   * @description 根据 索引 查询单个数据项
   * @param {*} storeName objectStore 名称
   * @param {*} indexName 索引名称
   * @param {*} indexValue 索引值
   */
  async getByIndex(storeName, indexName, indexValue) {
    let response;
    await new Promise((resolve, reject) => {
      const request = this.db
        .transaction([storeName], 'readonly')
        .objectStore(storeName)
        .index(indexName)
        .get(indexValue);
      request.onsuccess = (e) => {
        const result = e.target.result;
        if (result) {
          response = result;
        }
        resolve(true);
      };
      request.onerror = reject;
    });
    return response;
  }

  /**
   * @description 查询所有数据
   * @param {*} storeName objectStore 名称
   */
  async getAll(storeName) {
    let response = [];
    await new Promise((resolve, reject) => {
      const request = this.db.transaction([storeName]).objectStore(storeName).openCursor();
      const res = [];
      request.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          res.push(cursor.value);
          cursor.continue();
        } else {
          response = res;
          resolve(true);
        }
      };
      request.onerror = reject;
    });
    return response;
  }

  /**
   * @description 根据 索引 查询所有数据
   * @param {*} storeName objectStore 名称
   * @param {*} indexName 索引名称
   * @param {*} indexValue 索引值
   */
  async getAllByIndex(storeName, indexName, indexValue) {
    let response = [];
    await new Promise((resolve, reject) => {
      const request = this.db.transaction([storeName], 'readonly').objectStore(storeName).index(indexName).openCursor();
      const res = [];
      request.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          // 模糊查询
          if (cursor.value[indexName].includes(indexValue)) {
            res.push(cursor.value);
          }
          // 精确查询
          // if (cursor.value[indexName] === indexValue) {
          //   res.push(cursor.value);
          // }
          cursor.continue();
        } else {
          response = res;
          resolve(true);
        }
      };
      request.onerror = reject;
    });
    return response;
  }

  /**
   * @description 新增数据项
   * @param {*} storeName objectStore 名称
   * @param {*} payload 单个数据对象，不包含 id (id 自增)
   */
  async create(storeName, payload) {
    await new Promise((resolve, reject) => {
      const request = this.db.transaction([storeName], 'readwrite').objectStore(storeName).add(payload);
      request.onsuccess = resolve;
      request.onerror = reject;
    });
  }

  /**
   * @description 修改数据项
   * @param {*} storeName objectStore 名称
   * @param {*} id 要修改项的 id 值
   * @param {*} payload 单个数据对象，不包含 id
   */
  async update(storeName, id, payload) {
    await new Promise((resolve, reject) => {
      const request = this.db
        .transaction([storeName], 'readwrite')
        .objectStore(storeName)
        .put({ ...payload, id });
      request.onsuccess = resolve;
      request.onerror = reject;
    });
  }

  /**
   * @description 删除数据项
   * @param {*} storeName objectStore 名称
   * @param {*} id 要删除项的 id 值
   */
  async delete(storeName, id) {
    await new Promise((resolve, reject) => {
      const request = this.db.transaction([storeName], 'readwrite').objectStore(storeName).delete(id);
      request.onsuccess = resolve;
      request.onerror = reject;
    });
  }
}

const IndexedDBInstance = IndexedDBServie.getInstance();
export default IndexedDBInstance;
