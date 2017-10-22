initFirebase();
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