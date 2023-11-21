-- categoria

INSERT INTO `acerudb`.`categoria` (`descripcion`, `estado`, `imagenid`, `imagenurl`, `nombre`)
VALUES
  ('La categoría de programación abarca todos los temas relacionados con el desarrollo de software, incluyendo lenguajes de programación, algoritmos, estructuras de datos y más. Explora conceptos fundamentales y avances recientes en el mundo de la programación.', 'Activo', NULL, NULL, 'Programación General'),
  ('Aprende sobre los lenguajes de programación más populares y utilizados en la industria, como Java, Python, C++, y más. Descubre sus características, sintaxis y casos de uso.', 'Activo', NULL, NULL, 'Lenguajes de Programación'),
  ('Esta categoría se enfoca en algoritmos y técnicas de optimización. Aprende a diseñar y analizar algoritmos eficientes para resolver una variedad de problemas computacionales.', 'Activo', NULL, NULL, 'Algoritmos y Optimización'),
  ('Explora las diferentes estructuras de datos utilizadas para organizar y manipular información en programas. Comprende cómo elegir la estructura adecuada para cada situación.', 'Activo', NULL, NULL, 'Estructuras de Datos'),
  ('Descubre la programación orientada a objetos y cómo se utiliza para modelar el mundo real en software. Aprende sobre clases, objetos, herencia y encapsulación.', 'Activo', NULL, NULL, 'Programación Orientada a Objetos'),
  ('Aprende sobre el desarrollo web, incluyendo tecnologías front-end como HTML, CSS y JavaScript, así como frameworks populares como React, Angular y Vue.', 'Activo', NULL, NULL, 'Desarrollo Web'),
  ('Explora el mundo del desarrollo móvil y las aplicaciones para dispositivos móviles. Aprende a crear aplicaciones para Android e iOS utilizando herramientas como Flutter y React Native.', 'Activo', NULL, NULL, 'Desarrollo Móvil'),
  ('Comprende el funcionamiento interno de las bases de datos, desde el diseño de esquemas hasta consultas avanzadas. Aprende sobre SQL, NoSQL y bases de datos en la nube.', 'Activo', NULL, NULL, 'Bases de Datos');

-- problema

-- Problemas de la categoría "Programacion General"
INSERT INTO `acerudb`.`problema` (`descripcion`, `dificultad`, `ejemplo_entradas`, `ejemplo_salidas`, `entradas`, `estado`, `nombre`, `salidas`, `categoria_id`)
VALUES
  ('Desarrolla un programa que calcule el factorial de un número N.', 'Facil', 'Entrada: 5\nSalida: 120', '120', '5', 'Activo', 'Factorial', '120', 1),
  ('Crea un programa que verifique si un número es par o impar.', 'Facil', 'Entrada: 7\nSalida: Impar', 'Impar', '7', 'Activo', 'Par o Impar', 'Impar', 1),
  ('Escribe un programa que imprima los primeros N términos de la serie de Fibonacci.', 'Intermedio', 'Entrada: 8\nSalida: 0, 1, 1, 2, 3, 5, 8, 13', '0, 1, 1, 2, 3, 5, 8, 13', '8', 'Activo', 'Serie de Fibonacci', '0, 1, 1, 2, 3, 5, 8, 13', 1);

-- Problemas de la categoría "Lenguajes de Programacion"
INSERT INTO `acerudb`.`problema` (`descripcion`, `dificultad`, `ejemplo_entradas`, `ejemplo_salidas`, `entradas`, `estado`, `nombre`, `salidas`, `categoria_id`)
VALUES
  ('Escribe un programa que cuente la cantidad de palabras en una frase.', 'Facil', 'Entrada: "Hola mundo, cómo estás"\nSalida: 4', '4', '"Hola mundo, cómo estás"', 'Activo', 'Contador de Palabras', '4', 2),
  ('Implementa un programa que convierta una frase a su forma inversa.', 'Intermedio', 'Entrada: "Programacion es divertida"\nSalida: "adirtevod se anocargimorP"', 'adirtevod se anocargimorP', '"Programacion es divertida"', 'Activo', 'Inversion de Frase', 'adirtevod se anocargimorP', 2),
  ('Crea un programa que encuentre la palabra más larga en una frase.', 'Intermedio', 'Entrada: "La programacion es asombrosa"\nSalida: "programacion"', 'programacion', '"La programacion es asombrosa"', 'Activo', 'Palabra Mas Larga', 'programacion', 2);

