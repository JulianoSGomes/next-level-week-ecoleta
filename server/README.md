# API para cadastro e consumo dos pontos de coleta

### versão de desenvolvimento 
```bash
yarn dev
```
### API

|            | uri                       | Desc. |
| ---------- | ------------------------- | ----- |
| **get**    | /items                    |    return { id: number, title: string, image_url: string }   |
| **post**   | /points                   |    body { name: string, email: string, whatsapp: number, latitude: number, longitude, city: string, uf: string, items: string    }  |
| **get**    | /points                   |    query params { city: string, uf: string, items: string }    |
| **get**    | /points/:id               |    params { id: string }  |
