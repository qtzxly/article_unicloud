<template>
	<view class="detail">

		<view v-if="loadState">
			<view class="title">{{detail.title}}</view>
			<view class="info">
				<text>{{detail.author}}</text>
				<text><uni-dateformat :date="detail.posttime"></uni-dateformat></text>
			</view>
			<view class="content">
				{{detail.content}}
			</view>
			
			<view class="picurls" v-if="detail.picurls && detail.picurls.length">
				<image v-for="item in detail.picurls" :src="item" mode="widthFix"></image>
			</view>

			<view class="btnGroup">
				<button size="mini" @click="goEdit">编辑</button>
				<button size="mini" type="warn" @click="onRemove">删除</button>
			</view>
		</view>

		<uni-load-more class="loading" v-else status="loading"></uni-load-more>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				loadState: false,
				detail: {}
			};
		},
		onLoad(e) {
			this.id = e.id
			this.getDetail(e.id)
		},
		methods: {
			goEdit() {
				uni.navigateTo({
					url: "/pages/edit/edit?id=" + this.id
				})
			},
			onRemove() {
				uni.showModal({
					content: "确认删除？",
					success: res => {
						this.removeFunc()
					}
				})
			},
			removeFunc() {
				uniCloud.callFunction({
					name: "art_remove_row",
					data: {
						id: this.id
					}
				}).then(res => {
					console.log(res);
					uni.showToast({
						title: "删除成功~"
					})
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/index/index'
						})
					}, 800)
				})
			},
			getDetail(id) {
				uniCloud.callFunction({
					name: "art_get_row",
					data: {
						id
					}
				}).then(res => {
					console.log(res);
					this.loadState = true
					this.detail = res.result.data[0]
					uni.setNavigationBarTitle({
						title: this.detail.title
					})
				}).catch((err) => {
					console.log(12312313);
					uni.showToast({
						icon: "error",
						title: "数据错误"
					})
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/index/index'
						})
					}, 800)
				})
			}
		}
	}
</script>

<style lang="scss">
	.detail {
		.loading {
			padding-top: 30vh;
		}

		padding: 30rpx;

		.title {
			font-size: 50rpx;
			color: #000;
			text-align: justify;
			align-items: 1.5em
		}

		.info {
			font-size: 30rpx;
			color: #666;
			padding: 30rpx 0 60rpx;

			text {
				padding-right: 30rpx;
			}
		}

		.content {
			font-size: 36rpx;
			line-height: 1.7rem;
		}

		.btnGroup {
			padding: 50rpx 0;

			button {
				margin-right: 30rpx;
			}
		}
	}
</style>