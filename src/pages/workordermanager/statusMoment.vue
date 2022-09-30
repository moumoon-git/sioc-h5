<template>
    <div>
        <!-- 记录展示 -->
        <div class="history-container">
            <div v-for="item in this.handleResponseEntities" :key="item.id" class="history-item">
                <!-- 头像 -->
                <span style="float:left">
                    <span class="history-avatar">{{item.userName}}</span>
                    <span class="history-content-time">{{item.gmtCreate}}</span>
                    <!-- <span class="history-avatar-job" v-if="item.job">{{item.job}}</span>
                    <span class="history-avatar-job history-avatar-nojob" v-else>{{item.job}}</span> -->
                </span>
                
                <!-- 气泡框内容（普通无回复） -->
                <span class="history-content-wrapper" v-if="item.responseType!=3">
                    <!-- 1. 记录的类型 -->
                    <span v-if="item.responseType==-1">已取消（停用）工单</span>
                    <span v-if="item.responseType==0">处置中（重启）工单</span>
                    <span v-if="item.responseType==1">已处置（完成）工单</span>
                    <span v-if="item.responseType==2">处置工单</span>
                    <!-- 2. 记录的内容 -->
                    <el-row class="history-content-comment">{{item.remark}}</el-row>
                    <!-- 3. 记录的附件 -->
                    <el-row class="history-content-attachments" v-for="(file, index) in item.documentList" :key="index">
                        <img v-if="isImg(file.allUrl)" :src="file.allUrl" :alt="file.name" class="history-content-image"/>
                        <a v-else :href="file.allUrl">{{file.name}}</a>
                    </el-row>
                    <!-- 4. 记录的定位 -->
                    <el-row class="history-content-location"><i class="el-icon-location" style="color:blue"></i>{{item.workPlace}}</el-row>
                    <!-- 5. 回复按钮 -->
                    <el-button type="text" class="history-content-reply" @click="historyReply(item.id, item.userName, item.remark)">回复</el-button>
                </span>
                <!-- 气泡框内容（带有回复） -->
                <span class="history-content-wrapper" v-else>
                    <!-- 1. 工单类型 -->
                    <span v-if="item.handleResponseEntity.responseType==-1">已取消（停用）工单</span>
                    <span v-if="item.handleResponseEntity.responseType==0">处置中（重启）工单</span>
                    <span v-if="item.handleResponseEntity.responseType==1">已处置（完成）工单</span>
                    <span v-if="item.handleResponseEntity.responseType==2">处置工单</span>
                    <span v-if="item.handleResponseEntity.responseType==3">回复工单</span>
                    <!-- 2. 被回复的用户名 -->
                    <span>{{item.handleResponseEntity.userName}}</span>
                    <!-- 3. 被回复的工单内容 -->
                    <el-row class="history-content-comment">{{item.handleResponseEntity.remark}}</el-row>
                    <!-- 4. 被回复的工单附件 -->
                    <el-row class="history-content-attachments" v-for="(file, index) in item.handleResponseEntity.documentList" :key="index">
                        <img v-if="isImg(file.allUrl)" :src="file.allUrl" :alt="file.name" class="history-content-image"/>
                        <a v-else :href="file.allUrl">{{file.name}}</a>
                    </el-row>
                    <!-- 5. 回复内容 -->
                    <el-row>
                        <span>回复工单</span>
                        <span class="history-content-time">{{item.handleResponseEntity.gmtCreate}}</span>
                    </el-row>
                    <el-row class="history-content-comment">{{item.remark}}</el-row>
                    <!-- 6. 回复内容的附件 -->
                    <el-row class="history-content-attachments" v-for="(file, index) in item.documentList" :key="index">
                        <img v-if="isImg(file.allUrl)" :src="file.allUrl" :alt="file.name" class="history-content-image"/>
                        <a v-else :href="file.allUrl">{{file.name}}</a>
                    </el-row>
                    <!-- 7. 定位 -->
                    <el-row class="history-content-location"><i class="el-icon-location" style="color:blue"></i>{{item.workPlace}}</el-row>
                    <!-- 8. 回复按钮 -->
                    <el-button type="text" class="history-content-reply" @click="historyReply(item.id, item.userName, item.remark)">回复</el-button>
                </span>
            </div>
        </div>
        <!-- 被回复的记录概览 -->
        <el-row class="replying-wrapper" v-if="showReplying">
            <p>{{replyTo.name}}</p>
            <p>{{replyTo.remark}}</p>
            <span class="el-icon-close" @click="replyClose"></span>
        </el-row>
        <!-- 回复、评论输入部分 -->
        <el-row class="reply-wrapper">
            <textarea class="reply-input" rows="2" placeholder="请输入工单处置情况" v-model="statusForm.remark"></textarea>
            <!-- <i class="el-icon-picture"></i>
            <i class="el-icon-picture"></i> -->
            <!-- 上传 -->
            <input type="file" multiple @change="getFile($event)">
            <span v-for="(item, index) in statusForm.documentList" :key="index" style="border:1px solid black;height:60px;width:160px;display:inline-block;overflow:hidden;">
                <img v-if="isImg(item.url)" alt="index" :src="hostUrl + item.url" width="60" height="60"/>
                <a v-else :href="item.url">{{item.name}}</a>
                <i class="el-icon-close" @click="deleteFile(item.url, statusForm.documentList)"></i>
            </span>
            <el-button type="text" class="reply-submit" @click="statusFormInit">清空</el-button>
            <el-button type="text" class="reply-submit" @click="statusSubmit">提交</el-button>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'statusMoment',
    props: [
        "workId",
        "handleResponseEntities",
        "getSingleData",
    ],
    created() {
        // 获取当前登录的用户ID
        this.userId = this.$cookie.get('userId').slice(2);
    },
    watch: {
        // viewWhich(id) {
        //     this.statusForm.workId = id;
        // },
    },
    methods: {
        // 提交回复/评论
        statusSubmit() {
            let url = window.SITE_CONFIG['baseUrl'] + "//work/workHandleResponse/pcReply";
            let that = this;
            that.statusForm.workId = that.workId;
            //console.log("提交回复/评论: ", that.statusForm);
            this.$confirm('确认提交？')
            .then(_ => {
                this.$http
                .post(url, that.statusForm, {emulateJSON:true})
                .then(
                    function(res) {
                        that.statusFormInit();
                        that.replyClose();
                        that.getSingleData(that.workId);
                    },
                    function(res) {
                        //console.log("提交失败：", res);
                    }
                );
                done();
            })
            .catch(_ => {});
        },
        // 重置输入的内容
        statusFormInit() {
            this.statusForm.workPlace = '增城区智慧治理综合管理平台';
            this.statusForm.remark = '';
            this.statusForm.workId = '';
            this.statusForm.handleResponseId = '0';
            this.statusForm.documentList = [];
        },
        // 点击回复按钮
        historyReply(id, name, remark) {
            //console.log("reply to id: ", id);
            this.showReplying = true;
            this.replyTo.name = name;
            this.replyTo.remark = remark;
            this.statusForm.handleResponseId = id;
        },
        // 关闭下方被回复的信息的预览
        replyClose() {
            this.showReplying = false;
            this.replyTo.name = '';
            this.replyTo.remark = '';
            this.statusForm.handleResponseId = 0;
        },
        // 判断是图片还是文档
        isImg(url) {
            let res = url.slice(-4);
            if(res == '.png' || res == '.jpg' || res == 'jpeg' || res == '.gif' || res == '.bmp') {
                return true;
            }
            return false;
        },
        // 删除文件
        deleteFile(url, list) {
            let that = this;
            for(let index in list) {
                if(list[index].url == url) {
                    list.splice(index, 1);
                }
            }
            //console.log("删tmd：", list);
        },
        // 文件上传，返回文件所在服务器url
        getFile(event) {
            // 上传接口
            let url = window.SITE_CONFIG['baseUrl'] + "/upload/emergencyHandleProcessFile";
            let that = this;
            // 上传的文件列表
            let fileList = event.target.files;
            for(let file of fileList) {
                // 每次上传1个文件，返回一条url
                let formData = new FormData();
                formData.append("file", file);
                formData.append("token", that.$cookie.get("token"));
                that.$http
                .post(url, formData, {emulateJSON: true})
                .then(
                    function(res) {
                        //console.log("upload successfully and get response: ", res.data.data);
                        that.statusForm.documentList.push({
                            name: res.data.data.name,
                            url: res.data.data.url,
                        });
                        // 清空input值，防止重复上传时不触发change事件
                        event.srcElement.value='';
                    },
                    function(res) {
                        //console.log("upload fail: ", res);
                    }
                );
            }
        },
    },
    data() {
        return {
            // 当前登录用户的id
            userId: '',
            statusForm: {
                workPlace: '增城区智慧治理综合管理平台',
                remark: '',
                workId: '',
                handleResponseId: 0,
                documentList: [],
            },
            showReplying: false,
            replyTo: {
                name: '',
                remark: '',
            },
            // 上传图片的服务器主机地址
            hostUrl: window.SITE_CONFIG['cloudUrl'],
        }
    },
    
}
</script>

