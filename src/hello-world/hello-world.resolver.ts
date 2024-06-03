import { Float, Query, Resolver, Int, Args } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  //!Graphql debe de saber que el metodo devuelve un string
  @Query(() => String, {
    description: 'hello world es lo que retorna',
    name: 'hello',
  })
  helloWorld(): string {
    return 'Hola mundo';
  }
  @Query(() => Float, {
    description: 'Devuelve un numero random',
    name: 'getRandom',
  })
  getRandom(): number {
    return Math.random() * 100;
  }
  @Query(() => Int, {
    description: 'Devuelve un rando de 0 hasta el valor del arguemento ',
    name: 'randomFromZeroTo',
  })
  //!Para obtener los argementos en los queries de graphql se necesita el decorador Args(nombrearg) y que el argumento puede ser opcional de tipo Int
  getRandomFromZeroto(
    @Args('to', { type: () => Int, nullable: true }) to: number = 6,
  ): number {
    //console.log(to);
    return Math.floor(Math.random() * to);
  }
}
