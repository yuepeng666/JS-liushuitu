window.onload = function(){
	imgLocation("container","box");
	var imgData = {"data":[{"src":"P_00.jpg"},{"src":"P_01.jpg"},{"src":"P_02.jpg"},{"src":"P_03.jpg"},
	{"src":"P_04.jpg"},{"src":"P_05.jpg"},{"src":"P_06.jpg"},{"src":"P_07.jpg"},{"src":"P_08.jpg"},
	{"src":"P_09.jpg"},{"src":"P_010.jpg"},{"src":"P_011.jpg"},{"src":"P_012.jpg"},{"src":"P_013.jpg"},
	{"src":"P_014.jpg"},{"src":"P_015.jpg"},{"src":"P_016.jpg"},{"src":"P_017.jpg"},{"src":"P_018.jpg"},{"src":"P_019.jpg"}]};
	// 模拟json字符串
	window.onscroll = function(){
		// 循环创建
        // <div class="box">
		// 	<div class="box_img">
		// 		<img src="images/P_013.jpg" alt="">
		// 	</div>
		// </div		
		if (checkFlag()){
			var cparent = document.getElementById("container");
			for(var i=0;i<imgData.data.length;i++){ //imgData.data.legth
				var ccontent = document.createElement("div");
				ccontent.className = "box";
				cparent.append(ccontent);
				var boximg =document.createElement("div");
				boximg.className = "box_img";
				ccontent.append(boximg);
				var img = document.createElement("img");
				img.src = "images/"+imgData.data[i].src;
				boximg.append(img);
			}
			imgLocation("container","box"); //使新建的box应用轮播效果
		}
	}
}
	//将parent下的所有内容取出 ccconten=所有的box
function imgLocation (parent,content){
	var cparent = document.getElementById(parent);
	var ccontent = getChildElement(cparent,content);
	// console.log(ccontent);
	var imgWidth = ccontent[0].offsetWidth;//获得img的宽度
	var num = Math.floor(document.documentElement.clientWidth / imgWidth);
	//docment.documentElement.clientWidth得到屏幕的宽度,num=每一排摆放的盒子数量
	cparent.style.cssText = "width:"+imgWidth*num+"px;margin:0px auto";
    //获得盒子的高度
	var boxHeightArr = [];
	for(var i=0;i<ccontent.length;i++){
		if (i<num) {
            boxHeightArr[i]=ccontent[i].offsetHeight;
		   //获得第一排的高度			
		}else {
	        var minheight = Math.min.apply(Math,boxHeightArr);
	        // appl传递两个参数，一个是参数的作用域，一个是参数数组
	        var minIndex = getminheightLoaction(boxHeightArr,minheight);//i是最小高度图片 minIndex=i
	        ccontent[i].style.position = "absolute";
	        ccontent[i].style.top = minheight+"px";
	        ccontent[i].style.left = ccontent[minIndex].offsetLeft+"px";
	        boxHeightArr[minIndex] = boxHeightArr[minIndex]+ccontent[i].offsetHeight;
	        //当前盒子最小高度 = 盒子最小高度+最小盒子高度下面图片高度			
		}	
	}	
}
//获得最小高度的图片位置
function getminheightLoaction(boxHeightArr,minHeight){
	for(var i in boxHeightArr){ //遍历boxHeightArr
		if(boxHeightArr[i] == minHeight){
			return i;
		}
	}
}
//找到所有的box
function getChildElement(parent,content){
	var contentArr = [];
	var allcontent = parent.getElementsByTagName("*");//获得所有内容
	for(var i=0;i<allcontent.length;i++){
		if(allcontent[i].className==content){
			contentArr.push(allcontent[i]);
		}
	}
	return contentArr;
}
function checkFlag(){
	var cparent = document.getElementById("container");
	var ccontent = getChildElement(cparent,"box");
	var lastContentHeight = ccontent[ccontent.length-1].offsetTop;
	//获得最后一个元素距离页面顶端的位置
	var scrolltop = document.documentElement.scrollTop||document.body.scrollTop;//考虑兼容性
	//获得滚动的条距离顶端的位置
	var pageHeiht = document.documentElement.clientHeight||document.body.clientHeight;
	//可见窗口大小
	if(lastContentHeight<scrolltop+pageHeiht){
		return true;
	}
}
