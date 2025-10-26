import React from 'react';
import { Topic, TopicStatus, CaseStudy, PhysicalTest, Flashcard, ConceptMapNode } from './types';

const topic1ConceptMap: ConceptMapNode = {
    title: 'TEMA 1: Concepto de Educación Física: Evolución y Desarrollo',
    children: [
        { title: 'Introducción' },
        {
            title: 'Concepto de Educación Física',
            children: [
                { title: 'Análisis conceptual' },
                { title: 'Funciones del movimiento' },
            ],
        },
        {
            title: 'Evolución y Desarrollo de las Concepciones',
            children: [
                { title: 'Era gimnástica antigua: de la prehistoria al renacimiento' },
                { title: 'Era gimnástica moderna: de la ilustración al siglo XXI' },
            ]
        },
        { title: 'La EF en el Contexto Educativo Actual' },
        { title: 'Conclusiones' },
    ]
};

const topic2ConceptMap: ConceptMapNode = {
    title: 'TEMA 2: La EF en el Sistema Educativo',
    children: [
        { title: 'Introducción' },
        {
            title: 'La EF en el Sistema Educativo: Objetivos y Contenidos',
            children: [
                { title: 'Evolución y perspectiva curricular' },
                { 
                    title: 'El papel de la EF en la LOMLOE',
                    children: [
                        { title: 'Objetivos' },
                        { title: 'Saberes básicos' },
                        { title: 'Competencias clave' },
                        { title: 'Competencias específicas y criterios de evaluación' },
                    ]
                },
            ],
        },
        {
            title: 'Evolución y Desarrollo de las Funciones del Movimiento',
            children: [
                { title: 'Evolución de las distintas funciones' },
                { title: 'Funciones atribuidas al movimiento' },
            ]
        },
        { title: 'Conclusiones' },
    ]
};

const topic3ConceptMap: ConceptMapNode = {
    title: 'TEMA 3: Anatomía y Fisiología Humana en la Actividad Física',
    children: [
        { title: 'Introducción' },
        {
            title: 'Anatomía y Fisiología',
            children: [
                { title: 'Sistema osteoarticular' },
                { title: 'Sistema neuromuscular' },
                { title: 'Sistema cardiorrespiratorio' },
            ],
        },
        {
            title: 'Patologías Relacionadas',
            children: [
                { title: 'Patologías del sistema osteoarticular' },
                { title: 'Patologías del sistema neuromuscular' },
                { title: 'Patologías del sistema cardiorrespiratorio' },
            ]
        },
        {
            title: 'Evaluación y Tratamiento en el Proceso Educativo',
            children: [
                { title: 'Evaluación' },
                { title: 'Tratamiento' },
            ]
        },
        { title: 'Conclusiones' },
    ]
};

const topic4ConceptMap: ConceptMapNode = {
    title: 'TEMA 4: Crecimiento y Desarrollo Neuromotor, Óseo y Muscular',
    children: [
        { title: 'Introducción' },
        {
            title: 'Crecimiento y Desarrollo',
            children: [
                { title: 'Aproximación conceptual' },
                { title: 'Crecimiento' },
                { title: 'Desarrollo neuromotor' },
                { title: 'Desarrollo óseo' },
                { title: 'Desarrollo muscular' },
            ],
        },
        { title: 'Factores Endógenos y Exógenos' },
        {
            title: 'Patologías Relacionadas',
            children: [
                { title: 'Patologías relacionadas con el crecimiento' },
                { title: 'Patologías relacionadas con la capacidad de movimiento' },
            ]
        },
        {
            title: 'Evaluación y Tratamiento',
            children: [
                { title: 'Evaluación' },
                { title: 'Tratamiento' },
            ]
        },
        { title: 'Conclusiones' },
    ]
};

