
var data =[];
firebaseConfig();

App.controller('home', function (page) {
$(page)
    .find('#bagikanBerkat')
    .on('click', function () {
        App.dialog({
          title        : 'Konfirmasi',
          text         : 'Apakah data yang kamu masukkan sudah benar?',
          okButton     : 'Ya',
          cancelButton : 'Tidak'
        }, function (tryAgain) {
          if (tryAgain) {
            submitUserToFirebase();
            selectFromFirebase()
            App.load('thankyou')
          }
        });
    })
});	

App.controller('thankyou', function (page) {
$(page)
  .find('.button-pesan')
  .on('click', function () {
    App.dialog({
      title        : 'Pesan Makanan',
      text         : 'Apakah kamu yakin kamu akan memesan makanan ini?',
      okButton     : 'Ya',
      cancelButton : 'Tidak'
    }, function (tryAgain) {
      if (tryAgain) {
        App.dialog({
          title        : 'HERO Dalam Perjalanan',
          text         : 'HERO kami sedang dalam perjalanan\
                         untuk mengantar makanan pesanan mu',
          okButton : 'OK'
        }, function (tryAgain) {
          App.load('profil')
        });    
      }
    });
  })
});

try {
	App.restore();
} catch (err) {
	App.load('home');
}

function firebaseConfig(){
	// Initialize Firebase
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

function submitUserToFirebase(){
  var category = $('#kategori').val();
  var ref = firebase.database().ref('products/' + category).push();
  var timestamp = Number(new Date());
  var pushKey = ref.key;
  var storageRef = firebase.storage().ref(pushKey);
  var qty = $('#kuantitas').val();
  var file_data = $('#imageProduct').prop('files')[0];

  var nameToSend = $('#nameDonatur').val();
  var emailToSend = $('#emailDonatur').val();
  var addressToSend = $('#addressDonatur').val();
  var phoneToSend = $('#phonenumberDonatur').val();

  var dataToSend = {
    "name": nameToSend,
    "email":emailToSend,
    "phone":phoneToSend,
    "address": addressToSend,
    "qty":qty,
    "image": pushKey
  };
  storageRef.put(file_data);
  console.log(data);

  ref.set(dataToSend);
}

function settingGoogleMaps(){
  var mapcanvas = document.createElement('div');
  mapcanvas.id = 'mapcanvas';
  mapcanvas.style.height = '400px';
  mapcanvas.style.width = '560px';

  document.querySelector('article').appendChild(mapcanvas);

  var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  var myOptions = {
    zoom: 15,
    center: latlng,
    mapTypeControl: false,
    navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);

  var marker = new google.maps.Marker({
      position: latlng,
      map: map,
      title:"You are here! (at least within a "+position.coords.accuracy+" meter radius)"
  });
}

function selectFromFirebase(){
  var ref = firebase.database().ref('products');
  ref.orderByChild("height").startAt(3).on("child_added", function(snapshot) {
    console.log(snapshot.key())
  });
}