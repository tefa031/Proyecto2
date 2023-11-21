export const DATA_MAIN={
  title:"¡ACEPTA EL RETO!",
  description:"Resuelve problemas algoritmicos y Aprende a programar con ACERU con diversos ejercicios y clasificacion de aprendizaje a tu nivel de conocimiento",
  image:"assets/images/home/inicio.jpg"
}
export const DATA_LIST_BTN_RESOURCES=[
  {icon:"assets/images/home/herramienta.png",title:"Consulta",description:"Contenidos disponibles en ACERU.", routerLink: "/problems" },
  {icon:"assets/images/home/codigo.png",title:"Crea",description:"Colecciones de algoritmos de tu intéres." , routerLink: "/materials" },
  {icon:"assets/images/home/bocina.png",title:"Participa",description:"En las minicompetencias para ver tu nivel de conocimientos." , routerLink: "/skills" }
]

export const DATA_RESOURCES = [
  {
    title: "Resuelve Problemas",
    description: "Amplia gama de problemas de desarrollo de algoritmos, teniendo en cuenta tus conocimientos desde lo más básico y avanzado, con ejercicios de Estructuras de datos, Matrices, Matemáticas, Gráfos, entre otros.",
    image: "assets/images/home/imag1.jpg",
    orientation: "left",
    btnText: "Empezar",
    routerLink: "/problems" 
  },
  {
    title: "Aprende a Programar",
    description: "Con materiales de apoyo para tus conocimientos. Temarios de programación, Videos y PDF, con todos los recursos necesarios. Además con ejercicios de pruebas por cada categoría de aprendizaje en programación competitiva.",
    image: "assets/images/home/programar.jpg",
    orientation: "right",
    btnText: "Ver",
    routerLink: "/materials" 
  },
  {
    title: "Participa en MiniCompetencias",
    description: "Tus conocimientos serán evaluados con más participantes y verás mejores resultados con mayores aciertos en competencias.",
    image: "assets/images/home/recurso3.jpg",
    orientation: "left",
    btnText: "Empezar",
    routerLink: "/skills" 
  }
];

export const DATA_NEWS=
  {

    title:"COLECCIONES DE INFORMACIÓN",
    subtitle:"Conoce toda la información de las maratones de programación tanto a nivel Nacional, Regional e Institucional",
    news:[
      {  id:0,titleNews:"Maraton Nacional de Programación",descriptionNews:"Se encuentra abiertas las incripciones para probar tus conocimientos ACIS",image:"assets/images/home/inf2.jpg"},
      {  id:1,titleNews:"XXXVI  Maratón Nacional de Programación ACIS/REDIS 2022",descriptionNews:"En la Maratón los estudiantes competidores debían resolver un listado de problemas en un tiempo determinado, demostrando su pasión por la matemática, la programación y la algoritmia en un ambiente de sana competencia",image:"assets/images/home/inf1.png"}
    ]
  }
  export const DATA_ABOUT={

      title:"Acerca de",
      description:"ACERU es una plataforma de entrenamiento en programación competitiva. Su utilidad está destinada a los estudiantes de Ingeniería de Sistemas de la Universidad de Nariño y sus Docentes, con el fin de motivar a crear un grupo de estudios y equipos colaborativos en esta área de conocimiento, y llevar a los estudiantes a escenarios educativos y de compentencia.",
      logos:[{imageUrl:"assets/images/home/logo_grias.png"},{imageUrl:"assets/images/home/logo_udenar.png"},{imageUrl:"assets/images/home/logo_departamento.png"}]
  }