const topic5ConceptMap: ConceptMapNode = {
    title: 'TEMA 5: Salud y Calidad de Vida',
    children: [
        { title: 'Introducción' },
        { title: 'La Salud y la Calidad de Vida' },
        {
            title: 'Hábitos y Estilos de Vida Saludables',
            children: [
                { title: 'Beneficios de la actividad física' },
                { title: 'Efectos del ejercicio sobre enfermedades' },
            ],
        },
        { title: 'El Cuidado del Cuerpo' },
        { title: 'Autonomía y Autoestima' },
        { title: 'Conclusiones' },
    ]
};

const topic6ConceptMap: ConceptMapNode = {
    title: 'TEMA 6: Capacidades Físicas Básicas (CFB)',
    children: [
        { title: 'Introducción' },
        {
            title: 'CFB: Concepto, Clasificación, Evolución y Métodos',
            children: [
                { title: 'Aproximación conceptual' },
                { title: 'La fuerza' },
                { title: 'La velocidad' },
                { title: 'La resistencia' },
                { title: 'La flexibilidad' },
            ],
        },
        { title: 'Consideraciones Pedagógicas e Intervención Didáctica' },
        { title: 'Conclusiones' },
    ]
};

const topic7ConceptMap: ConceptMapNode = {
    title: 'TEMA 7: Coordinación y Equilibrio',
    children: [
        { title: 'Introducción' },
        { title: 'Capacidades Coordinativas: Concepto y Clasificación' },
        { title: 'Coordinación: Concepto, Clasificación y Actividades' },
        { title: 'Equilibrio: Concepto, Clasificación y Actividades' },
        { title: 'Tratamiento Educativo y Consideraciones Pedagógicas' },
        { title: 'Conclusiones' },
    ]
};

const topic8ConceptMap: ConceptMapNode = {
    title: 'TEMA 8: El Aprendizaje Motor',
    children: [
        { title: 'Introducción' },
        { title: 'El Aprendizaje Motor' },
        { title: 'Principales Modelos Explicativos' },
        { title: 'El Proceso de Enseñanza y Aprendizaje Motor' },
        { title: 'Mecanismos y Factores que Intervienen' },
        { title: 'Consideraciones Pedagógicas' },
        { title: 'Conclusiones' },
    ]
};


const topic9ConceptMap: ConceptMapNode = {
  title: 'TEMA 9: Habilidades, Destrezas y Tareas Motrices',
  children: [
    { title: 'Introducción' },
    { title: 'Habilidades y Destrezas Motrices: Concepto, Análisis y Clasificación' },
    { title: 'Tareas Motrices: Concepto, Análisis y Clasificación' },
    { title: 'Consideraciones Pedagógicas y Actividades para su Desarrollo' },
    { title: 'Conclusiones' },
  ],
};

const topic10ConceptMap: ConceptMapNode = {
    title: 'TEMA 10: Evolución de las Capacidades Motrices',
    children: [
        { title: 'Introducción' },
        {
            title: 'Evolución de las Capacidades Motrices y Desarrollo General',
            children: [
                { title: 'Análisis conceptual' },
                { title: 'Capacidades físico-motrices' },
                { title: 'Capacidades perceptivo-motrices' },
                { title: 'Capacidades socio-motrices' },
            ],
        },
        { title: 'Educación Sensomotriz y Psicomotriz en la Infancia' },
        { title: 'Conclusiones' },
    ]
};

const topic11ConceptMap: ConceptMapNode = {
    title: 'TEMA 11: El Esquema Corporal y la Lateralización',
    children: [
        { title: 'Introducción' },
        { title: 'Análisis Conceptual y Clasificación' },
        { title: 'El Esquema Corporal' },
        { title: 'El Proceso de Lateralización' },
        { title: 'Desarrollo de las Capacidades Perceptivo-Motrices' },
        { title: 'Intervención Educativa en EF' },
        { title: 'Conclusiones' },
    ]
};

