import z from 'zod'

const citySchema = z.object({
	ciudad: z.string({
		invalid_type_error: 'El nombre de la ciudad debe ser un string',
		invalid_length_error: 'El nombre de la ciudad debe tener al menos 3 caracteres',
	}),
	horaActual: z.string({
		invalid_type_error: 'La hora actual debe ser un string',
		invalid_length_error: 'La hora actual debe tener al menos 3 caracteres',
	}),
	clima: z.string({
		invalid_type_error: 'El clima debe ser un string',
		invalid_length_error: 'El clima debe tener al menos 3 caracteres',
	}),
	temperatura: z.number({
		invalid_type_error: 'La temperatura debe ser un número',
		invalid_length_error: 'La temperatura debe tener al menos 3 caracteres',
	}),
	temperaturaMaxima: z.number({
		invalid_type_error: 'La temperatura máxima debe ser un número',
		invalid_length_error: 'La temperatura máxima debe tener al menos 3 caracteres',
	}),
	temperaturaMinima: z.number({
		invalid_type_error: 'La temperatura mínima debe ser un número',
		invalid_length_error: 'La temperatura mínima debe tener al menos 3 caracteres',
	})
})

export default function validateCity(obj) {
	return citySchema.safeParse(obj)
}