-- Problemas de la categoría "Algoritmos y Optimizacion"
INSERT INTO `acerudb`.`problema` (`descripcion`, `dificultad`, `ejemplo_entradas`, `ejemplo_salidas`, `entradas`, `estado`, `nombre`, `salidas`, `categoria_id`)
VALUES
  ('Escribe un algoritmo para encontrar el maximo comun divisor (MCD) de dos números.', 'Intermedio', 'Entrada: 48, 18\nSalida: 6', '6', '48, 18', 'Activo', 'Maximo Comun Divisor', '6', 3),
  ('Implementa un algoritmo de busqueda binaria para encontrar un elemento en un arreglo ordenado.', 'Dificil', 'Entrada: [2, 4, 6, 8, 10, 12, 14]\nBuscar: 8\nSalida: 3', '3', '[2, 4, 6, 8, 10, 12, 14], 8', 'Activo', 'Busqueda Binaria', '3', 3),
  ('Crea un algoritmo para calcular la raiz cuadrada de un número utilizando el metodo de Newton.', 'Dificil', 'Entrada: 25\nSalida: 5', '5', '25', 'Activo', 'Raiz Cuadrada', '5', 3);

-- Problemas de la categoría "Estructuras de Datos"
INSERT INTO `acerudb`.`problema` (`descripcion`, `dificultad`, `ejemplo_entradas`, `ejemplo_salidas`, `entradas`, `estado`, `nombre`, `salidas`, `categoria_id`)
VALUES
  ('Escribe un programa que implemente una cola (queue) y realice operaciones de enqueue y dequeue.', 'Facil', 'Operaciones: enqueue(5), enqueue(10), dequeue()\nResultado: 5', '5', 'enqueue(5), enqueue(10), dequeue()', 'Activo', 'Implementacion de Cola', '5', 4),
  ('Implementa un programa que verifique si una cadena de parentesis, corchetes y llaves esta balanceada.', 'Intermedio', 'Entrada: {()[()]}\nSalida: Balanceada', 'Balanceada', '{()[()]}', 'Activo', 'Balanceo de Simbolos', 'Balanceada', 4),
  ('Crea una implementación de un árbol binario y demuestra su recorrido en orden.', 'Intermedio', 'Arbol:\n   3\n  / \\\n 1   5\nSalida: 1, 3, 5', '1, 3, 5', '3, 1, 5', 'Activo', 'Arbol Binario', '1, 3, 5', 4);

-- Problemas de la categoría "Base de Datos"
INSERT INTO `acerudb`.`problema` (`descripcion`, `dificultad`, `ejemplo_entradas`, `ejemplo_salidas`, `entradas`, `estado`, `nombre`, `salidas`, `categoria_id`)
VALUES
  ('Escribe una consulta SQL que muestre todos los nombres de estudiantes en una tabla de estudiantes.', 'Facil', 'Tabla Estudiantes:\nID | Nombre\n1  | Ana\n2  | Juan\n3  | Maria\nSalida esperada:\nAna\nJuan\nMaria', 'Ana\nJuan\nMaria', 'Tabla Estudiantes', 'Activo', 'Consulta de Nombres', 'Ana\nJuan\nMaria', 5),
  ('Implementa una consulta SQL que calcule el promedio de las calificaciones de un estudiante dado su ID.', 'Intermedio', 'Tabla Calificaciones:\nID | EstudianteID | Calificacion\n1  | 2            | 85\n2  | 1            | 92\n3  | 2            | 78\nSalida esperada:\nID | Promedio\n2  | 81.5', '2\n81.5', 'Tabla Calificaciones\nEstudianteID: 2', 'Activo', 'Promedio de Calificaciones', '2\n81.5', 5),
  ('Crea una consulta SQL que encuentre los nombres de los estudiantes que han aprobado un examen con una calificación mayor a 70.', 'Intermedio', 'Tabla Calificaciones:\nID | EstudianteID | Calificacion\n1  | 2            | 85\n2  | 1            | 92\n3  | 2            | 78\nSalida esperada:\nNombre\nAna', 'Ana', 'Tabla Calificaciones\nCalificacion > 70', 'Activo', 'Estudiantes Aprobados', 'Ana', 5);