const topic12ConceptMap: ConceptMapNode = {
    title: 'TEMA 12: La Expresión Corporal',
    children: [
        { title: 'Introducción' },
        { 
            title: 'La Expresión Corporal en el Desarrollo del Área de EF',
            children: [
                { title: 'Concepto y funciones' },
                { title: 'La expresión corporal en el diseño curricular' },
            ]
        },
        { 
            title: 'Manifestaciones Expresivas Asociadas al Movimiento',
            children: [
                { title: 'Corrientes asociadas' },
                { title: 'Manifestaciones expresivas y complejas' },
                { title: 'Concreción y progresión curricular' },
            ]
        },
        { title: 'Intervención Educativa y Consideraciones Pedagógicas' },
        { title: 'Conclusiones' },
    ]
};

const topic13ConceptMap: ConceptMapNode = {
    title: 'TEMA 13: El Juego como Actividad de Enseñanza y Aprendizaje',
    children: [
        { title: 'Introducción' },
        { 
            title: 'El Juego en el Área de EF',
            children: [
                { title: 'Aproximación conceptual' },
                { title: 'Funciones del juego' },
                { title: 'Teorías del juego' },
                { title: 'Clasificación del juego' },
            ]
        },
        { 
            title: 'Adaptaciones Metodológicas',
            children: [
                { title: 'Tendencias actuales' },
                { title: 'Consideraciones didácticas' },
            ]
        },
        { title: 'Conclusiones' },
    ]
};

const topic14ConceptMap: ConceptMapNode = {
    title: 'TEMA 14: Los Deportes: Concepto y Clasificaciones',
    children: [
        { title: 'Introducción' },
        { 
            title: 'Conceptos y Clasificaciones',
            children: [
                { title: 'Análisis conceptual' },
                { title: 'Clasificación' },
            ]
        },
        { title: 'El Deporte como Actividad Educativa' },
        { 
            title: 'Deportes en la Escuela: Didáctica',
            children: [
                { title: 'Deportes individuales' },
                { title: 'Deportes colectivos' },
            ]
        },
        { title: 'Consideraciones Pedagógicas' },
        { title: 'Conclusiones' },
    ]
};

const topic15ConceptMap: ConceptMapNode = {
    title: 'TEMA 15: La EF y el Deporte como Elemento Sociocultural',
    children: [
        { title: 'Introducción' },
        { title: 'La EF y el Deporte como Elemento Sociocultural' },
        { 
            title: 'Juegos y Deportes Populares, Autóctonos y Tradicionales',
            children: [
                { title: 'Análisis conceptual y clasificación' },
                { title: 'Juegos y deportes en España y Madrid' },
                { title: 'Valor educativo y aplicaciones' },
            ]
        },
        { 
            title: 'Actividades Físicas en el Medio Natural',
            children: [
                { title: 'Generalidades y evolución histórica' },
                { title: 'Clasificación y organización' },
                { title: 'Propuesta de actividades' },
            ]
        },
        { title: 'Conclusiones' },
    ]
};

const topic16ConceptMap: ConceptMapNode = {
    title: 'TEMA 16: Sistemática del Ejercicio y Elementos del Movimiento',
    children: [
        { title: 'Introducción' },
        { 
            title: 'Principios y Elementos',
            children: [
                { title: 'Análisis conceptual y principios' },
                { title: 'Análisis del movimiento y elementos estructurales' },
            ]
        },
        { 
            title: 'Sistemas de Desarrollo de la Actividad Física',
            children: [
                { title: 'Sistemas analíticos' },
                { title: 'Sistemas naturales' },
                { title: 'Sistemas rítmicos' },
            ]
        },
        { title: 'Consideraciones Pedagógicas' },
        { title: 'Conclusiones' },
    ]
};

const topic17ConceptMap: ConceptMapNode = {
    title: 'TEMA 17: Desarrollo de las CFB en la Edad Escolar',
    children: [
        { title: 'Introducción' },
        { 
            title: 'Desarrollo de las CFB',
            children: [
                { title: 'Aproximación conceptual' },
                { title: 'Fuerza, velocidad, resistencia y flexibilidad' },
            ]
        },
        { title: 'Factores Entrenables y No Entrenables' },
        { title: 'Adaptación al Esfuerzo en Niños y Niñas' },
        { title: 'Consideraciones Pedagógicas e Intervención Didáctica' },
        { title: 'Conclusiones' },
    ]
};

