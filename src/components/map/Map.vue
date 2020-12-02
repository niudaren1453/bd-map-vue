<template>
    <!-- https://dafrok.github.io/vue-baidu-map/#/zh/start/base 墙-->
    <div class="mapbox">
        <baidu-map
            :center="center"
            :zoom="zoom"
            :scroll-wheel-zoom="true"
            :double-click-zoom="true"
            style="height: 100vh"
            @ready="getReady"
            @click="getClickInfo"
            @zoomend="getZoomEnd"
        >
            <!-- 缩放控件 -->
            <!-- <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation> -->
            <!-- 定位控件 -->
            <bm-geolocation
                anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                :showAddressBar="true"
                :autoLocation="true"
            ></bm-geolocation>
            <!-- 城市 -->
            <bm-city-list
                anchor="BMAP_ANCHOR_TOP_RIGHT"
                @changeAfter="cityChangeAfter"
            ></bm-city-list>
            <!-- 地址搜索 -->
            <bm-local-search
                :keyword="keyword"
                :location="location"
                :auto-viewport="autoViewport"
                :panel="panel"
                @searchcomplete="searchcomplete"
            ></bm-local-search>
            <bm-control :offset="{ width: '20px', height: '20px' }">
                <bm-auto-complete
                    v-model="keyword"
                    :sugStyle="{ zIndex: 999999 }"
                >
                    <input type="text" placeholder="请输入搜索关键字" />
                    <label>经度:{{marker.lng}}</label>
                    <label>纬度{{marker.lat}}</label>
                </bm-auto-complete>
            </bm-control>
            <!--  -->
            <bm-marker
                :position="{ lng: center.lng, lat: center.lat }"
                :dragging="true"
                @mouseup="markerMouseUp"
            ></bm-marker>
        </baidu-map>
    </div>
</template>
<script>
export default {
    name: 'mapbox',
    data() {
        return {
            location: '福州',
            autoViewport: true, // 搜索完成是否重新调整视野
            panel: false, // 是否选展现检索结果面板
            pagecapacity: 10, // 页容量
            center: { lng: 26.115029, lat: 119.314537 }, // 经纬度
            zoom: 20, // 地图展示级别，
            keyword: '', // 搜索v-m
            marker: { lng: 0, lat: 0 }
        }
    },
    methods: {
        //
        getReady({ BMap, map }) {
            // console.log(BMap, map)
            this.center.lng = 119.306538
            this.center.lat = 26.115236
            // const Zoom = this.zoom
            // this.zoom = Zoom
        },
        // 左键单击地图时
        getClickInfo(type) {
            console.log(type)
            // console.log(type.point.lng)
            // console.log(type.point.lat)
            this.center.lng = type.point.lng
            this.center.lat = type.point.lat
        },
        // 更改缩放结束的时
        getZoomEnd(e) {
            // yuanxinglianjicheng
            const { lng, lat } = e.target.getCenter()
            this.center.lng = lng
            this.center.lat = lat
            this.zoom = e.target.getZoom()
        },
        // 城市发生改变
        cityChangeAfter() {
            // console.log()
        },
        // 搜索位置
        // serachPosition() {
        //     this.$emit('map-confirm', this.center)
        // }
        markerMouseUp(e) {
            this.marker.lat = e.target.point.lat
            this.marker.lng = e.target.point.lng
        },
        searchcomplete() {
            this.marker.lng = this.center.lng
            this.marker.lat = this.center.lat
            // console.log(211)
        }
    }
}
</script>