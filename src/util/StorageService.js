const StorageService = {
  _persistRootKey: 'persist:root',
  clear() {
    Object.keys(this).forEach((k) => {
      if (k.endsWith('Key')) {
        localStorage.removeItem(this[k]);
      }
    });
  },
};

export default StorageService;
