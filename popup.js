const urls = [
"https://www.nisbets.com.au/olympia-airpot-service-station/gl070",
"https://www.nisbets.com.au/jantex-compact-coreless-toilet-rolls-36-pack/gl061",
"https://www.nisbets.com.au/jantex-micro-twin-toilet-roll-dispenser/gl062",
"https://www.nisbets.com.au/jantex-micro-twin-toilet-roll-refills-24-pack/gl063",
"https://www.nisbets.com.au/olympia-cafe-saucers-charcoal/gl049"
];

async function waitAndLog(url, index) {
  await new Promise(resolve => setTimeout(resolve, 400 * index));

			const response = await fetch(url);
		//	console.log('theURL:', url);
			const html = await response.text();

			const parser = new DOMParser();
			const doc = parser.parseFromString(html, 'text/html');
			
			var elm = doc.querySelector('.breadcrumb');
			
			var elm_all = doc.querySelectorAll('.breadcrumb li');
			
			var selected_item_no = elm_all.length - 2;
			var category_flow = '';
			var category_flow_sep = ' > ';
						
			for( var i = 0; i <= elm_all.length-1; i++ ){
				
				if( i > 0 && i <= selected_item_no ){
					if( i == selected_item_no ){
						category_flow_sep = '';
					}
					category_flow += elm_all[i].textContent + category_flow_sep;
				}
			}
			
		// console.log('Selected Category:', elm_all[selected_item_no].textContent);
			var get_sku = url.split('/');
			var collected_cats = index + ' -=- "' + get_sku.pop() + '===' + category_flow + '",<br>';
		//	return '"' + get_sku.pop() + '===' + category_flow + '",';
			document.querySelector('#cat_list').innerHTML = collected_cats + document.querySelector('#cat_list').innerHTML;
}

function cat_collection_1(){
	
	let cat_list = "";
	urls.forEach(async (url, index) => {
		await waitAndLog(url, index);
	});
}

const btn_get_brcr_1 = document.getElementById("get_brcr_1");
btn_get_brcr_1.addEventListener("click", function() {
	// Code to be executed when the button is clicked
	cat_collection_1();
});






/*
async function getTitle(url) {
	const response = await fetch(url);
//	console.log('theURL:', url);
	const html = await response.text();

	const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');
	
	var elm = doc.querySelector('.breadcrumb');
	
	var elm_all = doc.querySelectorAll('.breadcrumb li');
	
	var selected_item_no = elm_all.length - 2;
	var category_flow = '';
	var category_flow_sep = ' > ';
				
	for( var i = 0; i <= elm_all.length-1; i++ ){
		
		if( i > 0 ){
			if( i == elm_all.length-1 ){
				category_flow_sep = '';
			}
			category_flow += elm_all[i].textContent + category_flow_sep;
		}
	}
	
// console.log('Selected Category:', elm_all[selected_item_no].textContent);
	var get_sku = url.split('/');
	return '"' + get_sku.pop() + '===' + category_flow + '",';
//	return '"' + get_sku.pop() + '===' + elm_all[selected_item_no].textContent + '",';
}

async function collectTitles(){
  const cat_list = await Promise.all(urls.map(getTitle));
  document.querySelector('#cat_list').innerHTML = cat_list.join('<br>');
}

const btn_get_brcr_1 = document.getElementById("get_brcr_1");

// Attach a click event to the button
btn_get_brcr_1.addEventListener("click", function() {
	// Code to be executed when the button is clicked
	collectTitles();
});
*/


