import IndexedDBInstance from '@/util/indexedDBService';

export default {
  namespaced: true,
  state: {},
  actions: {
    getList({ dispatch }, payload = {}) {
      if (payload.itemKey) {
        return dispatch('getListByIndex', payload);
      }
      return new Promise(async (resolve, reject) => {
        try {
          const response = await IndexedDBInstance.getAll('demoItem');
          resolve({
            data: response,
          });
        } catch (error) {
          reject(error);
        }
      });
    },
    getListByIndex({ _ }, payload = {}) {
      const { itemKey } = payload;
      return new Promise(async (resolve, reject) => {
        try {
          const response = await IndexedDBInstance.getAllByIndex('demoItem', 'itemKey', itemKey);
          resolve({
            data: response,
          });
        } catch (error) {
          reject(error);
        }
      });
    },
    getItemById({ _ }, id) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await IndexedDBInstance.get('demoItem', id);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    },
    createItem({ _ }, { payload }) {
      return new Promise(async (resolve, reject) => {
        try {
          await IndexedDBInstance.create('demoItem', payload);
          resolve({ success: true });
        } catch (error) {
          reject(error);
        }
      });
    },
    updateItem({ _ }, { payload, id }) {
      return new Promise(async (resolve, reject) => {
        try {
          await IndexedDBInstance.update('demoItem', id, payload);
          resolve({ success: true });
        } catch (error) {
          reject(error);
        }
      });
    },
    deleteItem({ _ }, id) {
      return new Promise(async (resolve, reject) => {
        try {
          await IndexedDBInstance.delete('demoItem', id);
          resolve({ success: true });
        } catch (error) {
          reject(error);
        }
      });
    },
  },
};
