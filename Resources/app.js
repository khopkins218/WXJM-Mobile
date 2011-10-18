Titanium.UI.setBackgroundColor('#000');
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#000'
});

if (Ti.Network.online == false) {
	Ti.UI.createAlertDialog({
		title:"Your internet connection appears to be turned off.  Please be sure you have network connectivity before trying to stream!"
	});
};

var logo = Ti.UI.createImageView({
	image:"wxjm.gif",
	height:160,
	top:10,
	left:10
});

var info = Ti.UI.createImageView({
	image:"info.png",
	height:16,
	top:10,
	left:260
});

info.addEventListener("click", function() {
	var t = Titanium.UI.create2DMatrix();
	t = t.scale(0);

	var w = Titanium.UI.createWindow({
		backgroundColor:'#333333',
		borderWidth:8,
		borderColor:'#999',
		height:400,
		width:300,
		borderRadius:10,
		opacity:0.95,
		transform:t
	});
	
	var myLabel = Ti.UI.createLabel({
		font:{
			fontSize:14
		},
		color:"#fff",
		text:"   This application was developed by \nKevin L. Hopkins for exclusive use by WXJM, the JMU student run radio station.\n\n   Neither Kevin nor WXJM are responsible for misuse of this application.  \n\n   Sole ownership belongs to Kevin Hopkins with continued support by WXJM. \n\n Enjoy!\n\n   Contact information:\n(e) kevin@h-pk-ns.com\n(b) http://kevin.h-pk-ns.com \n(t) @devneck \n(li) linkedin.com/in/kevinlhopkins",
		width:"90%",
		height:"80%",
		top:10
	});

	w.add(myLabel);
	
	// create first transform to go beyond normal size
	var t1 = Titanium.UI.create2DMatrix();
	t1 = t1.scale(1.1);
	var a = Titanium.UI.createAnimation();
	a.transform = t1;
	a.duration = 200;

	// when this animation completes, scale to normal size
	a.addEventListener('complete', function()
	{
		var t2 = Titanium.UI.create2DMatrix();
		t2 = t2.scale(1.0);
		w.animate({transform:t2, duration:200});

	});

	// create a button to close window
	var b = Titanium.UI.createButton({
		title:'Close',
		height:30,
		width:150,
		top:350
	});
	w.add(b);
	b.addEventListener('click', function()
	{
		var t3 = Titanium.UI.create2DMatrix();
		t3 = t3.scale(0);
		w.close({transform:t3,duration:300});
	});

	w.open(a);
});

var staticText = Ti.UI.createLabel({
	text:"WXJM is the student-run college radio station for James Madison University. Since 1990, WXJM has aired music from a variety of genres as well as talk shows and live music. WXJM reaches an audience of students and community members through the 88.7 FM frequency and live online radio broadcast. WXJM reaches out to the local music scene by sponsoring shows in and around the Harrisonburg area throughout the school year. WXJM's tower and antenna sits atop Burrus Hall on the JMU campus. Our studios are located behind the CVS Pharmacy on the corner of Cantrell Avenue and Reservoir Street. Check the website often for updates on upcoming WXJM shows!",
	top:220,
	left:10,
	width:"95%",
	color:"#fff",
	font:{
		fontSize:11
	}
});

var streamer = Ti.Media.createAudioPlayer();
streamer.url = "http://radio.jmu.edu:8004";

var actionBtn = Titanium.UI.createButton({
	title:"Play",
	width:200,
	height:40,
	top:190,
	color:"#000"
});

actionBtn.addEventListener('click', function()
{
	if (actionBtn.title == "Play") {
		streamer.start();
		actionBtn.title = "Pause";
	} else {
		streamer.stop();
		actionBtn.title = "Play";
	}
});

var ind4=Titanium.UI.createProgressBar({
	width:300,
	height:30,
	bottom:0,
	min:0,
	max:4,
	value:0,
	color:'#fff',
	message:'Buffering 0%',
	font:{fontSize:14, fontWeight:'bold'},
	style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN
});

streamer.addEventListener('change',function(e)
{
	Ti.API.info("changed: " + e.state);
	var val = Number(e.state);
	if (val < 4 && val > 0) {
		ind4.show();
		ind4.value = e.state;
		ind4.message = 'Buffering ' + (val * 25) + '%';
	} else if (val == 4) {
		ind4.value = e.state;
		ind4.message = 'Buffering ' + (val * 25) + '%';
		setTimeout(function() {
			ind4.hide();
		}, 1000);
	}
});

Titanium.App.idleTimerDisabled = true;
win1.add(logo);
win1.add(info);
win1.add(staticText);
win1.add(actionBtn);
win1.add(ind4);

setTimeout(function() {
	win1.open({
		transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
	});
}, 2500);
