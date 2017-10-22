var data=[];
initFirebase();
getAllData();

$('.yayasan').click(function() {
	console.log("click");
});

function initFirebase() {
  var config = {
    apiKey: "AIzaSyBprCTN37vforliHYlbS4QZPdZp3xX-PO0",
    authDomain: "jakat-id.firebaseapp.com",
    databaseURL: "https://jakat-id.firebaseio.com",
    projectId: "jakat-id",
    storageBucket: "jakat-id.appspot.com",
    messagingSenderId: "1059928732908"
  };
  firebase.initializeApp(config);
}

var rootRef = firebase.database().ref();

function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

const query = getQueryParams(document.location.search);
var keykey = query.key;

function submitChild() {
	var ref = rootRef.child('yayasan').push(),
		unique = ref.key;
	var storageRef = firebase.storage().ref(unique);
	// Inputs
	var name = $('#nama').val(),
		status = $('#status').val(),
		story = $('#story').val(),
		size = $('#size').val(),
		sizeClothes = $('#sizeClothes').val(),
		sizeShoes = $('#sizeShoes').val(),
		needClothesGirl = $('#needsClothesGirl').val(),
		needClothesBoy = $('#needsClothesBoy').val(),
		needShoes = $('#needsShoes').val(),
		needsHandphone = $('#needsHandphone').val(),
		needssmartPhone = $('#needssmartPhone').val(),
		needsLaptop = $('#needsLaptop').val(),
		needs = $('#needs').val();
	var file_data = $('#imageProduct').prop('files')[0];
	var datas = {
		name: name,
		status: status,
		story: story,
		clothesGirl: needClothesGirl,
		clothesBoy: needClothesBoy,
		shoes: needShoes,
		handphone: needsHandphone,
		smartphone: needssmartPhone,
		laptop: needsLaptop,
		key: unique,
		image: unique
	}
	storageRef.put(file_data);
	ref.set(datas);
}

function submitDonatur() {
	var ref = rootRef.child('donatur').push(),
		unique = ref.key;
	var storageRef = firebase.storage().ref(unique);
	// Inputs
	var name = $('#name').val(),
		email = $('#email').val(),
		telp = $('#telp').val(),
		alamat = $('#alamat').val(),
		pickupdate = $('#pickupDate').val(),
		pickuptime = $('#pickupTime').val();
	var yayasanku=[];
	var checkboxes = document.getElementsByName('yayasanku[]');
	var vals = "";
	for (var i=0, n=checkboxes.length;i<n;i++) 
	{
	    if (checkboxes[i].checked) 
	    {
	        vals += ","+checkboxes[i].value;
	    }
	}
	if (vals) vals = vals.substring(1);
	var datas = {
		name: name,
		email: email,
		telp: telp,
		alamat: alamat,
		pickuptime: pickuptime,
		pickupdate: pickupdate,
		yayasan: vals,
		key: unique,
		donasi: keykey
	}
	storageRef.put(file_data);
	ref.set(datas);
	window.location.href= 'thank-you.html';
}

function submitDetailDonasi() {
	var ref = rootRef.child('donatur').push(),
		unique = ref.key;
	// Inputs
	var name = $('#name').val(),
		email = $('#email').val(),
		telp = $('#telp').val(),
		alamat = $('#alamat').val(),
		pickupdate = $('#pickupDate').val(),
		pickuptime = $('#pickupTime').val();
	var yayasanku=[];
	var checkboxes = document.getElementsByName('yayasanku[]');
	alert(checkboxes);
	var vals = "";
	for (var i=0, n=checkboxes.length;i<n;i++) 
	{
	    if (checkboxes[i].checked) 
	    {
	        vals += ","+checkboxes[i].value;
	    }
	}
	if (vals) vals = vals.substring(1);
	var datas = {
		name: name,
		email: email,
		telp: telp,
		alamat: alamat,
		pickuptime: pickuptime,
		pickupdate: pickupdate,
		yayasan: vals,
		key: unique
	}
	ref.set(datas);
}

function getAllData() {
	firebase.database().ref('yayasan/').once('value').then(function(snapshot) {
	    snapshot.forEach(function(userSnapshot) {
	        var yayasan = userSnapshot.val();
	        console.log(yayasan.name);
	        getImage(yayasan.image);
	        createArticle(yayasan);       
	    });
	});
}

function getImage(image){
	var storageRef = firebase.storage().ref(image);
	var spaceRef = storageRef.child('yayasan');
	storageRef.getDownloadURL().then(function(url) {
		var test = url;
		document.querySelector('#'+image).src = test;

	}).catch(function(error) {
		console.log('Error : ' + error)
	});
}

function createArticle(yayasan) {
	var html = '<div class="yayasan" style="width: 350px;margin-left:20px;">'+
          '<div class="card">'+
            '<div class="card-image">'+
              '<figure class="image is-4by3">'+
                '<img src="http://via.placeholder.com/350x300" alt="Placeholder image"   id="'+yayasan.image+'">'+
              '</figure>'+
            '</div>'+
            '<div class="card-content">'+
              '<div class="media">'+
                '<div class="media-content">'+
                  '<p class="title is-5 puth">'+yayasan.name+'</p>'+
                '</div>'+
              '</div>'+

              '<div class="content"> Kebutuhan : ' + yayasan.laptop + ' laptops<br/>'+
			    '<input type="checkbox" class="single-checkbox" name="yayasanku[]" value="'+yayasan.name+'" onChange="onchangeYayasan(this)">'+
			     ' Saya mau berdonasi untuk yayasan ini '+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>';
    $('#yayasan-list').append(html);
}

var limit = 1;
function onchangeYayasan(e){
   if($('.single-checkbox:checked').length > limit) {
       e.checked = false;
   }
};

// To do matching, button click, send id to firebase