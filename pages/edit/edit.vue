<template>
	<view class="edit">
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
				},
				id:''
			};
		},
		onLoad(e) {
			this.id = e.id
			this.getDetail(e.id)
		},
		methods: {
			uploadSuccess(e) {
				console.log('e', e);
				this.picurls = e.tempFilePaths
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
					this.formValue = res.result.data[0]
					
					if (!this.formValue.picurls) return
					let urls = this.formValue.picurls.map(item=> {
						return {url: item}
					})
					this.imageValue = urls
				}).catch((err) => {
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
			},
			isDisable(obj) {
				// some 有真则真,   every 有假则假
				let bool =  Object.keys.some((key,value) => {
					return obj[key] == ''
				})
				return bool
			},
			onSubmit() {
				// console.log('this.picurls',this.picurls);
				// console.log('this.imageValue',this.imageValue);
				let _picurls = this.imageValue.map(it=>{
					return it.url
				})
				uniCloud.callFunction({
					name: "art_update_row",
					data: {
						detail:this.formValue,
						picurls:_picurls
					}
				}).then(res => {
					console.log("res",res);

					uni.showToast({
						title: "修改成功"
					})

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.edit {
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