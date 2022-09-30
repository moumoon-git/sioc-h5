<template>
  <div class="MailboxDetail">
        <section class="card-panel">
            <header>
                <span>{{resultInfo.typeNameSting}}</span>
                <label>{{resultInfo.emergencyTypeString}}</label>
            </header>
            <i :class="{
              'to-do-icon': resultInfo.status == 0,
              'in-process-icon': resultInfo.status == 1,
              'completed-icon': resultInfo.status == 2,
            }"></i>
            <article>
                <div>
                <label>标题</label><p>{{resultInfo.title}}</p>
                </div>
                <div>
                <label>事发时间</label><p>{{resultInfo.time}}</p>
                </div>
                <div>
                <label>所属区域</label><p>{{resultInfo.sysTownStringName}}</p>
                </div>
                <div>
                <label>详细地址</label><p>{{resultInfo.address}}</p>
                </div>
            </article>
        </section>
        <van-cell style="margin-top: 0.2rem;" center title="问题简况" :label="resultInfo.detail?resultInfo.detail:'暂无信息'" />
        <van-cell v-if="resultInfo.remark" style="margin-top: 0.2rem;" center title="回访信息" :label="resultInfo.remark" />
        <van-cell style="margin-top: 0.2rem;" center title="附近上传">
            <template #label>
                <img v-for="(imgItem,imgIndex) in resultInfo.annexs" :key="imgIndex" :src="$window.SERSVER_BASE_HOME+imgItem.url" style="width: 1.5rem;height:1.5rem;margin: 0rem 0.2rem 0.2rem 0rem;" @click="handlePreviewImage"/>
                <span v-if="!resultInfo.annexs||resultInfo.annexs.length==0">暂无附件</span>
            </template>
        </van-cell>
  </div>
</template>
<script>
import { ImagePreview } from 'vant';

export default {
  name: 'MailboxDetail',
  data() {
    return {
      resultInfo: {}
    }
  },
  computed: {
  },
  created() {
    this.getResultInfo();
  },
  methods: {
    handlePreviewImage(e) {
      console.log('handlePreviewImage value', e); 
      ImagePreview([e.target.currentSrc]);
    },
    getResultInfo() {
      this.$http({
        url: this.$http.adornUrl(`/emergency/emergencyinfo/infoByWechat/${this.$route.params.id}`),
        method: 'POST'
      }).then(({data}) => {
        console.log(`/emergency/emergencyinfo/infoByWechat/${this.$route.params.id} data`,data);
        if(data.code == 0) {
          this.resultInfo = data.data;
        }else {
          this.$dialog.alert({
            message: data.msg,
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>  
    .MailboxDetail {
        .card-panel {
          list-style: none;
          margin: 0.2rem;
          overflow: auto;
          background: #FFFFFF;
          box-sizing: border-box;
          padding: 0rem 0.38rem;
          border-radius: 0.1rem;
          position: relative;
          header {
            height: 1rem;
            line-height: 1rem;
            position: relative;
            &::after {
              content: '';
              width: 100%;
              height: 0.01rem;
              display: block;
              background: rgba(221,221,221,0.5);
              position: absolute;
              bottom: 0%;
            }
            span {
              font-size: 12px;
              font-weight: 400;
              color: #0091FF;
              background: #E6EFFF;
              border-radius: 0.06rem;
              padding: 0.08rem 0.16rem;
            }
            label {
              font-size: 14px;
              font-weight: 500;
              color: #333333;
              margin-left: 0.15rem;
            }
          }
          & > i {
            display: inline-block;
            width: 0.8rem;
            height: 0.8rem;
            position: absolute;
            right: 0%;
            top: 0%;
            &.to-do-icon {
              background: url(./assets/to-do-icon.png);
              background-size: 0.8rem 0.8rem;
            }
            &.in-process-icon {
              background: url(./assets/in-process-icon.png);
              background-size: 0.8rem 0.8rem;
            }
            &.completed-icon {
              background: url(./assets/completed-icon.png);
              background-size: 0.8rem 0.8rem;
            }
          }
          article {
            font-size: 13px;
            & > div {
              display: flex;
              align-items: center;
              white-space: nowrap;
              font-weight: 400;
              margin: 0.35rem 0rem;
              label {
                color: #999999;
                width: 1.4rem;
              }
              p {
                color: #333333;
                width: 5rem;
                overflow: hidden;
                text-overflow: ellipsis;
                margin: 0rem;
              }

            }
            
          }
        }
    }
</style>