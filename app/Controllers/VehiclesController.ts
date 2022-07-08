import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicle from 'App/Models/Vehicle'

export default class VehiclesController {
    // public async index(ctx: HttpContextContract) {

    //   const vehicles: IVehicle[] = [
    //     {
    //       id: 1,
    //       name: 'First Vehicle',
    //       description: 'This is a description of first vehicle',
    //       plate: 'DDT-0012',
    //       isFavorite: false,
    //       year: 2018,
    //       color: '#ff00ff',
    //       price: 22000,
    //       createdAt: new Date()
    //     }
    //   ]

    //   return vehicles
    // }

    public async store ({request, response}: HttpContextContract) {
      const body = request.body()

      const createVehicle = await Vehicle.create(body)

      response.status(201)

      return {
        message: 'Carro cadastrado com sucesso!',
        data: createVehicle,
      }
    }

    public async index ({response}: HttpContextContract) {
      const vehicles = await Vehicle.all()

      if (!vehicles) {
        response.status(404)
        return {message: 'Não foi possivel localizar nenhum dos cadastros!'}
      }

      response.status(200)

      return {
        data: vehicles,
      }
    }

    public async show ({params, response}: HttpContextContract) {
      const vehicle = await Vehicle.findOrFail(params.id)

      if (!vehicle) {
        response.status(404)

        return {message: 'Veiculo não encontrado'}
      }

      response.status(202)

      return {
        data: vehicle,
      }
    }

    public async update ({params, request}: HttpContextContract) {
      const body = request.body()

      const vehicle = await Vehicle.findOrFail(params.id)

      vehicle.merge(body)

      await vehicle.save()

      return {
        message: 'Veiculo atualizado com sucesso!',
        data: vehicle,
      }
    }

    public async destroy ({params, response}: HttpContextContract) {
      const vehicle = await Vehicle.findOrFail(params.id)

      await vehicle.delete();

      response.status(204)

      return {
        message: 'Veiculo deletado com sucesso!',
        data: vehicle,
      }
    }
}
