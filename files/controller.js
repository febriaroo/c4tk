
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
  var ref = firebase.database().ref('products/' + category);
  var qty = $('#kuantitas').val();

  var nameToSend = $('#nameDonatur').val();
  var emailToSend = $('#emailDonatur').val();
  var addressToSend = $('#addressDonatur').val();
  var phoneToSend = $('#phonenumberDonatur').val();

  var dataToSend = {
    "name": nameToSend,
    "email":emailToSend,
    "phone":phoneToSend,
    "address": addressToSend,
    "qty":qty
  };
  console.log(data);

  ref.push().set(dataToSend);
}
