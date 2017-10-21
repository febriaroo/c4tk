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