<template>
    <div class="cropper-image-upload-page">
        <div class="cropper-image" @click="chooseImage" @mouseenter="mouseenterHandler" @mouseleave="mouseleaveHandler"
            @transfer="onUploadChange">
            <!-- <img v-if="this.activity.imageurl" :src="this.activity.imageurl" class="avatar" /> -->
            <img v-if="imgUrl" :src="'data:image/jpg;base64' + imgUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
                <Plus />
            </el-icon>
            <div v-show="imgUrl && maskShow" class="mask">
                <i @click.stop="clearImg" class="el-icon-delete"></i>
            </div>
            <input type="hidden" v-model="imgUrl" placeholder="请选择图片" />
        </div>
        <el-dialog title="图片上传" v-model="imageDialog" width="900px">

            <div class="cropper-content" v-loading="uploadLoading">
                <div class="cropper-box">
                    <div class="cropper">
                        <div class="cropper-title">图片处理</div>
                        <vue-cropper ref="cropperInstance" :img="option.img" :outputSize="option.outputSize"
                            :outputType="option.outputType" :info="option.info" :canScale="option.canScale"
                            :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth"
                            :autoCropHeight="option.autoCropHeight" :fixed="option.fixed" :fixedNumber="option.fixedNumber"
                            :full="option.full" :fixedBox="option.fixedBox" :canMove="option.canMove"
                            :canMoveBox="option.canMoveBox" :original="option.original" :centerBox="option.centerBox"
                            :height="option.height" :infoTrue="option.infoTrue" :maxImgSize="option.maxImgSize"
                            :enlarge="option.enlarge" :mode="option.mode" @realTime="realTime" @imgLoad="imgLoad">
                        </vue-cropper>
                    </div>
                    <!--底部操作工具按钮-->
                    <div class="footer-btn">
                        <div class="scope-btn">
                            <label class="btn" for="uploads">选择图片</label>
                            <input type="file" id="uploads" ref="uploadsFileInstall"
                                style="position: absolute; clip: rect(0 0 0 0)"
                                accept="image/png, image/jpeg, image/gif, image/jpg" @change="selectImg($event)" />
                            <el-button size="small" type="danger" plain @click="changeScale(1)">
                                <el-icon><zoom-in /></el-icon>
                                放大
                            </el-button>
                            <el-button size="small" type="danger" plain @click="changeScale(-1)">
                                <el-icon><zoom-out /></el-icon>
                                缩小</el-button>
                            <!-- <el-button size="mini" type="danger" plain icon="el-icon-delete" @click="clearImg">清空素材</el-button> -->
                            <el-button size="small" type="danger" plain @click="rotateLeft">↺ 左旋转</el-button>
                            <el-button size="small" type="danger" plain @click="rotateRight">↻ 右旋转</el-button>
                        </div>
                        <div class="upload-btn">
                            <el-button size="small" type="success" :loading="uploadLoading" @click="uploadImg">上传图片 <i
                                    class="el-icon-upload"></i></el-button>
                        </div>
                    </div>
                </div>
                <!--预览效果图-->
                <div class="show-preview">
                    <div class="show-preview-title">预览</div>
                    <div :style="previews.div" class="preview">
                        <img v-show="previews.url" :src="previews.url" :style="previews.img" />
                    </div>
                </div>
            </div>

        </el-dialog>
    </div>
