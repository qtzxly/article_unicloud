<template>
	<view class="upload">
		<uni-file-picker class="picker" ref="files" :auto-upload="false" v-model="imageValue" fileMediatype="all"
			mode="grid" @select="select" @progress="progress" @success="success" @fail="fail" />

		<button class="btn" @click="upload">上传文件</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageValue: []
			};
		},
		methods: {
			upload() {
				this.$refs.files.upload()
			},
			// 获取上传状态
			select(e) {
				console.log('选择文件：', e)
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功', e)
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.upload {
		/deep/ .picker {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 40rpx;

			button {
				height: 100rpx;
				width: 500rpx;
				line-height: 100rpx;
				font-size: 40rpx;
			}

		}

		.btn {
			// margin: 40rpx 0;
			height: 100rpx;
			width: 500rpx;
		}
	}
</style>