const topic18ConceptMap: ConceptMapNode = {
    title: 'TEMA 18: Desarrollo de Habilidades y Principios del Entrenamiento',
    children: [
        { title: 'Introducción' },
        { title: 'Desarrollo de Habilidades: Concepto, Análisis y Clasificación' },
        { title: 'Principios Fundamentales del Entrenamiento' },
        { title: 'Adecuación del Entrenamiento en Primaria' },
        { title: 'Conclusiones' },
    ]
};

const topic19ConceptMap: ConceptMapNode = {
    title: 'TEMA 19: Recursos y Materiales Didácticos de EF',
    children: [
        { title: 'Introducción' },
        { 
            title: 'Recursos y Materiales Didácticos Específicos',
            children: [
                { title: 'Análisis conceptual, funciones y clasificación' },
                { title: 'Características de los recursos' },
            ]
        },
        { 
            title: 'Utilización de los Recursos de la Comunidad',
            children: [
                { title: 'Instalaciones y espacios' },
                { title: 'Recursos naturales' },
            ]
        },
        { title: 'Conclusiones' },
    ]
};

const topic20ConceptMap: ConceptMapNode = {
    title: 'TEMA 20: Organización de Grupos y Tareas',
    children: [
        { title: 'Introducción' },
        { 
            title: 'Organización de Grupos y Tareas',
            children: [
                { title: 'Grupos' },
                { title: 'Tareas' },
            ]
        },
        { 
            title: 'Planificación de Actividades: Modelos de Sesión',
            children: [
                { title: 'Planificación' },
                { title: 'Modelos de sesión' },
            ]
        },
        { title: 'Consideraciones Pedagógicas' },
        { title: 'Conclusiones' },
    ]
};

const topic21ConceptMap: ConceptMapNode = {
    title: 'TEMA 21: Alumnos con Necesidades Educativas Especiales (NEE)',
    children: [
        { title: 'Introducción' },
        { 
            title: 'Alumnos con NEE',
            children: [
                { title: 'Reseña histórica, legislativa y conceptual' },
                { title: 'Atención a la diversidad e inclusión' },
            ]
        },
        { 
            title: 'Características de las Minusvalías',
            children: [
                { title: 'Análisis conceptual' },
                { title: 'Minusvalías motoras' },
                { title: 'Minusvalías psíquicas' },
                { title: 'Minusvalías sensoriales' },
            ]
        },
        { title: 'Tratamiento Educativo y Consideraciones Pedagógicas' },
        { title: 'Conclusiones' },
    ]
};

const topic22ConceptMap: ConceptMapNode = {
    title: 'TEMA 22: Desarrollo Motor y Perceptivo del Niño Discapacitado',
    children: [
        { title: 'Introducción' },
        { 
            title: 'Desarrollo Motor y Perceptivo',
            children: [
                { title: 'Discapacidad motora y actividad física' },
                { title: 'Discapacidad psíquica y actividad física' },
                { title: 'Discapacidad sensorial y actividad física' },
            ]
        },
        { 
            title: 'La Integración Escolar como Respuesta Educativa',
            children: [
                { title: 'Justificación legislativa' },
                { title: 'Atención a la diversidad e inclusión' },
            ]
        },
        { title: 'Implicaciones en el Área de EF' },
        { title: 'Conclusiones' },
    ]
};

const topic23ConceptMap: ConceptMapNode = {
    title: 'TEMA 23: Métodos de Enseñanza en EF',
    children: [
        { title: 'Introducción' },
        { 
            title: 'Métodos de Enseñanza en EF',
            children: [
                { title: 'Concepto y clasificación (Delgado Noguera)' },
                { title: 'Métodos y tendencias actuales' },
            ]
        },
        { title: 'Adecuación a los Principios Metodológicos de Primaria' },
        { title: 'Conclusiones' },
    ]
};

