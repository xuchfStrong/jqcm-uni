<template>
	<view>
		<button type="primary" size="default" @click="add">添加</button>
		<br>
		<button type="primary" size="default" @click="sendmsg">留言</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			add() {
				const db = uniCloud.database();
				const bookTable = db.collection('book');
				bookTable.add({
					title: "美丽的祖国",
					author: "xuchangfan"
				})
			},
			sendmsg() {
				const db = uniCloud.database();
				const bookTable = db.collection('guestbook');
				bookTable.add({
					text: "美丽的祖国"
				})
			}
		}
	}
</script>

<style>

</style>
