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

firebaseConfig();
const query = getQueryParams(document.location.search);

// const date = new Date();
var str1, str2, str3, year, month, day, hour;
    
    str1 = query.date,
    str2 = str1.replace(/-/g, ' '),
    str3 = str2.split(' '),
    year = str3[0],
    month = str3[1],
    day = str3[2];

var rootRef = firebase.database().ref(),
    userRef = rootRef.child('users/klopango/notes'),
    yearRef = userRef.child(year),
    monthRef = yearRef.child(month),
    dayRef = monthRef.child(day);

function setDate(currentDate) {
	$('#currentDate').html(currentDate);
}

function createArticle(time, content) {
    var str = "<div class=\"columns\"><div class=\"column\"><hr><h3 class=\"title is-3\">" + time + "</h3><p>" + content + "</p>";
    $('#notes').append(str);
}

setDate(str1)

dayRef.once('value', function(snapshot) {
    snapshot.forEach(function(child) {
        createArticle(child.val().time, child.val().content)
    })
})

// window.onload = 

// alert(query.foo);