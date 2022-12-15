<template>
  <div id="container"></div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
import { shallowRef } from "@vue/reactivity";
import api from "/src/api/index";
import { CodeToText } from "element-china-area-data";
import { forEach, random } from "lodash";
export default {
  name: "gaodeMap",
  setup() {
    const map = shallowRef(null);
    return {
      map,
    };
  },
  methods: {
    codeToText(province, city, area, detail) {
      return (
        CodeToText[province] + CodeToText[city] + CodeToText[area] + detail
      );
    },
    mouseoverPoint(e) {
      AMapLoader.load({}).then((AMap) => {
        var infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -30),
        });
        infoWindow.setContent(e.target.content);
        // infoWindow.open(this.map, e.target.getPosition());
      });
    },
    initMap() {
      AMapLoader.load({
        key: "a8eaad565d2a2a529b5d8093f8e19e98", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Geolocation", "AMap.Geocoder"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        this.map = new AMap.Map("container", {
          // viewMode: "3D",
          zoom: 12,
          zooms: [2, 22],
          center: [121.215252, 31.286054],
          //center: [105.602725, 37.076636],
          mapStyle: "amap://styles/whitesmoke", //设置地图的显示样式
        });
        // this.map.setMapStyle("amap://styles/46614e92f13c9e88edb6aa4c64eed3a4");
        //试试用Promise能不能调整顺序,可以！
        var options = {
          showMarker: false, //是否显示定位点
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：5s
          position: "RB", //定位按钮的停靠位置
          offset: [10, 20], //定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
          zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
          showCircle: false,
        };
        var positionCenter = [121.215252, 31.286054];
        var localAd = 310114;
        //进行精确定位
        var geolocation = new AMap.Geolocation(options);
        this.map.addControl(geolocation);
        geolocation.getCurrentPosition(function (status, result) {
          //打印当前定位点的信息
          // positionCenter[0] = result.position.lng;
          // positionCenter[1] = result.position.lat;
          console.log("1精确定位之后", positionCenter);
        });

        var geocoder = new AMap.Geocoder({
          // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
          city: "上海",
        }); //从坐标获得adcode
        geocoder.getAddress(positionCenter, function (status, result) {
          if (status === "complete" && result.info === "OK") {
            // result为对应的地理位置详细信息
            console.log("2按说应该打印这个坐标处地址的详细信息", result);
            //得到定位点的adcode
            localAd = result.regeocode.addressComponent.adcode;
            console.log("3localAd是什么", localAd);
          } else {
            console.log("3转换失败为什么");
          }
        });

        api
          .GetSearchInfoPos(localAd)
          .then((res) => {
            console.log("4周围的寻人信息数组", res.data.data.aroundSearchInfo); //周围的寻人信息数组
            var markerNum = res.data.data.aroundSearchInfo.length;
            var i = 1;
            for (i = 1; i <= markerNum; i++) {
              var weidu =
                positionCenter[1] + Math.random() * 0.04 - Math.random() * 0.04;
              if (i <= 10) {
                var jingdu =
                  positionCenter[0] +
                  Math.random() * 0.04 -
                  Math.random() * 0.04;
              } else {
                var jingdu =
                  positionCenter[0] + Math.random() * 0.4 - Math.random() * 0.4;
              }
              let marker = new AMap.Marker({
                position: [jingdu, weidu],
              });
              this.map.add(marker);
              marker.content = res.data.data.aroundSearchInfo[i].search_info_id;
              var self = this;
              marker.on("click", function (e) {
                console.log(e.target.content);
                self.$router.push({
                  path: "/missingpersonInfo",
                  query: {
                    SearchInfo: e.target.content,
                  },
                });
              });
              marker.on("mouseover", this.mouseoverPoint);
              // marker.on('mouseout', this.mouseoutPoint);
            }
            this.map.setFitView(null, false, [150, 60, 100, 60]);
          })
          .catch(() => {
            // console.log(e);
          });
      });
    },
  },
  // },
  mounted() {
    //DOM初始化完成进行地图初始化
    this.initMap();
  },
};
</script>

<style scoped>
#container {
  height: 300px;
  width: 100%;
  padding: 0px;
  margin: 0px;
}
</style>




