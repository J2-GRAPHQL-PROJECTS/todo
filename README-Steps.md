<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

### Crear Proyecto
```
nest new todo
```
### Paquetes de Graphql
```
npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql
```
### Creamos el modulo
```
nest generate module helloWorld
```

### creamos el resolver de graphql
```
nest generate resolver helloWorld --no-spec
```

### Para levantar apollo studio
```
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
playground: false,
plugins: [ApolloServerPluginLandingPageLocalDefault()],
```

### Para Instalar class-validator, class-transformer
```
class-validator class-transformer
```