-- Problemas de la categoría "Redes y Sistemas Operativos"
INSERT INTO `acerudb`.`problema` (`descripcion`, `dificultad`, `ejemplo_entradas`, `ejemplo_salidas`, `entradas`, `estado`, `nombre`, `salidas`, `categoria_id`)
VALUES
  ('Escribe un programa que verifique si una dirección IP es válida.', 'Facil', 'Entrada: 192.168.1.1\nSalida: Valida', 'Valida', '192.168.1.1', 'Activo', 'Validacion de IP', 'Valida', 6),
  ('Implementa un programa que simule el envío y recepción de paquetes en un modelo cliente-servidor.', 'Intermedio', 'Operaciones: Cliente envía "Hola", Servidor recibe\nResultado: Servidor: "Recibido: Hola"', 'Servidor: "Recibido: Hola"', 'Cliente: "Hola"', 'Activo', 'Simulacion Cliente-Servidor', 'Servidor: "Recibido: Hola"', 6),
  ('Crea un programa que calcule el espacio utilizado por archivos en un directorio dado.', 'Dificil', 'Directorio: /home/usuario/archivos\nSalida esperada: Espacio utilizado: 1525 KB', 'Espacio utilizado: 1525 KB', '/home/usuario/archivos', 'Activo', 'Calculo de Espacio en Directorio', 'Espacio utilizado: 1525 KB', 6);

-- Problemas de la categoría "Seguridad Informatica"
INSERT INTO `acerudb`.`problema` (`descripcion`, `dificultad`, `ejemplo_entradas`, `ejemplo_salidas`, `entradas`, `estado`, `nombre`, `salidas`, `categoria_id`)
VALUES
  ('Escribe un programa que genere una contraseña segura.', 'Facil', 'Salida esperada: w9J$rp2X', 'w9J$rp2X', NULL, 'Activo', 'Generador de Contraseña', 'w9J$rp2X', 7),
  ('Implementa un programa que verifique si un enlace web es seguro o potencialmente peligroso.', 'Intermedio', 'Entrada: https://www.ejemplo.com\nSalida: Seguro', 'Seguro', 'https://www.ejemplo.com', 'Activo', 'Verificacion de Enlace', 'Seguro', 7),
  ('Crea un programa que encripte y desencripte mensajes utilizando el algoritmo AES.', 'Dificil', 'Mensaje: "Hola mundo"\nClave: "secreta123"\nSalida esperada: Mensaje Encriptado', 'Mensaje Encriptado', 'Mensaje: "Hola mundo"\nClave: "secreta123"', 'Activo', 'Encriptacion y Desencriptacion AES', 'Mensaje Encriptado', 7);


-- MaterialCategoria
-- Inserciones en la tabla MaterialCategoria
INSERT INTO `acerudb`.`materialcategoria` (`descripcion`, `estado`, `nombre`)
VALUES
  ('Categoría de materiales relacionados con algoritmos de ordenamiento.', 'Activo', 'Algoritmos de Ordenamiento'),
  ('Categoría de materiales relacionados con programación en Python.', 'Activo', 'Python'),
  ('Categoría de materiales sobre redes de computadoras.', 'Activo', 'Redes de Computadoras'),
  ('Categoría de materiales para aprender sobre bases de datos y SQL.', 'Activo', 'Bases de Datos y SQL'),
  ('Categoría de materiales relacionados con seguridad informática.', 'Activo', 'Seguridad Informática'),
  ('Categoría de materiales sobre sistemas operativos.', 'Activo', 'Sistemas Operativos'),
  ('Categoría de materiales para aprender sobre lenguajes de programación.', 'Activo', 'Lenguajes de Programación');


