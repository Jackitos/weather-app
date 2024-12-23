import express from 'express'
import cors from 'cors'
import citiesData from "../../lib/cities.json" assert { type: "json" };
import validateCity from './schemas/cities.js';

const app = express()
const PORT = 3000

app.use(cors({
	origin: "*",
	methods: ["GET", "POST", "DELETE"],
	allowedHeaders: ["Content-Type"]
}))

app.use(express.json())

app.get('/', (req, res) => {
	res.json({ message: 'API de ciudades' })
})

app.get('/cities/savedCities', async (req, res) => {
	res.json(citiesData.savedCities)
})

app.get('/cities/allCities', async (req, res) => {
	res.json(citiesData.allCities)
})

app.get('/cities/allCities/:city', (req, res) => {
	const { city } = req.params
	const cityData = citiesData.allCities.find(c => c.ciudad === city)

	if (cityData) return res.json(cityData)

	res.status(404).json({ message: 'Ciudad no encontrada' })
})

app.post('/cities', async (req, res) => {
	// ✏️ Defino el esquema de validación de la ciudad con 'zod'
	const result = validateCity(req.body)

	if (result.error) {
		return res.status(400).json({ error: JSON.parse(result.error.message) })
	}

	const newCity = {
		...result.data,
	}
	console.log('Ciudad validada:', newCity);
	citiesData.savedCities.push(newCity)
	res.status(201).json(newCity)
})

app.delete('/cities/:city', (req, res) => {
	const { city } = req.params
	const cityIndex = citiesData.savedCities.findIndex(c => c.ciudad === city)

	if (cityIndex === -1) {
		return res.status(404).json({ message: 'Ciudad no encontrada' })
	}

	citiesData.savedCities.splice(cityIndex, 1)
	res.json({ message: 'Ciudad eliminada' })
})

app.listen(PORT, () => {
	console.log(`running server at http://localhost:${PORT}`)
})