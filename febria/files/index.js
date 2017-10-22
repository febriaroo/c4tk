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

function changeBarang(category) {
  console.log('Current Category : ' + category)
  
  switch(category) {
  	case "pakaian":
  		$(".form-pakaian").removeClass("is-hidden");
  		$(".form-elektronik").addClass("is-hidden");
  		$(".form-sepatu").addClass("is-hidden");
  		break;
  	case "elektronik":
	  	$(".form-elektronik").removeClass("is-hidden");
	  	$(".form-sepatu").addClass("is-hidden");
  		$(".form-pakaian").addClass("is-hidden")
  		break;
  	case "sepatu":
  		$(".form-sepatu").removeClass("is-hidden");
  		$(".form-elektronik").addClass("is-hidden");
	  	$(".form-pakaian").addClass("is-hidden");
  		break;
  }
}

function addItem() {
  initFirebase();

  var rootRef = firebase.database().ref();
  var ref = rootRef.child('donasi').push(),
	  unique = ref.key;
  var storageRef = firebase.storage().ref(unique);

  var tipe_barang = $('#tipe_barang').val(),
      merek = $('#merek').val(),
      tipe_perangkat = $('#tipe_perangkat').val(),
      file = $('#image').prop('files')[0],
      kondisi_raw = document.getElementsByName('kondisi'),
      kondisi;
  
  for (var i = 0, n = kondisi_raw.length ; i < n; i++) {
      if (kondisi_raw[i].checked) {
          kondisi = kondisi_raw[i].value;
          break;
      }
  }

  var datas = {
  	tipe_barang: tipe_barang,
  	merek: merek,
  	tipe_perangkat: tipe_perangkat,
  	image: unique,
  	kondisi: kondisi
  }

  // console.log(tipe_barang, merek, tipe_perangkat, kondisi, file)
  console.log('masukin data')
  storageRef.put(file)
  ref.set(datas)
  console.log('sukses')

  window.location.href = 'detailJakatur.html/?key=' + unique;
}