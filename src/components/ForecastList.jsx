export function ForecastList({ forecasts }) {
	return (
		<div>
			<h2 className="text-2xl font-bold mb-4">Pronóstico de 5 días</h2>
			<div className="space-y-4">
				{forecasts.map(([date, dayForecasts]) => (
					<div key={date} className="rounded-lg shadow-lg p-4 bg-white/80 backdrop-blur-sm">
						<h3 className="font-semibold mb-3">{new Date(date).toLocaleDateString('es-ES', {
							weekday: 'long',
							day: 'numeric',
							month: 'long'
						})}</h3>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							{dayForecasts.map((forecast) => {
								const time = new Date(forecast.dt * 1000).toLocaleTimeString('es-ES', {
									hour: '2-digit',
									minute: '2-digit'
								});
								return (
									<div key={forecast.dt} className="text-sm p-2 bg-blue-50 rounded-lg text-blue-900">
										<p className="font-medium">{time}</p>
										<p className="text-xl font-bold my-1">
											{Math.round(forecast.main.temp)}°C
										</p>
										<p className="text-gray-600 capitalize">
											{forecast.weather[0].description}
										</p>
									</div>
								);
							})}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}