const topic24ConceptMap: ConceptMapNode = {
    title: 'TEMA 24: La Evaluación de la Educación Física',
    children: [
        { title: 'Introducción' },
        { 
            title: 'La Evaluación en Primaria',
            children: [
                { title: 'Análisis conceptual y características' },
                { title: 'Preguntas a responder' },
            ]
        },
        { 
            title: 'Evaluación del Proceso de E-A: Mecanismos e Instrumentos',
            children: [
                { title: 'Tipos, mecanismos e instrumentos' },
                { title: 'Características de los instrumentos' },
            ]
        },
        { 
            title: 'Función de los Criterios de Evaluación',
            children: [
                { title: 'Análisis conceptual y funciones' },
                { title: 'Competencias específicas y saberes básicos' },
            ]
        },
        { title: 'Conclusiones' },
    ]
};

const topic25ConceptMap: ConceptMapNode = {
    title: 'TEMA 25: Coeducación e Igualdad de Sexos',
    children: [
        { title: 'Introducción' },
        { 
            title: 'Coeducación e Igualdad en el Contexto Escolar y EF',
            children: [
                { title: 'Aproximación conceptual' },
                { title: 'Evolución en el contexto escolar' },
                { title: 'Justificación legislativa y relación con la EF' },
            ]
        },
        { title: 'Estereotipos y Actitudes Sexistas en la EF' },
        { title: 'Intervención Educativa y Consideraciones Pedagógicas' },
        { title: 'Conclusiones' },
    ]
};


const originalTopics = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  title: `Tema ${i + 1}`,
  status: TopicStatus.NotStarted,
}));

const topicData: { [key: number]: { title: string, conceptMap: ConceptMapNode, status?: TopicStatus } } = {
    1: { title: 'Concepto de Educación Física: Evolución y Desarrollo', conceptMap: topic1ConceptMap, status: TopicStatus.InProgress },
    2: { title: 'La EF en el Sistema Educativo: Objetivos y Contenidos', conceptMap: topic2ConceptMap },
    3: { title: 'Anatomía y Fisiología Humana en la Actividad Física', conceptMap: topic3ConceptMap },
    4: { title: 'Crecimiento y Desarrollo Neuromotor, Óseo y Muscular', conceptMap: topic4ConceptMap },
    5: { title: 'Salud y Calidad de Vida', conceptMap: topic5ConceptMap },
    6: { title: 'Capacidades Físicas Básicas, su Evolución y Factores', conceptMap: topic6ConceptMap },
    7: { title: 'Coordinación y Equilibrio: Concepto y Actividades', conceptMap: topic7ConceptMap },
    8: { title: 'El Aprendizaje Motor y sus Modelos Explicativos', conceptMap: topic8ConceptMap },
    9: { title: 'Habilidades, Destrezas y Tareas Motrices', conceptMap: topic9ConceptMap, status: TopicStatus.FirstReview },
    10: { title: 'Evolución de las Capacidades Motrices y Desarrollo General', conceptMap: topic10ConceptMap },
    11: { title: 'El Esquema Corporal y el Proceso de Lateralización', conceptMap: topic11ConceptMap },
    12: { title: 'La Expresión Corporal en el Desarrollo del Área de EF', conceptMap: topic12ConceptMap },
    13: { title: 'El Juego como Actividad de Enseñanza y Aprendizaje', conceptMap: topic13ConceptMap },
    14: { title: 'Los Deportes: Concepto, Clasificaciones y Didáctica', conceptMap: topic14ConceptMap },
    15: { title: 'La EF y el Deporte como Elemento Sociocultural', conceptMap: topic15ConceptMap },
    16: { title: 'Principios de Sistemática del Ejercicio y Elementos del Movimiento', conceptMap: topic16ConceptMap },
    17: { title: 'Desarrollo de las CFB y Adaptación al Esfuerzo en Niños', conceptMap: topic17ConceptMap },
    18: { title: 'Desarrollo de Habilidades y Principios del Entrenamiento', conceptMap: topic18ConceptMap },
    19: { title: 'Recursos y Materiales Didácticos Específicos de EF', conceptMap: topic19ConceptMap },
    20: { title: 'Organización de Grupos y Tareas: Modelos de Sesión', conceptMap: topic20ConceptMap },
    21: { title: 'Alumnos con Necesidades Educativas Especiales', conceptMap: topic21ConceptMap },
    22: { title: 'Desarrollo Motor del Niño Discapacitado e Integración', conceptMap: topic22ConceptMap },
    23: { title: 'Métodos de Enseñanza en EF y su Adecuación', conceptMap: topic23ConceptMap },
    24: { title: 'La Evaluación de la Educación Física en Primaria', conceptMap: topic24ConceptMap },
    25: { title: 'Coeducación e Igualdad de Sexos en el Contexto Escolar', conceptMap: topic25ConceptMap },
};


