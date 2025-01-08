import CategoryItem from "../components/CategoryItem";
const categories = [
	{ href: "/boat", name: "Boats", imageUrl: "/vapor.jpg" },
	{ href: "/airplane", name: "Airplanes", imageUrl: "/avion.jpg" },
	{ href: "/van", name: "Vans", imageUrl: "/duba.jpg" },
	{ href: "/trucks", name: "Trucks", imageUrl: "/camion.jpg" },
	
];

const HomePage = () => {

  return (
    <div className='relative min-h-screen text-white overflow-hidden'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<h1 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4'>
					Explore Our Categories
				</h1>
        <p className='text-center text-xl text-gray-300 mb-12'>
					Discover the fastest way to get your products
				</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>
        </div>

    </div>
  )
}

export default HomePage