# 🏎️ Projeto F1 Dashboard - Angular

Este projeto é um painel interativo desenvolvido com Angular que consome a [API pública da Fórmula 1 (Ergast API)](https://ergast.com/mrd/) para exibir dados atualizados da temporada atual de F1.

## 🚀 Funcionalidades

- 🥇 Classificação atual de pilotos  
- 🏆 Ranking de construtores  
- 🏁 Voltas mais rápidas da temporada  
- 📊 Visualização com gráficos de barras ou cartões para melhor análise  
- 🇺🇳 Bandeiras dos pilotos baseadas na nacionalidade  

## 📦 Tecnologias Utilizadas

- Angular  
- TypeScript  
- Tailwind CSS  
- RxJS  
- Ergast API (F1)  

## 🧠 Como executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/GabrielAugustoFerreiraMaia/F1-app
   cd f1-dashboard
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o projeto:
   ```bash
   ng serve
   ```

4. Acesse no navegador:
   ```
   http://localhost:4200
   ```

## 🛠️ Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   └── home/
│   │       ├── home.component.ts
│   │       └── home.component.html
│   ├── services/
│   │   └── f1-api.service.ts
│   └── utils/
│       └── nationality-map.ts
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.


