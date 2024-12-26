import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebook,
	faInstagram,
	faLinkedinIn,
	faTwitter,
	faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faBookmark, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

const blogs = [
	{
		img: "https://cdn.easyfrontend.com/pictures/blog/blog_12_2.png",
		title: "Decide what type of teacher you want to be",
		date: "August 10",
		author: "Alan Bell",
	},
	{
		img: "https://cdn.easyfrontend.com/pictures/blog/blog_12_3.png",
		title: "Decide what type of teacher you want to be",
		date: "August 10",
		author: "Alan Bell",
	},
	{
		img: "https://cdn.easyfrontend.com/pictures/blog/blog_12_4.png",
		title: "Decide what type of teacher you want to be",
		date: "August 10",
		author: "Alan Bell",
	},
	{
		img: "https://cdn.easyfrontend.com/pictures/blog/blog_12_5.png",
		title: "Decide what type of teacher you want to be",
		date: "August 10",
		author: "Alan Bell",
	},
	{
		img: "https://cdn.easyfrontend.com/pictures/blog/blog_12_2.png",
		title: "Decide what type of teacher you want to be",
		date: "August 10",
		author: "Alan Bell",
	},
];

const social = [
	{
		icon: faFacebook,
		href: "#!",
	},
	{
		icon: faInstagram,
		href: "#!",
	},
	{
		icon: faLinkedinIn,
		href: "#!",
	},

	{
		icon: faTwitter,
		href: "#!",
	},
	{
		icon: faWhatsapp,
		href: "#!",
	},
	{
		icon: faShareAlt,
		href: "#!",
	},
	{
		icon: faBookmark,
		href: "#!",
	},
];

const BlogItem = ({ item }) => {
	return (
		<div className="flex justify-between items-start gap-4 cursor-pointer ">
			<img src={item.img} alt="" className="img-fluid rounded" />
			<div className="ml-3">
				<h6 className="mb-2 text-base font-medium leading-tight hover:text-red-500 ease-in-out duration-500">
					{item.title}
				</h6>
				<div className="flex flex-wrap opacity-50">
					<span className="mr-3">{item.date}</span>
					<span>
						By <b>{item.author}</b>
					</span>
				</div>
			</div>
		</div>
	);
};

BlogItem.propTypes = {
	item: PropTypes.object.isRequired,
};

const Contents = ({data}) => (
	<div>

		<div
                dangerouslySetInnerHTML={{ __html: data }}
            />
		
		{/* <p className="text-[17px] mb-2 opacity-80">
			Getting into teaching requires many years of preparation. If you don’t
			know how to become a teacher, you may find the way challenging. So, in
			this article, I’ll walk you through the steps to becoming a teacher in the
			UK.
		</p>

		<br />
		<h5 className="mb-2 text-xl font-medium opacity-90">
			7 Steps to becoming a teacher
		</h5>
		<p className="text-[17px] mb-2 opacity-80">
			Being a teacher is always exciting. It opens a new horizon for us to serve
			and build the nation in a noble way. In order to become a teacher, you
			have to undertake a number of steps. So let’s get started to explore:
		</p>

		<br />
		<h5 className="mb-2 text-xl font-medium opacity-90">
			1. Decide what type of teacher you want to be
		</h5>
		<p className="text-[17px] mb-2 opacity-80">
			Teachers can be of several types such as nursery teachers, school
			teachers, special teachers, professors and so on. So, before stepping into
			the route to become a teacher, decide first what type of teacher you want
			to be. In the UK, the education system is broadly divided into two
			systems.
		</p>

		<br />
		<h5 className="mb-2 text-xl font-medium opacity-90">
			2. Decide your preferred subject
		</h5>
		<p className="text-[17px] mb-2 opacity-80">
			In primary schools, you may be responsible for teaching multiple subjects.
			But in the secondary schools, it’s most likely that you’ll be teaching the
			subject in which you did your major. So, it’s your choice which subject do
			you want to teach. It’s necessary to decide this because it will keep you
			on the track to become a teacher and step forward to make your
			preparation.
		</p>

		<br />
		<h5 className="mb-2 text-xl font-medium opacity-90">
			3. Earn your bachelor degree
		</h5>
		<p className="text-[17px] mb-2 opacity-80">
			Unlike many other professions, teaching is very strict in its
			requirements. It’s because we don’t want to give the responsibility of
			educating our children to someone who doesn’t have the proper education
			and credentials. So, getting into teaching requires a minimum degree in
			the first place. After that, the other things come. You need a bachelor
			degree to become a teacher. There are also other specialized and advanced
			degrees, but you need your bachelor degree before everything.
		</p>
		<p className="text-[17px] mb-2 opacity-80">
			If you want to be a primary teacher, then you’ll need a degree of Bachelor
			of Education (BEd.) But, if you want to be a secondary teacher, you have
			to do your bachelor in your preferred subject. Your major in your degree
			will determine which subject you’ll be teaching. Earning a bachelor degree
			will require 3 to 4 years. However, if you want to be a nursery or
			pre-school teacher, you don’t need a bachelor degree rather a proper
			license and certification in teaching children.
		</p> */}
	</div>
);

