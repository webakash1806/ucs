import React from "react";
import PropTypes from "prop-types";

const products = [
	{
		img: "https://cdn.easyfrontend.com/pictures/ecommerce/product25.jpg",
		title: "Holiday Season",
	},
	{
		img: "https://cdn.easyfrontend.com/pictures/ecommerce/product26.jpg",
		title: "For Him",
	},
	{
		img: "https://cdn.easyfrontend.com/pictures/ecommerce/product35.jpg",
		title: "For Kids",
	},
	{
		img: "https://cdn.easyfrontend.com/pictures/ecommerce/product28.jpg",
		title: "Indoors",
	},
	{
		img: "https://cdn.easyfrontend.com/pictures/ecommerce/product29.jpg",
		title: "For Her",
	},
	{
		img: "https://cdn.easyfrontend.com/pictures/ecommerce/product30.jpg",
		title: "Best Discounts",
	},
];

const ProductItem = ({ product }) => {
	return (
		<a href="#!">
			<div className="flex flex-col items-center justify-center">
				<div className="w-44 h-44 flex justify-center items-center">
					<img
						src={product.img}
						className="rounded-full max-w-full max-h-full w-auto"
						alt="..."
					/>
				</div>
				<div className="p-4 md:p-6">
					<h2 className="text-lg font-bold leading-none my-2">
						{product.title}
					</h2>
				</div>
			</div>
		</a>
	);
};

ProductItem.propTypes = {
	product: PropTypes.object.isRequired,
};

const CategoryWiseSearch = () => {
	return (
		<section className="ezy__epcategory3 light py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative overflow-hidden z-10">
			<div className="container px-4 mx-auto">
				<div className="flex justify-center items-center text-center md:text-start">
					<h2 className="text-2xl leading-none md:text-[40px] font-bold mb-2 ml-3">
						Shop By Category
					</h2>
				</div>

				<div className="grid grid-cols-12 gap-6 text-center mt-6 md:mt-12F">
					{products.map((product, i) => (
						<div
							className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2"
							key={i}
						>
							<ProductItem product={product} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default CategoryWiseSearch
