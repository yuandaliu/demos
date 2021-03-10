<template>
  <div class="mapboxDemo01">
    <div id="map"></div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";

export default {
  data() {
    return {};
  },

  mounted() {
    this.initmap()
  },

  methods: {
    initmap(){
      mapboxgl.accessToken = 'pk.eyJ1IjoibmFtZTAwMSIsImEiOiJja20yc3VrMm0wMXJtMnhsY29lajFsaDR1In0.NR6IPt4YUXuDGdWD49y8fg'
      var map = new mapboxgl.Map({
      container: 'map', // container id 绑定的组件的id
      style: 'mapbox://styles/name001/ckm2vkydl87kb17qozuzqply6', //地图样式，可以使用官网预定义的样式,也可以自定义
      center: [120.205522, 30.209156], // 初始坐标系，这个是南京建邺附近
      zoom: 17,     // starting zoom 地图初始的拉伸比例
      pitch: 60,  //地图的角度，不写默认是0，取值是0-60度，一般在3D中使用
      bearing: -17.6, //地图的初始方向，值是北的逆时针度数，默认是0，即是正北
      antialias: false, //抗锯齿，通过false关闭提升性能
      });
      map.on('load', function() {
        var layers = map.getStyle().layers;
        var labelLayerId;
        for (var i = 0; i < layers.length; i++) {
          if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id;
            break;
          }
        }

        map.addLayer({
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
              'fill-extrusion-color': '#aaa',
              'fill-extrusion-height': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15,
                0,
                15.05,
                ['get', 'height']
              ],
              'fill-extrusion-base': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15,
                0,
                15.05,
                ['get', 'min_height']
              ],
              'fill-extrusion-opacity': 0.6
            }
          },
          labelLayerId
        );
      });
    }
  }
};
</script>

<style scoped lang="less">
#map {
  position: absolute;
  top: 88px;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
}
</style>
