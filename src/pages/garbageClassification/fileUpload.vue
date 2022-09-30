<!--
 * @Author: yaoweixin
 * @Date: 2020-10-27 16:05:15
 * @LastEditors: yaoweixin
 * @LastEditTime: 2020-12-17 13:52:57
 * @Description: 拍照上传
 * @FilePath: \vue-cli-multiPage-master\src\pages\garbageClassification\fileUpload.vue
-->
<template>
    <div class="uploadFile">
        <input type="file" accept="image/*" capture="camera" @change="getFileUpload($event)" class="fileStyle">
         <div class="pictureWrapper">
            <img src="~@/assets/img/Picture.svg" alt />
            <div class="titleText">打开相机</div>
        </div>
        <div class="imgWrapper">
            <div class="imgSlide" v-for="(item,index) in imgList" :key="index">
                <!-- <template v-if="item.allUrl.indexOf('http') !== -1"> -->
                <img :src="item.allUrl" alt="" class="imgStyle" @click="showPreviewImage(item.allUrl)">
                <!-- </template>
                 <template v-else>
                <img :src="baseUrl + item.allUrl" alt="" class="imgStyle" @click="showPreviewImage(item.allUrl)">
                </template> -->
                <img src="~@/assets/img/deletex.png" alt="" class="delIcon" @click="delImg(index)">
            </div>
        </div>
        <!-- 图片预览 -->
        <imagePreview
      ref="previewImage"
      :enlargeImageUrl="enlargeImageUrl"
    ></imagePreview>
    </div>
