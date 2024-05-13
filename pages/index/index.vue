<template>
	<view class="home">
		<view class="content">
			<view class="item" v-for="item in listArr" :key="item._id">
				<view class="text">
					<view class="title">{{item.title}}</view>
					<view class="info">
						<text>{{item.author}}</text>
						<text>{{item.posttime}}</text>
						<text>删除</text>
					</view>
				</view>
				<view class="pic">
					<image mode="aspectFill" src="../../static/images/nopic.jpg"></image>
				</view>
			</view>
		</view>

		<view class="goAdd" @click="goAdd">+</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listArr: []
			}
		},
		onLoad() {
			this.getData()
		},
		// onShow() {
		// 	this.getData()
		// }
		onReachBottom(){
			this.getData()
		},
		methods: {
			getData() {
				uniCloud.callFunction({
					name: "art_get_all",
					data: {
						// skip:4
						skip: this.listArr.length
					}

				}).then(res => {
					console.log('res', res);
					let oldList = this.listArr
					let nsList = [...oldList,...res.result.data]
					this.listArr = nsList
				})
			},
			goAdd() {
				uni.navigateTo({
					url: "/pages/add/add"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		.content {
			padding: 30rpx;

			.item {
				display: flex;
				justify-content: space-between;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #eee;

				.text {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding-right: 20rpx;

					.title {
						font-size: 44rpx;
						color: #333;
						text-align: justify;

						word-break: break-all;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						/* 这里是超出几行省略 */
						overflow: hidden;
					}

					.info {
						font-size: 28rpx;
						color: #888;

						text {
							padding-right: 20rpx;
						}
					}
				}

				.pic {
					width: 280rpx;
					height: 180rpx;

					image {
						height: 100%;
						width: 100%;
					}
				}
			}
		}

		.goAdd {
			width: 100rpx;
			height: 100rpx;
			background: #2b9939;
			color: #fff;
			font-size: 54rpx;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			position: fixed;
			right: 60rpx;
			bottom: 100rpx;
			box-shadow: 0 0 20rpx rgba(43, 153, 57, 0.6);
		}
	}
</style>