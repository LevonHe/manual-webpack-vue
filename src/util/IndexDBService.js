export default class IndexDBService {
  /**
   * 构造函数
   * @param {*} dbName 数据库名称
   * @param {*} version 数据库版本
   * @param {*} objStoName 对象仓库名称
   * @param {*} keyPath 主键
   * @param {*} indexArray  索引对象数组
   * @param {*} successCallback 成功回调
   */
  constructor(dbName, version = 1, objStoName, keyPath, indexArray, successCallback) {
    this.dbName = dbName;
    this.version = version;
    this.objStoName = objStoName;

    this.db = null;

    // 打开数据库,如果数据库不存在则会新建,但新建的后续操作在 upgradeneeded 事件中执行
    const request = window.indexedDB.open(dbName, version);
    request.onerror = (e) => {
      console.log('数据库打开错误');
    };
    request.onsuccess = (e) => {
      this.db = request.result;
      console.log('数据库打开成功');
      // 执行回调
      successCallback();
    };

    // 如果指定的版本号大于数据库的实际版本号,则执行数据库升级
    // 第一次打开数据库时,会触发 upgradeneeded 事件,然后触发 success 事件
    request.onupgradeneeded = (e) => {
      this.db = e.target.result;

      // 新建对象仓库
      if (!this.db.objectStoreNames.contains(objStoName)) {
        const objectStore = this.db.createObjectStore(objStoName, { keyPath });
        if (indexArray && indexArray.length) {
          indexArray.forEach((item) => {
            objectStore.createIndex(item.indexName, item.indexAttrOf, item.config);
          });
        }
      }
    };
  }

  // create
  create(data) {
    const request = this.db
      .transaction([`${this.objStoName}`], 'readwrite')
      .objectStore(`${this.objStoName}`)
      .add(data);

    request.onsuccess = (e) => {
      console.log('数据写入成功');
    };

    request.onerror = (e) => {
      console.log('数据写入失败', e.target.error);
    };
  }

  // update
  update(data) {
    const request = this.db
      .transaction([`${this.objStoName}`], 'readwrite')
      .objectStore(`${this.objStoName}`)
      .put(data);

    request.onsuccess = (e) => {
      console.log('数据更新成功');
    };

    request.onerror = (e) => {
      console.log('数据更新失败', e.target.error);
    };
  }

  // Retrieve
  query(id, cb) {
    const request = this.db
      .transaction([`${this.objStoName}`])
      .objectStore(`${this.objStoName}`)
      .get(id);

    request.onsuccess = (e) => {
      console.log('数据查询成功');
      cb(request.result);
    };

    request.onerror = (e) => {
      console.log('数据查询失败', e.target.error);
    };
  }

  queryByRange(lowerBound, upperBound, cb) {
    const range = IDBKeyRange.bound(lowerBound, upperBound);
    const request = this.db
      .transaction([`${this.objStoName}`])
      .objectStore(`${this.objStoName}`)
      .openCursor(range);

    const res = [];
    request.onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) {
        res.push(cursor.value);
        cursor.continue();
      } else {
        cb(res);
      }
    };
  }

  queryAll(cb) {
    const request = this.db
      .transaction([`${this.objStoName}`])
      .objectStore(`${this.objStoName}`)
      .openCursor();

    const res = [];
    request.onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) {
        res.push(cursor.value);
        cursor.continue();
      } else {
        cb(res);
      }
    };
    // const request = this.db
    //   .transaction([`${this.objStoName}`])
    //   .objectStore(`${this.objStoName}`)
    //   .getAll();

    // request.onsuccess = (e) => {
    //   cb(e.target.result);
    // };
  }

  queryFuzzyAll(field, keyword, cb) {
    const request = this.db
      .transaction([`${this.objStoName}`], 'readwrite')
      .objectStore(`${this.objStoName}`)
      .openCursor();

    const res = [];
    request.onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) {
        if (cursor.value[field].indexOf(keyword) !== -1) {
          res.push(cursor.value);
        }
        cursor.continue();
      } else {
        cb(res);
      }
    };
    // const request = this.db
    //   .transaction([`${this.objStoName}`], 'readwrite')
    //   .objectStore(`${this.objStoName}`)
    //   .getAll();

    // request.onsuccess = (e) => {
    //   const result = e.target.result;
    //   const res = result.filter((r) => r[field].indexOf(keyword) !== -1);
    //   cb(res);
    // };
  }

  queryByIndex(indexName, searchTerm, cb) {
    const request = this.db
      .transaction([`${this.objStoName}`], 'readonly')
      .objectStore(`${this.objStoName}`)
      .index(`${indexName}`)
      .get(`${searchTerm}`);

    request.onsuccess = (e) => {
      const result = e.target.result;
      if (result) {
        cb(result);
      } else {
        cb(null);
      }
    };

    request.onerror = (e) => {
      console.log(e);
    };
  }

  // delete
  delete(id) {
    const request = this.db
      .transaction([`${this.objStoName}`], 'readwrite')
      .objectStore(`${this.objStoName}`)
      .delete(id);

    request.onsuccess = (e) => {
      console.log('数据删除成功');
    };

    request.onerror = (e) => {
      console.log('数据删除失败', e.target.error);
    };
  }
}
