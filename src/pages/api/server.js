import express from 'express'
import cors from 'cors'
import { promises as fs } from 'fs'
import path from 'path'

const app = express()
const PORT = 3000

const filePath = path.resolve('./src/lib/cities.json')

app.use(cors({
	origin: "*",
	methods: ["GET", "POST", "DELETE"],
	allowedHeaders: ["Content-Type"]
}))

app.use(express.json())

app.get('/savedCities', async (req, res) => {
	try {
		const fileData = await fs.readFile(filePath, 'utf-8')
		const data = JSON.parse(fileData)

		res.json(data.savedCities)
	} catch (e) {
		console.log('Error al leer el archivo', e)
		res.status(500).json({ error: 'Error interno del servidor' })
	}
})

app.get('/allCities', async (req, res) => {
	try {
		const fileData = await fs.readFile(filePath, 'utf-8')
		const data = JSON.parse(fileData)

		res.json(data.allCities)
	}
	catch (e) {
		console.log('Error al leer el archivo', e)
		res.status(500).json({ error: 'Error interno del servidor' })
	}
})

app.post('/', async (req, res) => {
	try {
		const newCity = req.body
		if (!newCity.ciudad || !newCity.horaActual || !newCity.clima || !newCity.temperatura) {
			return res.status(400).json({ error: 'Por favor, proporciona todos los campos requeridos.' })
		}
		const fileData = await fs.readFile(filePath, 'utf-8')
		const data = JSON.parse(fileData)
		data.savedCities.push(newCity)

		await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
		res.status(201).json({ message: 'Ciudad agregada exitosamente. ', city: newCity })
	} catch (e) {
		res.status(500).json({ error: 'Error al guardar la nueva ciudad.' })
	}
})

app.delete('/:city', (req, res) => {
	const cityToDelete = req.params.city
	if (!cityToDelete) {
		return res.status(400).json({ error: 'Por favor, proporciona el nombre de la ciudad a eliminar.' })
	}

	fs.readFile(filePath, 'utf-8')
		.then((fileData) => {
			const data = JSON.parse(fileData)
			const cityIndex = data.savedCities.findIndex((city) => city.ciudad === cityToDelete)
			if (cityIndex === -1) {
				return res.status(404).json({ error: 'No se encontró la ciudad a eliminar.' })
			}

			data.savedCities.splice(cityIndex, 1)
			fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
				.then(() => {
					res.json({ message: 'Ciudad eliminada exitosamente.' })
				})
				.catch(() => {
					res.status(500).json({ error: 'Error al eliminar la ciudad.' })
				})
		})
		.catch(() => {
			res.status(500).json({ error: 'Error al leer el archivo.' })
		})
})

app.listen(PORT, () => {
	console.log(`running server at http://localhost:${PORT}`)
})
