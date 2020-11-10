<template>
  <div id="map">
    <custom-create-header :header="createHeader.header"></custom-create-header>
    <div id="container"></div>
  </div>
</template>
<script>
import { loadMP } from '@/util/commonService';
import CustomCreateHeader from '@/components/customCreateHeader/index.vue';

export default {
  name: 'myMap',
  components: {
    CustomCreateHeader,
  },
  data() {
    return {
      createHeader: {
        header: {
          title: this.$t('map.title'),
          helpTip: {
            content: this.$t('map.helpTip'),
            position: 'top-start',
          },
        },
      },
      map: null,
      cluster: null,
    };
  },
  mounted() {
    loadMP().then((res) => {
      if (res && res.v) {
        console.info(this.$t('common.mapLoadSuccess'));
        this.showMap = true;
        this.initMap();
      }
      if (res && res.type === 'error') {
        console.error(this.$t('common.mapLoadError'));
        this.showMap = false;
      }
    });
  },
  methods: {
    initMap() {
      this.map = new AMap.Map('container', {
        mapStyle: 'amap://styles/blue', // 设置地图显示样式
        resizeEnable: true,
        zoom: 13,
      });
      this.geolocation();
      this.queryList();
    },
    geolocation() {
      if (!this.map) {
        return;
      }
      const _this = this;
      this.map.plugin('AMap.Geolocation', () => {
        const geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 10000,
          buttonOffset: new AMap.Pixel(10, 20),
          zoomToAccuracy: true,
          buttonPosition: 'RB',
        });
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', (data) => {
          const centerPosition = new AMap.LngLat(data.position.lng, data.position.lat);
          _this.map.setCenter(centerPosition);
        });
        AMap.event.addListener(geolocation, 'error', (err) => {
          console.log(err);
        });
      });
    },
    queryList() {
      this.$api.mapApi.getGeoList().then(
        (res) => {
          if (!res || Object.prototype.toString.call(res) !== '[object Array]') {
            return;
          }
          this.drawList(res);
        },
        (err) => {
          this.$msg.error(err);
        }
      );
    },
    drawList(list) {
      this.map.clearMap();
      this.cluster && this.cluster.setMap(null);
      const markerList = [];
      list.forEach((element) => {
        let src = 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png';
        if (element.warn) {
          src = 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png';
        }
        if (element.error) {
          src = 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png';
        }
        const marker = new AMap.Marker({
          icon: src,
          position: new AMap.LngLat(element.longitude, element.latitude),
        });
        markerList.push(marker);
        this.addHoverHandler(marker, element);
      });
      // 点聚合
      const styles = [
        {
          url: 'https://a.amap.com/jsapi_demos/static/images/blue.png',
          size: new AMap.Size(32, 32),
          offset: new AMap.Pixel(-16, -16),
        },
        {
          url: 'https://a.amap.com/jsapi_demos/static/images/green.png',
          size: new AMap.Size(32, 32),
          offset: new AMap.Pixel(-16, -16),
        },
        {
          url: 'https://a.amap.com/jsapi_demos/static/images/orange.png',
          size: new AMap.Size(36, 36),
          offset: new AMap.Pixel(-18, -18),
        },
        {
          url: 'https://a.amap.com/jsapi_demos/static/images/red.png',
          size: new AMap.Size(48, 48),
          offset: new AMap.Pixel(-24, -24),
        },
        {
          url: 'https://a.amap.com/jsapi_demos/static/images/darkRed.png',
          size: new AMap.Size(48, 48),
          offset: new AMap.Pixel(-24, -24),
        },
      ];
      this.map.plugin(['AMap.MarkerClusterer'], () => {
        // eslint-disable-next-line
        this.cluster = new AMap.MarkerClusterer(this.map, markerList, { styles });
      });
    },
    addHoverHandler(marker, element) {
      let w = null;
      marker.on('mouseover', () => {
        const normalTitle = this.$t('map.normal');
        const normalNumber = element.normal || 0;
        const warnTitle = this.$t('map.warn');
        const warnNumber = element.warn || 0;
        const errorTitle = this.$t('map.error');
        const errorNumber = element.error || 0;
        const totalNumber = normalNumber + warnNumber + errorNumber;
        const content = `<div style="width: 220px; height: 65px; position: relative;">
          <div style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; background: rgba(0, 0, 0, 0.6); z-index: -1; border-radius: 3px;"></div>
          <div style="width: 200px; padding: 10px 10px 5px; color: #fff;">
            <div style="font-size: 14px; margin-bottom: 10px;">${element.name} ( ${totalNumber} )</div>
            <div style="display: flex; justify-content: space-between;">
              <div style="font-size: 12px; margin-bottom: 5px;"><span style="color: #abe530; font-weight: bold;">${normalTitle}: ${normalNumber}</span></div>
              <div style="font-size: 12px; margin-bottom: 5px;"><span style="color: #ffc71c; font-weight: bold;">${warnTitle}: ${warnNumber}</span></div>
              <div style="font-size: 12px; margin-bottom: 5px;"><span style="color: #ff5b5b; font-weight: bold;">${errorTitle}: ${errorNumber}</span></div>
            </div>
          </div>
        <div>`;
        w = new AMap.InfoWindow({
          content,
          offset: new AMap.Pixel(4, -32),
        });
        w.open(this.map, marker.getPosition());
      });
      marker.on('mouseout', () => {
        w.close();
      });
    },
  },
};
</script>
<style lang="less" scoped>
#map {
  height: 100%;
  width: 100%;
  #container {
    width: 100%;
    height: calc(100% - 93px);
    background-color: #fff;
  }
}
</style>
