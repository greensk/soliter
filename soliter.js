Vue.component('field', {
	computed: {
		left: function () {
			return parseInt(this.x) * 50;
		},
		top: function () {
			return parseInt(this.y) * 50;
		}
	},
	template: "<div\
		class='field'\
		@click='click'\
		:style='{left: left, top: top}'\
		:class='{place: place, selected: selected}'\
	></div>",
	props: ['x', 'y', 'place', 'selected'],
	methods: {
		click: function () {
			this.$emit('click');
		}
	}
})
new Vue({
	el: '#app',
	data: function () {
		return {
			mapWidth: 4,
			mapHeight: 3,
			fields: [],
			selX: null,
			selY: null
		};
	},
	ready: function () {
		var fields = [];
		for (var x = 0; x < this.mapWidth; x++) {
			fields[x] = [];
			for (var y = 0; y < this.mapHeight; y++) {
				fields[x][y] = {
					place: x !== 0 || y !== 0,
					selected: false
				}
			}
		}
		this.fields = fields;
	},
	methods: {
		click: function (x, y, item) {
			if (item.place) {
				this.selX = x;
				this.selY = y;
				return;
			} else if (x === this.selX && Math.abs(y - this.selY) === 2) {
				var dropY = y < this.selY ? y + 1 : y - 1;
				if (!this.fields[x][dropY].place) {
					return;
				}
				this.fields[x][dropY].place = false;
			} else if (y === this.selY && Math.abs(x - this.selX) === 2) {
				var dropX = x < this.selX ? x + 1 : x - 1;
				if (!this.fields[dropX][y].place) {
					return;
				}
				this.fields[dropX][y].place = false;
			} else {
				return;
			}
			this.fields[this.selX][this.selY].place = false;
			this.fields[x][y].place = true;
			this.selX = null;
			this.selY = null;
		}
	}
});