</template>
<script>
import { toRefs, watch, ref, reactive } from 'vue';
import { ZoomIn, ZoomOut } from '@element-plus/icons-vue'
//import cropperOperationFun from '../composables/cropperOperationFun'
//import cropperInitFun from '../composables/cropperInitFun'
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'
export default {
    name: 'CropperImageUpload',
    // props: {
    //     imgUrl: {
    //         type: String,
    //         default: () => ''
    //     }
    // },
    components: {
        ZoomIn,
        ZoomOut,
        VueCropper
    },
    setup(props, { emit }) {
        const imgUrl = ref("");
        const imageDialog = ref(false)
        const maskShow = ref(false)

        const chooseImage = function () {
            imageDialog.value = true
        }
        const mouseenterHandler = function () {
            maskShow.value = true
        }
        const mouseleaveHandler = function () {
            maskShow.value = false
        }
        const clearImg = function () {
            emit('update:imgUrl', '')
        }

        const previews = ref({})
        const uploadLoading = ref(false)
        const imgLoad = function () {
            uploadLoading.value = false
        }
        const realTime = function (data) {
            previews.value = data
        }

        const option = reactive({
            img: '',             //裁剪图片的地址
            outputSize: 1,       //裁剪生成图片的质量(可选0.1 - 1)
            outputType: 'jpeg',  //裁剪生成图片的格式（jpeg || png || webp）
            info: true,          //图片大小信息
            canScale: true,      //图片是否允许滚轮缩放
            autoCrop: true,      //是否默认生成截图框
            autoCropWidth: 280,  //默认生成截图框宽度
            autoCropHeight: 160, //默认生成截图框高度
            fixed: true,         //是否开启截图框宽高固定比例
            fixedNumber: [7, 4], //截图框的宽高比例
            full: true,         //false按原比例裁切图片，不失真
            fixedBox: true,      //固定截图框大小，不允许改变
            canMove: false,      //上传图片是否可以移动
            canMoveBox: true,    //截图框能否拖动
            original: false,     //上传图片按照原始比例渲染
            centerBox: false,    //截图框是否被限制在图片里面
            height: true,        //是否按照设备的dpr 输出等比例图片
            infoTrue: false,     //true为展示真实输出图片宽高，false展示看到的截图框宽高
            maxImgSize: 3000,    //限制图片最大宽度和高度
            enlarge: 1,          //图片根据截图框输出比例倍数
            mode: '280px 160px'  //图片默认渲染方式
        })
        const chooseImageType = ref('jpeg')
        const cropperInstance = ref(null) // 用于标识cropper组件实例  vue2.x 中的ref
        const uploadsFileInstall = ref(null) // 用于标识 file控件的 ref属性
        // 图片缩放
        const changeScale = function (num) {
            num = num || 1
            cropperInstance.value.changeScale(num)
        }
        // 向左旋转
        const rotateLeft = function () {
            cropperInstance.value.rotateLeft()
        }
        // 向右旋转
        const rotateRight = function () {
            cropperInstance.value.rotateRight()
        }
        // 选择图片
        const selectImg = function (e) {
            if (!e.target.files.length) return
            if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) {
                alert('图片类型要求：jpeg、jpg、png')
                return false
            }
            let file = e.target.files[0]
            let strArr = file.name.split('.')
            chooseImageType.value = strArr[strArr.length - 1]
            let reader = new FileReader()
            reader.onload = (e) => {
                //console.log("接受数据类型", e.target.result);
                let data
                if (typeof e.target.result === 'object') {
                    data = window.URL.createObjectURL(new Blob([e.target.result]))
                } else {
                    data = e.target.result
                }
                option.img = data
            }
            //转化为base64
            reader.readAsDataURL(file)

        }
        // 上传图片
        const uploadImg = function () {
            cropperInstance.value.getCropData(async (data) => {
                console.log("图片数据", data)
                imgUrl.value = data;
                emit('uploadImgSuccess', data);
            })
            imageDialog.value = false;

            // this.$emit(transfer, option.img);
            //console.log("图片类型", option.img);
            // if (type !== 'blob') return
            // cropperInstance.value.getCropBlob(async (data) => {
            //     let formData = new FormData();
            //     formData.append('file_data', data, `DX.${chooseImageType.value}`)
            //     //调用axios上传   将请求地址改为自己图片上传的地址
            //uploadLoading.value = true
            //     let res = await axios({ method: 'post', url: 'http://localhost:8888/uploadCosFile', data: formData, headers: { 'Content-Type': 'multipart/form-data' } })
            //     if (res.code === 0) {
            //         alert('上传成功!') // 此处可以换成  UI库内的提示
            // emit('uploadImgSuccess', res.data)

            //     } else {
            //         alert('文件服务异常，请联系管理员!') // 此处可以换成  UI库内的提示
            //     }
            // })



            // imageDialog.value = false;
            // imgUrl.value = option.img;
            // emit('uploadImgSuccess', option.img);
        }

        watch(imgUrl, (v) => {
            option.img = v && uploadsFileInstall.value && (uploadsFileInstall.value.value = '')
            // v && uploadsFileInstall.value && (uploadsFileInstall.value.value = '')
        }, {
            immediate: true
        })

        return {
            imgUrl,
            imageDialog,
            maskShow,
            clearImg,
            chooseImage,
            mouseenterHandler,
            mouseleaveHandler,

            previews,
            uploadLoading,
            imgLoad,
            realTime,
            option,
            chooseImageType,
            cropperInstance,
            uploadsFileInstall,
            changeScale,
            rotateLeft,
            rotateRight,
            selectImg,
            uploadImg
        }
    },
};
</script>

<style scoped>
.cropper-content {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    padding: 12px 16px;
}

.cropper-content .cropper-box {
    flex: 1;
    width: 100%;
}

.cropper-content .cropper-box .cropper {
    width: auto;
    height: 300px;
}

.cropper-content .cropper-box .cropper>.cropper-title {
    font-size: 16px;
    font-weight: 600;
    padding-bottom: 10px;
}

.cropper-content .show-preview {
    padding-left: 16px;
    flex: 1;
    -webkit-flex: 1;
}

.cropper-content .show-preview .preview {
    overflow: hidden;
    border: 1px solid #ccc;
    background: #cccccc;
    width: 280px !important;
    height: 160px !important;
}

.cropper-content .show-preview .show-preview-title {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 10px;
}

.footer-btn {
    margin-top: 60px;
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
}

.footer-btn .scope-btn {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    padding-right: 10px;
}

.footer-btn .upload-btn {
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
}

.footer-btn .btn {
    outline: none;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    font-weight: 500;
    padding: 5px 11px;
    font-size: 12px;
    border-radius: 3px;
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
    margin-right: 10px;
}



.cropper-image-upload-page .cropper-image {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 210px;
    height: 120px;
    cursor: pointer;
    border: 1px dashed #e6e6e6;
}

.cropper-image-upload-page .cropper-image>i {
    font-size: 28px;
}

.cropper-image-upload-page .cropper-image>img {
    width: 100%;
    height: 100%;
}

.cropper-image-upload-page .cropper-image .mask {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.25);
    width: 100%;
    height: 100%;
}

.cropper-image-upload-page .cropper-image .mask i {
    color: #fff;
    font-size: 18px;
}
</style>