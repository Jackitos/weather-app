import { Star } from 'lucide-react'

export function WeatherCard({
	city,
	temp,
	tempMax,
	tempMin,
	weather,
	humidity,
	windSpeed,
	onAddToFavorites,
}) {
	return (
		<div className="rounded-lg shadow-lg p-6 bg-white/80 backdrop-blur-sm text-blue-900">
			<div className="flex justify-between items-start">
				<div>
					<h1 className="text-4xl font-bold mb-2">{city}</h1>
					<div className="flex items-center gap-4">
						<span className="text-6xl font-bold">{Math.round(temp)}°C</span>
						<div className="text-gray-600">
							<p>Máx: {Math.round(tempMax)}°C</p>
							<p>Mín: {Math.round(tempMin)}°C</p>
						</div>
					</div>
				</div>
				<button
					onClick={onAddToFavorites}
					className="p-2 hover:bg-gray-100 rounded-full transition-colors"
				>
					<Star className="w-6 h-6" />
				</button>
			</div>

			<div className="mt-6 grid grid-cols-2 gap-4">
				<div className="bg-blue-50 p-4 rounded-lg">
					<h3 className="text-lg font-semibold mb-1">{weather.main}</h3>
					<p className="text-gray-600 capitalize">{weather.description}</p>
				</div>
				<div className="bg-blue-50 p-4 rounded-lg">
					<h3 className="text-lg font-semibold mb-1">Detalles</h3>
					<p className="text-gray-600">Humedad: {humidity}%</p>
					<p className="text-gray-600">Viento: {windSpeed} m/s</p>
				</div>
			</div>
		</div>
	)
}