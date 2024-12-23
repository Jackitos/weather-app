export function CityInfo({ data }) {
	return (
		<div className="rounded-lg shadow-lg p-6 bg-white/80 backdrop-blur-sm text-blue-900">
			<h2 className="text-2xl font-bold mb-4">Información de la ciudad</h2>
			<div className="grid md:grid-cols-2 gap-4">
				<div>
					<p className="text-gray-600">País: {data.country}</p>
					<p className="text-gray-600">Población: {data.population.toLocaleString()}</p>
				</div>
				<div>
					<p className="text-gray-600">Amanecer: {data.sunrise}</p>
					<p className="text-gray-600">Atardecer: {data.sunset}</p>
				</div>
			</div>
		</div>
	)
}