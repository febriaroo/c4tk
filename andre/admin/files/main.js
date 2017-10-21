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

var rootRef = firebase.database().ref('products');

function submitChild() {
	var ref = rootRef.child('kids').push(),
		unique = ref.key;
	// Inputs
	var name = $('#nama').val(),
		dob = $('#dob').val(),
		status = $('#status').val(),
		story = $('#story').val(),
		size = $('#size').val(),
		needs = $('#needs').val();
		console.log(name,dob,status,story,size,needs);
	var datas = {
		name: name,
		dob: dob,
		status: status,
		story: story,
		size: size,
		key: unique,
		needs: needs
	}

	ref.set(datas);
}