<style>
.history-container {
    height: 400px;
    overflow: auto;
}
.history-item {
    margin: 15px 0;
    position: relative;
}
.history-avatar {
    border: 1px solid #0091FF;
    border-radius:9000px;
    display: inline-block;
    width:50px;
    height:50px;
    line-height: 50px;
    background:#0091FF;
    color:white;
    text-align:center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.history-avatar-job {
    border: 1px solid #333333;
    border-radius: 4px;
    background: #333333;
    color: white;
    display: inline-block;
    width: 50px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    position: relative;
    left: -54px;
    top: 35px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.history-avatar-nojob {
    visibility: hidden;
}
.history-content-wrapper {
    display: inline-block;
    width: 350px;
    border: 1px solid white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    position: relative;
    top: -0px;
    left: -30px;
}
.history-content-wrapper::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid white;
    background: white;
    position: relative;
    left: -10px;
    top: 10px;
    transform:rotate(45deg);
    box-shadow: -3px 3px 5px 0 rgba(0, 0, 0, 0.1);
}
.history-content-time {
    color: #AAAAAA;
    position: absolute;
    right: 3px;
}
.history-content-comment {
    margin: 0 15px;
}
.history-content-location {
    color: #7F7F7F;
    margin-left: 15px;
}
.history-content-reply {
    position: absolute;
    right: 5px;
    bottom: -5px;
}
.history-content-image {
    max-width: 200px;
    max-height: 200px;
    margin-left: 15px;
}
.replying-wrapper {
    border: 1px solid black;
}
.reply-wrapper{
    border: 1px solid black;
}
.reply-input {
    width: 100%;
    border: none;
    resize: none;
}
.reply-submit{
    float:right;
}
</style>