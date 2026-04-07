# React + TypeScript + Vite

# Rama de migracion de estructura HTML.

En esta rama solo hacemos el cambio y refactorizamos codigo para ajustarlo a los requerimientos de react.

Copiamos el contenido dentro de la etiqueta HTML ```<body>``` de nuestro html, a nuestro archivo App.tsx, dentro del ```return``` de nuestra funcion ```function App()```

Ejemplo:
```
function App() {
  return(
    <div>
    // nuestro codigo HTML aqui
    </div>
  )
}
```

1- Todas las etiquetas HTML que tengan el atributo "class" hay que cambiarlas por "className", por ejemplo:

HTML
```
<div class="bg-gray-200"></div>
```

En React deberia quedar: 
```
<div className="bg-gray-200"></div>
```

2- Todas las etiquetas HTML que no tengan cierre </> hay que agregarselo, por ejemplo

HTML
```
<input >
```

En React deberia quedar:
```
<input />
```