</template>
<script>
import imagePreview from "../gradeResponse/imagePreview";
export default {
    name: 'fileUpload',
    data() {
        return {
            enlargeImageUrl: [],//预览图片路径
            imgList: [],
            compressSize: 1, //压缩比例
            
        }
    },
    created() {
        
    },
    methods: {
    /**
     * @description: 显示放大的预览图
     * @param {String} imgurl 被点击的图片传递进来的图片路径
     * @return {}
     */
    showPreviewImage(imgurl) {
      this.enlargeImageUrl = [];
      this.enlargeImageUrl.push(imgurl);
      this.$refs.previewImage.previewShow = true;
    },
        /**
         * @description: 文件上传
         * @param {*} event
         * @return {*}
         */
        // getFileUpload(event) {
        //     let that = this
        //     let formData = new FormData();
        //     //console.log('target',event.target.files)
        //     // 创建新的图片对象
        //     let img = new Image();
        //     new Promise((resolve,reject) => {
        //         const reader = new FileReader()
        //         reader.readAsDataURL(event.target.files[0]);//输出base64图片
        //          reader.onload = function(e) {
        //         // 指定图片的DataURL(图片的base64编码数据)
        //         img.src = e.target.result
                
        //         resolve(img)
        //       }
        //     }).then(img => {
        //         //console.log('src',img)
                 
        //          new Promise((resolve,reject) => {
        //         var name = event.target.files[0].name;
        //         // 设置图片的压缩比例
        //         that.compressImg(event.target.files[0].size);
        //             // 创建Canvas对象(画布)
        //             let canvas = document.createElement("canvas");
        //             // 获取对应的CanvasRenderingContext2D对象(画笔)
        //             let context = canvas.getContext("2d");
        //             // 监听浏览器加载图片完成，然后进行进行绘制
        //             img.onload = () => {
        //             if (that.compressSize > 1) {
        //                 // 指定canvas画布大小，该大小为最后生成图片的大小
        //                 canvas.width = img.width / that.compressSize;
        //                 canvas.height = img.height / that.compressSize;
        //                 /* drawImage画布绘制的方法。(0,0)表示以Canvas画布左上角为起点，400，300是将图片按给定的像素进行缩小。
        //             如果不指定缩小的像素图片将以图片原始大小进行绘制，图片像素如果大于画布将会从左上角开始按画布大小部分绘制图片，最后的图片就是张局部图。*/

        //                 context.drawImage(img, 0, 0, canvas.width, canvas.height);
        //                 // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
        //                 // file.content = canvas.toDataURL(file.file.type, 0.92);
        //                 var dataurl = canvas.toDataURL("image/png");
        //                 var arr = dataurl.split(","),
        //                 mime = arr[0].match(/:(.*?);/)[1],
        //                 bstr = atob(arr[1]),
        //                 n = bstr.length,
        //                 u8arr = new Uint8Array(n);
        //                 while (n--) {
        //                 u8arr[n] = bstr.charCodeAt(n);
        //                 }
        //                 var file1 = new File([u8arr], name, { type: mime });
        //                 console.info('file1',file1);
        //                 // 最后将base64编码的图片保存到数组中，留待上传。
        //                 formData.append("files", file1);
        //                 resolve(formData)
        //                 }
        //                 else {
        //                     formData.append("files",event.target.files[0])
        //                     resolve(formData)
        //                 }
        //             }
                     
                    
                
        //         }).then((fileList) => {
        //             //console.log(fileList,'fileList')
        //             that.$http({
        //             url: that.$http.adornUrl(`/level/levelPublish/upload//file`),
        //             method: "post",
        //             headers: {
        //             "content-type": "multipart/form-data",
        //             },
        //             data: formData,
        //         }).then((data) => {
        //             //console.log("文件上传后返回的数据data===》", data);
        //             let fileName = data.data.fileName;
        //             let filestr = data.data.filestr;
        //             //console.log(fileName);
        //             fileName.forEach((v, i) => {
        //             that.imgList.push({
        //                 name: fileName[i],
        //                 url: filestr[i],
        //             });
        //             });
        //         });
        //         })
        //     })
           
        // },
        delImg(index) {
            this.imgList.splice(index,1)
        },
            /**
             * @description: 根据图片的大小设置压缩的比例
             * @param {string} size 图片的大小
             * @return {}
             */
            compressImg(size) {
            if (size < 1024 * 1024) {
                // 图片小于1M的情况
                this.compressSize = 1;
            } else {
                // 图片大于1M的情况
                let num = size / (1024 * 1024); // 获取图片大小与1M大小的比例
                this.compressSize = num * 2; // 设置压缩比例
            }
            //console.log(this.compressSize);
            },
            /**
             * @description: 文件上传
             * @param {*} event
             * @return {*}
             */
            getFileUpload(event) {
            let that = this
            let formData = new FormData();
            //console.log('target',event.target.files)
            // 创建新的图片对象
            let img = new Image();
            new Promise((resolve) => {
                const reader = new FileReader()
                reader.readAsDataURL(event.target.files[0]);//输出base64图片
                 reader.onload = function(e) {
                // 指定图片的DataURL(图片的base64编码数据)
                img.src = e.target.result
                
                resolve(img)
              }
            }).then(img => {
                //console.log('src',img)
                return new Promise((resolve) => {
                var name = event.target.files[0].name;
                // 设置图片的压缩比例
                that.compressImg(event.target.files[0].size);
                    // 创建Canvas对象(画布)
                    let canvas = document.createElement("canvas");
                    // 获取对应的CanvasRenderingContext2D对象(画笔)
                    let context = canvas.getContext("2d");
                    // 监听浏览器加载图片完成，然后进行进行绘制
                    img.onload = () => {
                    if (that.compressSize > 1) {
                        // 指定canvas画布大小，该大小为最后生成图片的大小
                        canvas.width = img.width / that.compressSize;
                        canvas.height = img.height / that.compressSize;
                        /* drawImage画布绘制的方法。(0,0)表示以Canvas画布左上角为起点，400，300是将图片按给定的像素进行缩小。
                    如果不指定缩小的像素图片将以图片原始大小进行绘制，图片像素如果大于画布将会从左上角开始按画布大小部分绘制图片，最后的图片就是张局部图。*/

                        context.drawImage(img, 0, 0, canvas.width, canvas.height);
                        // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
                        // file.content = canvas.toDataURL(file.file.type, 0.92);
                        var dataurl = canvas.toDataURL("image/png");
                        var arr = dataurl.split(","),
                        mime = arr[0].match(/:(.*?);/)[1],
                        bstr = atob(arr[1]),
                        n = bstr.length,
                        u8arr = new Uint8Array(n);
                        while (n--) {
                        u8arr[n] = bstr.charCodeAt(n);
                        }
                        var file1 = new File([u8arr], name, { type: mime });
                        // console.info('file1',file1);
                        // 最后将base64编码的图片保存到数组中，留待上传。
                        formData.append("files", file1);
                        resolve(formData)
                        }
                        else {
                            formData.append("files",event.target.files[0])
                            resolve(formData)
                        }
                    }
                })
            }).then((fileList) => {
                //console.log(fileList,'fileList')
                return that.$http({
                    url: that.$http.adornUrl(`/level/levelPublish/upload//file`),
                    method: "post",
                    headers: {
                    "content-type": "multipart/form-data",
                    },
                    data: formData,
                })
            }).then((data) => {
                //console.log("文件上传后返回的数据data===》", data);
                let fileName = data.data.fileName;
                let filestr = data.data.filestr;
                let fileAllStr = data.data.allUrl
                //console.log(fileName);
                fileName.forEach((v, i) => {
                that.imgList.push({
                    name: fileName[i],
                    url: filestr[i],
                    allUrl: fileAllStr[i]
                });
                });
            });
           
        },
    },
    components: {
      imagePreview
    },
    watch: {
        imgList: {
            handler(newVal) {
                //console.log('imgList',newVal)
                this.$emit('getImgList',newVal)
            }
        },
    }
}
</script>
<style lang="less" scoped>
.uploadFile {
        display: flex;
        // flex-wrap: wrap;
        background: #fff;
        position: relative;
 /* 修改input默认样式 */
  .fileStyle {
        position: absolute;
        top: 0;
        left: 0;
        margin-top: .2rem;
        width: 1.52rem;
        height: 1.52rem;
        /*透明度为0*/
        opacity: 0;
        cursor: pointer;
  }
  .pictureWrapper {
        margin-top: .2rem;
        margin-left: .1rem;
        flex: 0 1.8rem;
        height: 1.52rem;
        border: .01rem dashed #CCCCCC;
        text-align: center;
        // line-height: 1.52rem;

    img {
        width: 0.6rem;
        height: 0.6rem;
        margin-top: .27rem;
    }
    .titleText {
        // width: .8rem;
        height: .28rem;
        font-size: .2rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #999999;
    }
    }
    /* 图片列表 */
    .imgWrapper {
      display: flex;
      flex-wrap: wrap;
      padding-top: .2rem;
      align-items: center;
  .imgSlide {
      margin-left: .4rem;
      position: relative;
    img.imgStyle {
      width: 1.52rem;
      height: 1.52rem;
    }

    img.delIcon {
        position: absolute;
        top: -.09rem;
        right: -.18rem;
    }
  }
}
}
</style>