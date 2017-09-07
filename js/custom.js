(function($){
	var factory = {
		/*
		 * Load all products
		 */
		loadProducts : function (search){
			var that = this;
			$.ajax({
			  url: "products.json",
			  dataType: 'json',
			  success: function(data){
			  	var filteredProducts = [];
			  	if(search !== null && search !== ''){
			  		filteredProducts = that.filterProducts(search, data.products);
			  	} else {
			  		filteredProducts = that.filterProducts('', data.products);
			  	}
			  	that.renderProducts(filteredProducts);
			  }
			});
		},
		/*
		 * Filter matching products by search keyword
		 *
		 * @param string search is the search keyword
		 * @param array products is an array containing products
		 * @return boolean
		 */
		filterProducts: function(search, products){
			return products.filter(function(product){
				return (product.ProductName.toLowerCase().indexOf(search) !== -1) ? true : false;
			});
		},
		/*
		 * Genearates prducts list html markup
		 * @param array products is an array containing products
		 */
		renderProducts: function(products){
			var that = this;
			var html = "";
			if(products.length){
				$.each(products, function(key, val){
					if((key+1)%3 == 1){
						html+="<div class=\"row\">";
						html+= that.renderSingleProduct(val);
					} else if((key+1)%3 == 0){
						html+= that.renderSingleProduct(val);
						html+="</div><hr>"
					} else {
						html+= that.renderSingleProduct(val);
					}
				});
			} else {
				html = "<h2>No Products Found !!</h2>";
			}
			$("#products").html(html);
		},
		/*
		 * Genearates a single prduct html markup
		 *
		 * @param array product is the product object
		 * @return string html
		 */
		renderSingleProduct: function(product){
			var html = "<div class=\"col-md-4\">";
            html+="<h2>"+product.ProductName+"</h2>";
            html+="<img class=\"media-object\" src=\"images/"+product.ProductImage+"\" height=\"150\" width=\"150\">";
            html+="<p>$ "+product.UnitPrice+"</p>";
	        html+="</div>";
	        return html;
		},
		/*
		 * Init method
		 */
		init: function(){
			this.loadProducts('');
		}
	};
	//Initialization
	factory.init();
	//bind keyup event to search input
	$('#product-search').keyup(function(){
		var search =  $(this).val();
		factory.loadProducts(search);
	});
	//reset button click event
	$('#reset').click(function(){
		factory.init();
		$('#product-search').val('')
	});
})(jQuery);