export const SYLLABUS_TOPICS: Topic[] = originalTopics.map(topic => {
    const data = topicData[topic.id];
    if (data) {
        return { 
            ...topic, 
            title: `Tema ${topic.id}: ${data.title}`,
            conceptMap: data.conceptMap,
            ...(data.status && { status: data.status }) // a shorthand for if(data.status) { status: data.status }
        };
    }
    return {
        ...topic,
        title: `Tema ${topic.id}: Título no disponible`,
    }
});


export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs1',
    title: 'Inclusión y DUA en EF',
    description: 'Diseñe una intervención para una clase de 3º de Primaria con dos alumnos ACNEAE (uno con TDAH y otro con movilidad reducida) aplicando los principios del Diseño Universal de Aprendizaje (DUA).',
    topics: ['Inclusión', 'DUA', 'ACNEAE'],
    flashcards: [
        { id: 'f1-1', question: '¿Cuáles son los 3 principios del DUA?', answer: '1. Proporcionar múltiples formas de representación. 2. Proporcionar múltiples formas de acción y expresión. 3. Proporcionar múltiples formas de implicación.'},
        { id: 'f1-2', question: 'Legislación clave para la inclusión en Madrid', answer: 'Decreto 61/2022 (Currículo) y la Orden 130/2023 (Organización y Funcionamiento) enfatizan la atención a la diversidad.'},
        { id: 'f1-3', question: 'Ejemplo de adaptación para TDAH en EF', answer: 'Instrucciones claras y cortas, rutinas predecibles, uso de apoyos visuales y permitir movimiento (ej. ser el "ayudante del material").'},
    ]
  },
  {
    id: 'cs2',
    title: 'Salud y Sedentarismo',
    description: 'Un estudio del centro revela un aumento del sedentarismo en 5º de Primaria. Proponga un proyecto interdisciplinar desde EF para fomentar hábitos de vida activa y saludable.',
    topics: ['Salud', 'Sedentarismo', 'ODS'],
     flashcards: [
        { id: 'f2-1', question: '¿Qué ODS se relaciona directamente con este supuesto?', answer: 'El ODS 3: Salud y Bienestar. Busca garantizar una vida sana y promover el bienestar para todos en todas las edades.'},
        { id: 'f2-2', question: '¿Qué es un proyecto interdisciplinar?', answer: 'Una metodología que integra varias áreas curriculares (ej. EF, Ciencias Naturales, Matemáticas) para abordar un tema o problema desde diferentes perspectivas, haciéndolo más significativo.'},
        { id: 'f2-3', question: 'Competencia Específica clave en este caso', answer: 'La CE1 del currículo de EF: "Adoptar un estilo de vida activo y saludable, practicando regularmente actividades físicas, lúdicas y deportivas..."'},
    ]
  },
  {
    id: 'cs3',
    title: 'Expresión Corporal y Acoso Escolar',
    description: 'En una clase de 5º de Primaria, se detecta un caso de exclusión hacia un alumno. ¿Cómo trabajaría los elementos de la expresión corporal para mejorar la cohesión grupal y abordar esta problemática, culminando con la participación en el festival de navidad?',
    topics: ['Expresión Corporal', 'Convivencia', 'Acoso Escolar'],
    flashcards: [
        { id: 'f3-1', question: '¿Por qué la expresión corporal es útil aquí?', answer: 'Permite trabajar la empatía, la comunicación no verbal, el reconocimiento y la gestión de emociones en un entorno seguro y creativo, sin la presión del lenguaje oral.'},
        { id: 'f3-2', question: '¿Qué es el "Plan IncluYO" de la CAM?', answer: 'Es el marco de actuación de la Comunidad de Madrid para la mejora de la convivencia y la prevención del acoso escolar en los centros educativos.'},
        { id: 'f3-3', question: 'Ejemplo de actividad de expresión corporal para la cohesión', answer: 'El "espejo humano" en parejas o pequeños grupos, donde se deben imitar los movimientos del otro, fomentando la atención, el respeto y la sintonía con los compañeros.'},
    ]
  },
   {
    id: 'cs4',
    title: 'Juegos Populares con Alumnado Refugiado',
    description: "En su clase de 4º de Primaria se incorpora un alumno refugiado de Ucrania que desconoce el idioma. Diseñe una sesión de Juegos Populares y Tradicionales, explicando las medidas de organización, agrupamiento y atención para incluir a este alumno.",
    topics: ['Inclusión', 'Interculturalidad', 'Juegos Populares'],
    flashcards: [
        { id: 'f4-1', question: '¿Principal barrera y cómo superarla en EF?', answer: 'La barrera idiomática. En EF se supera con la comunicación no verbal, el modelado (el profesor hace el juego), los pictogramas y el apoyo de compañeros ("alumnos tutores").'},
        { id: 'f4-2', question: '¿Por qué los Juegos Populares son una buena elección?', answer: 'Son universales, muchos tienen variantes en diferentes culturas, sus reglas son sencillas y se basan en la acción motriz, minimizando la necesidad de explicaciones verbales complejas.'},
        { id: 'f4-3', question: 'Medida organizativa clave para la inclusión', answer: 'Crear parejas o pequeños grupos heterogéneos donde el nuevo alumno pueda aprender por imitación y recibir ayuda directa de sus compañeros, fomentando lazos sociales.'},
    ]
  },
  {
    id: 'cs5',
    title: 'Gamificación en el Aprendizaje Motor',
    description: "Para una clase de 6º de Primaria, diseñe una Unidad de Programación Didáctica gamificada de 6 sesiones para la iniciación al colpbol, incluyendo sistema de puntos, niveles y recompensas.",
    topics: ['Gamificación', 'Metodologías Activas', 'Iniciación Deportiva'],
    flashcards: [
      { id: 'f5-1', question: 'Elementos clave de la gamificación', answer: 'Narrativa, sistema de puntos (XP), niveles, insignias (badges), rankings, avatares y recompensas. El objetivo es aumentar la motivación intrínseca.'},
      { id: 'f5-2', question: '¿Qué es el Colpbol?', answer: 'Un deporte colectivo mixto creado por el profesor Juanjo Bendicho, cuyo objetivo es marcar gol en la portería contraria golpeando el balón con las manos. Fomenta la máxima participación y la cooperación.'},
      { id: 'f5-3', question: 'Diferencia entre Gamificación y Juego', answer: 'La gamificación aplica elementos de diseño de juegos en contextos no lúdicos (como la educación) para motivar. El juego es la actividad lúdica en sí misma.'}
    ]
  },
  {
    id: 'cs6',
    title: 'Actividades en el Medio Natural (APNB)',
    description: "Planifique una salida de día completo al Parque Nacional de la Sierra de Guadarrama con alumnos de 5º de Primaria. Detalle los objetivos, actividades (senderismo interpretativo, juegos de orientación) y medidas de seguridad.",
    topics: ['Medio Natural', 'APNB', 'Seguridad'],
    flashcards: [
      { id: 'f6-1', question: '¿Qué significa APNB?', answer: 'Actividades Físicas en el Medio Natural. Son contenidos del currículo de EF que buscan el disfrute y el aprendizaje a través del movimiento en entornos naturales.'},
      { id: 'f6-2', question: 'Ratio profesor/alumno en salidas', answer: 'La normativa de la CAM recomienda ratios específicas para salidas escolares para garantizar la seguridad. Es crucial consultarla y, si es posible, contar con apoyo adicional.'},
      { id: 'f6-3', question: 'Contenido clave en un juego de orientación', answer: 'Uso básico de mapa y brújula, identificación de puntos de referencia, seguimiento de rumbos sencillos y trabajo en equipo para la toma de decisiones.'}
    ]
  },
  {
    id: 'cs7',
    title: 'Gestión de Conflictos en el Aula',
    description: "Durante una actividad competitiva en 2º de Primaria, surge un conflicto entre dos alumnos por no aceptar la derrota. Describa su intervención inmediata y las estrategias a medio plazo desde EF para trabajar la gestión emocional y el juego limpio.",
    topics: ['Gestión Emocional', 'Convivencia', 'Resolución de Conflictos'],
    flashcards: [
      { id: 'f7-1', question: 'Intervención inmediata (protocolo)', answer: '1. Detener la actividad. 2. Separar a los implicados y calmar la situación. 3. Escucha activa de ambas partes (sin juzgar). 4. Búsqueda conjunta de una solución o reparación. 5. Reforzar la norma y reanudar el juego.'},
      { id: 'f7-2', question: '¿Qué es el "tercer tiempo" en EF?', answer: 'Un momento de reflexión post-partido/juego, inspirado en el rugby, donde ambos equipos se reúnen para dialogar sobre lo ocurrido, felicitar al contrario y resolver posibles roces, fomentando el respeto y los valores.'},
      { id: 'f7-3', question: 'Metodología que favorece el juego limpio', answer: 'El Aprendizaje Cooperativo, donde el éxito del equipo depende de la colaboración de todos, reduce la competitividad mal entendida y fomenta la ayuda mutua y la responsabilidad compartida.'}
    ]
  },
  {
    id: 'cs8',
    title: 'Proyecto Interdisciplinar: Arte y Movimiento',
    description: "En colaboración con el área de Educación Artística, diseñe un proyecto para alumnos de 1º de Primaria que explore las cualidades del movimiento (lento, rápido, fuerte, suave) a través de la música y la pintura, culminando en una performance.",
    topics: ['Interdisciplinariedad', 'Expresión Corporal', 'Creatividad'],
    flashcards: [
      { id: 'f8-1', question: 'Justificación curricular de este proyecto', answer: 'Conecta la Competencia Específica 4 de EF (desarrollar procesos de autorregulación e interacción en situaciones motrices) con la CE1 de Artística (descubrir propuestas artísticas de diferentes géneros).'},
      { id: 'f8-2', question: 'Autor relevante en expresión corporal', answer: 'Patricia Stokoe, pedagoga argentina, es una figura clave en la expresión corporal-danza, defendiendo el movimiento como lenguaje personal y forma de autoconocimiento.'},
      // FIX: Changed 'g' to 'id' to match the Flashcard type.
      { id: 'f8-3', question: 'Ejemplo de Situación de Aprendizaje', answer: 'Título: "Pintamos con el cuerpo". Los alumnos, con música de fondo (ej. Vivaldi), se mueven por un gran papel en el suelo con pintura de dedos en pies y manos, explorando cómo diferentes ritmos generan diferentes trazos y sensaciones.'}
    ]
  }
];

export const ICONS: { [key: string]: React.ReactElement } = {
    dashboard: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
    syllabus: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.494h18" /></svg>,
    planner: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    caseStudies: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
    curriculum: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    admin: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    logout: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>,
    play: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>,
    pause: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>,
    reset: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" /></svg>,
    download: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>,
};