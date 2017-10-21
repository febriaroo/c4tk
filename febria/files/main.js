function content(name, location, category, quantity) {
	$('#name').text(name);
	$('#location').text(location);
	$('#category').text(category);
	$('#quantity').text(quantity);
}

content('nama','lokasi','kategori','kuantitas')

function yes() {
	
}

function no() {
	// $('#image-preview').attr({
	// 	src: 
	// })

	$('#image-preview').attr("src", 'http://via.placeholder.com/350x350')
}