const Social = ({ list, index }) => (
	<a href={list.href} className="text-lg sm:text-[22px]">
		<FontAwesomeIcon
			icon={list.icon}
			className={classNames({ "mr-3": index })}
		/>
	</a>
);

Social.propTypes = {
	list: PropTypes.object.isRequired,
	index: PropTypes.number,
};

const SocialContent = () => (
	<div className="flex flex-col sm:flex-row items-center justify-between my-12 sm:mr-12">
		<div className="flex flex-col sm:flex-row items-center">
			<div className="mr-2">
				<img
					src="https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_1.jpeg"
					alt=""
					className="max-w-full h-auto rounded-full border border-btnBorder"
					width="47"
				/>
			</div>
			<div>
				<p className="mb-0">
					By<b> Alan Bell</b>
				</p>
			</div>
			<p className="ml-3 mt-3 sm:mt-0">August 10th, 2020</p>
		</div>
		{/* <div>
			<ul className="mt-3 sm:mt-0">
				{social.map((list, j) => (
					<Social list={list} index={j} key={j} />
				))}
			</ul>
		</div> */}
	</div>
);

const SideBar = () => (
	<>
		<div className="bg-stone-900 bg-opacity-90 dark:bg-[#1E2735] text-white rounded-t-lg py-4 px-3 mb-4">
			<h5 className="text-xl font-medium">Popular Blogs</h5>
		</div>
		{blogs.map((item, i) => (
			<Fragment key={i}>
				{!!i && <hr className="my-4" />}
				<BlogItem item={item} />
			</Fragment>
		))}
	</>
);

const BlogDetail = () => {
   
	const location=useLocation()

	const {state}=location

	console.log("state is",state);
	


	return (
		<section className="ezy__blogdetails1 light py-6 md:py-10 bg-white  text-zinc-900 dark:text-black max-w-7xl mx-auto
        ">
			<div className="container px-4 mx-auto">
				<div className="grid md:grid-cols-3 gap-4">
					<div className="col-span-3 md:col-span-2 px-4">
						<h1 className="font-bold  md:text-3xl lg:text-4xl text-2xl mb-12 text-main">
							{state?.title}
						</h1>
					</div>
				</div>

				<div className="grid grid-cols-12 gap-4">
					<div className="col-span-12 md:col-span-8 px-4">
						<img
							src={state?.photo?.secure_url}
							alt=""
							className="w-full h-auto rounded"
						/>
						{/* social content */}
						{/* <SocialContent /> */}

						{/* contents */}
						<div className="mt-10">
						<Contents data={state?.description}/>
						</div>
				
					</div>
					{/* sidebar */}
					<div className="col-span-12 md:col-span-4 lg:col-span-3 lg:col-start-9 px-4 md:pl-6 lg:pl-0">
						<SideBar />
					</div>
				</div>
			</div>
		</section>
	);
};


export default BlogDetail