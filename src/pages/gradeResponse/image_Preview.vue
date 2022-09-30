<template>
  <div>
    <van-overlay :show="overlayShow" :lock-scroll="false">
      <div class="wrapper" @click.stop>
        <!-- <div class="block" /> -->
        <img id="imgScale" :src="enlargeImageUrl" alt />
        <div class="iconfont iconiconset0127 deleteIcon" @click="closeOverlay"></div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  props: {
    overlayShow: {
      type: Boolean,
      required: true,
    },
    enlargeImageUrl: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeOverlay() {
      this.$emit("closeOverlay");
    },
    /**
     * @description: 按照双指手势缩放图片
     * @param {string} dom 传入需要放大的图片dom元素的ID
     * @return
     */
    scaleImage(dom) {
      var eleImg = document.querySelector("#" + dom);
      var store = {
        scale: 1,
      };
      // 缩放事件的处理
      eleImg.addEventListener("touchstart", function (event) {
        var touches = event.touches;
        var events = touches[0];
        var events2 = touches[1];

        event.preventDefault();

        // 第一个触摸点的坐标
        store.pageX = events.pageX;
        store.pageY = events.pageY;

        store.moveable = true;

        if (events2) {
          store.pageX2 = events2.pageX;
          store.pageY2 = events2.pageY;
        }

        store.originScale = store.scale || 1;
      });
      document.addEventListener("touchmove", function (event) {
        if (!store.moveable) {
          return;
        }

        event.preventDefault();

        var touches = event.touches;
        var events = touches[0];
        var events2 = touches[1];
        // 双指移动
        if (events2) {
          // 第2个指头坐标在touchmove时候获取
          if (!store.pageX2) {
            store.pageX2 = events2.pageX;
          }
          if (!store.pageY2) {
            store.pageY2 = events2.pageY;
          }

          // 获取坐标之间的距离
          var getDistance = function (start, stop) {
            return Math.hypot(stop.x - start.x, stop.y - start.y);
          };
          // 双指缩放比例计算
          var zoom =
            getDistance(
              {
                x: events.pageX,
                y: events.pageY,
              },
              {
                x: events2.pageX,
                y: events2.pageY,
              }
            ) /
            getDistance(
              {
                x: store.pageX,
                y: store.pageY,
              },
              {
                x: store.pageX2,
                y: store.pageY2,
              }
            );
          // 应用在元素上的缩放比例
          var newScale = store.originScale * zoom;
          // 最大缩放比例限制
          if (newScale > 3) {
            newScale = 3;
          }
          // 记住使用的缩放值
          store.scale = newScale;
          // 图像应用缩放效果
          eleImg.style.transform = "scale(" + newScale + ")";
        }
      });

      document.addEventListener("touchend", function () {
        store.moveable = false;

        delete store.pageX2;
        delete store.pageY2;
      });
      document.addEventListener("touchcancel", function () {
        store.moveable = false;

        delete store.pageX2;
        delete store.pageY2;
      });
    },
  },
  mounted() {
    this.scaleImage("imgScale");
  },
};
</script>
<style lang="less" scoped>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    img {
      width: 80vw;
      //   background-color: #fff;
    }
    .deleteIcon {
      position: absolute;
      top: 6vh;
      right: 10vw;
      font-size: 0.5rem;
      color: #fff;
      background-color: #000;
      border-radius: 50%;
      padding: 0.7vh;
    }
  }
</style>