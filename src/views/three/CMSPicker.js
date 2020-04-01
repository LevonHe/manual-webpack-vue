import * as THREE from 'three';

export default class CMSPicker {
  constructor() {
    this.raycaster = new THREE.Raycaster();
    this.pickedObject = null;
    this.pickedObjectSavedColor = 0;
    this.pickedObjectSavedColorArray = [];
  }
  pick(normalizedPosition, scene, camera, logger, logPosition) {
    if (this.pickedObject) {
      if (Object.prototype.toString.call(this.pickedObject.material) === '[object Array]') {
        this.pickedObject.material.forEach((m, idx) => {
          m.color.setHex(this.pickedObjectSavedColorArray[idx]);
        });
      } else {
        this.pickedObject.material.color.setHex(this.pickedObjectSavedColor);
      }
      this.pickedObject = null;
      this.pickedObjectSavedColor = 0;
      this.pickedObjectSavedColorArray = [];
    }
    this.raycaster.setFromCamera(normalizedPosition, camera);
    const intersectedObjects = this.raycaster.intersectObjects(scene.children, true);
    if (intersectedObjects.length && intersectedObjects[0].object) {
      this.pickedObject = intersectedObjects[0].object;
      if (Object.prototype.toString.call(this.pickedObject.material) === '[object Array]') {
        this.pickedObject.material.forEach((m) => {
          this.pickedObjectSavedColorArray.push(m.color.getHex());
          m.color.setHex(0xff0000);
        });
      } else {
        this.pickedObjectSavedColor = this.pickedObject.material.color.getHex();
        this.pickedObject.material.color.setHex(0xff0000);
      }
      const locationName = this.pickedObject.name;
      logger.log(locationName);
      logger.render(logPosition.x, logPosition.y);
    } else {
      logger.clear();
    }
  }
}
