<template>
	<view class="add">
		<form @submit="onSubmit">
			<view class="item">
				<input v-model="formValue.title" type="text" name="title" placeholder="请输入title" />
			</view>
			<view class="item">
				<input v-model="formValue.author" type="text" name="author" placeholder="请输入author" />
			</view>
			<view class="item">
				<textarea v-model="formValue.content" name="content" placeholder="请输入详细内容"></textarea>
			</view>

			<view class="item">
				<uni-file-picker v-model="imageValue" fileMediatype="image" mode="grid" @success="uploadSuccess" />
			</view>

			<view class="item">
				<view class="button">
					<button form-type="reset">重置</button>
					<button form-type="submit" type="primary" :disabled="isDisable(formValue)">提交</button>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageValue: [],
				picurls: [],
				formValue: {
					title: "",
					author: "",
					content: ""
				}
			};
		},
		methods: {
			uploadSuccess(e) {
				console.log('e', e);
				this.picurls = e.tempFilePaths
			},
			isDisable(obj) {
				// for (let key in obj) {
				// 	// console.log(obj[key]);
				// 	if (!obj[key]) {
				// 		return true
				// 	}
				// }
				
				// some 有真则真,   every 有假则假
				let bool =  Object.keys.some((key,value) => {
					return obj[key] == ''
				})
				return bool
			},
			onSubmit(e) {
				// console.log('e', e);
				let detail = e.detail.value
				console.log('detail', detail);
				uniCloud.callFunction({
					name: "art_add_row",
					data: {
						detail,
						picurls:this.picurls
					}
				}).then(res => {
					// console.log("res",res);

					uni.showToast({
						title: "发布成功"
					})

					setTimeout(() => {
						uni.reLaunch({
							url: "/pages/index/index"
						})
					}, 800)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add {
		padding: 30rpx;

		.item {
			padding-bottom: 20rpx;

			input,
			textarea {
				border: 1px solid #eee;
				height: 80rpx;
				padding: 0 20rpx;
			}

			textarea {
				height: 200rpx;
				width: 100%;
				box-sizing: border-box;
			}

			.button {
				display: flex;

				button {
					width: 40%;
				}
			}
		}
	}
</style>