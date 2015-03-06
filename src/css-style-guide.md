# CSS Style Guide
## 属性书写顺序
* Formatting Model (position/top/left/bottom/right/float/display/overflow)
* Box Model (width/height/padding/border/margin)
* Typographic (font/line-height/text-align/word-wrap)
* Visual (background/color/transition/list-style)

### for example
.sidebar {
	// formatting model
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	float: left;
	display: block;
	overflow: hidden;
	// box model
	width: 100px;
	height: 100px;
	margin: 50px;
	border: 1px solid #000;
	padding: 10px;
	// typographic
	font-size: 16px;
	line-height: 1.428;
	text-align: left;
	word-wrap: break-word;
	// visual
	background: rgba(0, 0, 0, .5);
	color: #fff;
	transition: all .5s;
}
