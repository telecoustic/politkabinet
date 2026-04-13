interface PixelArtProps {
  className?: string;
  size?: number;
}

// Палитра
const C = {
  dark: "#2c2c2c",
  red: "#e07a5f",
  blue: "#3d85c6",
  green: "#81b29a",
  gold: "#f2cc8f",
  bg: "#f5f0e8",
};

// Хелпер для генерации rect-ов из массива строк
function pixelGrid(
  rows: string[],
  palette: Record<string, string>
): React.ReactElement[] {
  const rects: React.ReactElement[] = [];
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const ch = row[x];
      if (ch !== "." && palette[ch]) {
        rects.push(
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width={1}
            height={1}
            fill={palette[ch]}
          />
        );
      }
    }
  });
  return rects;
}

/**
 * Железный канцлер — силуэт с усами и пикельхельмом (прусский шлем).
 * Строгий профиль. Сетка 16x16.
 */
export function PixelKantsler({ className, size = 64 }: PixelArtProps) {
  const palette: Record<string, string> = {
    D: C.dark,
    G: C.gold,
  };

  // Пикельхельм с шипом наверху, голова, густые усы, воротник
  const rows = [
    ".......G........", // 0  шип шлема
    "......GGG.......", // 1  шип
    ".....GGGGG......", // 2  основание шипа
    "....GGGGGGG.....", // 3  верх шлема
    "...GGGGGGGGG....", // 4  шлем широкий
    "...GGDDDDDGG....", // 5  шлем + лоб
    "...DDDDDDDDD....", // 6  лоб
    "...D.DDDDD.D....", // 7  глаза (пустые = глаза)
    "...DDDDDDDDD....", // 8  переносица
    "....DDDDDDD.....", // 9  нос
    ".DD.DDDDDDD.DD..", // 10 усы — кончики в стороны
    "DDD..DDDDD..DDD.", // 11 усы — длинные кончики
    ".......D........", // 12 рот
    "....DDDDDDD.....", // 13 подбородок
    "...DDDDDDDDD....", // 14 воротник
    "..DDDDDDDDDDD...", // 15 воротник широкий
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      className={className}
    >
      {pixelGrid(rows, palette)}
    </svg>
  );
}

/**
 * Космический хиппи — человечек в круглых очках с цветком.
 * Свободная поза. Сетка 16x16.
 */
export function PixelHippy({ className, size = 64 }: PixelArtProps) {
  const palette: Record<string, string> = {
    G: C.green,
    Y: C.gold,
    D: C.dark,
  };

  // Хиппи: длинные волосы, круглые очки, цветок, свободная поза
  const rows = [
    "......YY........", // 0  цветок
    ".....YGYY.......", // 1  цветок
    "......YY........", // 2  стебель цветка
    ".....GGGG.......", // 3  волосы
    "....GGGGGG......", // 4  волосы
    "...GGGGGGGG.....", // 5  волосы + голова
    "...GG.GG.GGG....", // 6  очки (. = линзы)
    "...GDDGGDDG.....", // 7  очки дужки
    "...GGGGGGGG.....", // 8  нос
    "....G.GG.GG.....", // 9  улыбка
    "....GGGGGG......", // 10 борода
    ".....GGGG.......", // 11 шея
    "...GGGGGGGG.....", // 12 тело
    "..GG.GGGG.GG....", // 13 руки раскинуты
    ".GG..GGGG..GG...", // 14 руки + тело
    ".....GG.GG......", // 15 ноги
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      className={className}
    >
      {pixelGrid(rows, palette)}
    </svg>
  );
}

/**
 * Кремниевый евангелист — человечек с ноутбуком, техно-стиль.
 * Сетка 16x16.
 */
export function PixelEvangelist({ className, size = 64 }: PixelArtProps) {
  const palette: Record<string, string> = {
    B: C.blue,
    D: C.dark,
  };

  // Евангелист: причёска, очки квадратные, ноутбук перед собой
  const rows = [
    ".....BBBB.......", // 0  волосы
    "....BBBBBB......", // 1  волосы
    "....BBBBBB......", // 2  голова
    "...B.BBBB.B.....", // 3  глаза
    "...BDDBBDDB.....", // 4  квадратные очки
    "...BBBBBBBB.....", // 5  нос
    "....B.BB.BB.....", // 6  улыбка
    "....BBBBBB......", // 7  подбородок
    ".....BBBB.......", // 8  шея
    "...BBBBBBBB.....", // 9  тело
    "..BB.BBBB.BB....", // 10 руки
    "..BBBDDDDBB.....", // 11 руки + ноутбук крышка
    "...BDDDDDB......", // 12 ноутбук экран
    "...BDDDDDB......", // 13 ноутбук экран
    "...DDDDDDD......", // 14 ноутбук клава
    ".....BB.BB......", // 15 ноги
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      className={className}
    >
      {pixelGrid(rows, palette)}
    </svg>
  );
}

/**
 * Народный трибун — человечек с поднятым кулаком.
 * Энергичная поза. Сетка 16x16.
 */
export function PixelTribun({ className, size = 64 }: PixelArtProps) {
  const palette: Record<string, string> = {
    R: C.red,
    D: C.dark,
  };

  // Трибун: кулак поднят вверх, рот открыт (кричит), энергичная поза
  const rows = [
    ".DD.............", // 0  кулак
    ".DDD............", // 1  кулак
    "..DD............", // 2  рука вверх
    "..DD............", // 3  рука вверх
    "..DD..RRRR......", // 4  рука + волосы
    "..DD.RRRRRR.....", // 5  рука + голова
    "..DDRR.RR.RR....", // 6  рука + глаза
    "...RRRRRRRR.....", // 7  лицо
    "....RR.RR.R.....", // 8  открытый рот
    "....R.DD..R.....", // 9  рот кричит
    "....RRRRRR......", // 10 подбородок
    "...RRRRRRRRD....", // 11 тело + правая рука
    "...RRRRRRRR.....", // 12 тело
    "...RRRRRRRR.....", // 13 тело
    "....RR..RR......", // 14 ноги широко
    "...RR....RR.....", // 15 ноги — устойчивая стойка
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      className={className}
    >
      {pixelGrid(rows, palette)}
    </svg>
  );
}

/**
 * Весы/Компас — четыре стрелки по осям, абстрактная иконка.
 * Для секции "Как это работает". Сетка 16x16.
 */
export function PixelBalance({ className, size = 64 }: PixelArtProps) {
  const palette: Record<string, string> = {
    R: C.red,
    B: C.blue,
    G: C.green,
    Y: C.gold,
    D: C.dark,
  };

  // Компас: 4 оси с цветными стрелками, тёмный центр
  const rows = [
    "......RR........", // 0  стрелка вверх (красный)
    ".....RRRR.......", // 1
    "......RR........", // 2
    "......RR........", // 3
    "......RR........", // 4
    "......DD........", // 5  переход к центру
    "BBBB.DDDD.YYYY..", // 6  горизонталь: синий слева, жёлтый справа
    "BBBBBDDDDYYYYY..", // 7
    "BBBBBDDDDYYYYY..", // 8
    "BBBB.DDDD.YYYY..", // 9
    "......DD........", // 10 переход
    "......GG........", // 11
    "......GG........", // 12
    "......GG........", // 13 стрелка вниз (зелёный)
    ".....GGGG.......", // 14
    "......GG........", // 15
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      className={className}
    >
      {pixelGrid(rows, palette)}
    </svg>
  );
}

/**
 * Сравнение — два силуэта рядом со стрелками между ними.
 * Для секции сравнения с другом. Сетка 24x16.
 */
export function PixelCompare({ className, size = 64 }: PixelArtProps) {
  const palette: Record<string, string> = {
    R: C.red,
    B: C.blue,
    D: C.dark,
    G: C.gold,
  };

  // Два силуэта: красный слева, синий справа, стрелки между ними
  const rows = [
    "..RRRR............BBBB..", // 0
    ".RRRRRR..........BBBBBB.", // 1
    ".RRRRRR..........BBBBBB.", // 2
    ".RR.RRR..........BB.BBB.", // 3
    ".RRRRRR..........BBBBBB.", // 4
    ".RRRRRR..........BBBBBB.", // 5
    "..RRRR............BBBB..", // 6
    "..RRRR............BBBB..", // 7
    ".RRRRRR...GG....BBBBBB..", // 8  стрелка вправо
    "RRRRRRRR..GGG..BBBBBBBB.", // 9  стрелка
    "RRRRRRRR..GGGG.BBBBBBBB.", // 10 стрелка
    "RRRRRRRR..GGG..BBBBBBBB.", // 11 стрелка
    ".RRRRRR...GG....BBBBBB..", // 12 стрелка влево
    ".RR..RR..........BB..BB.", // 13
    ".RR..RR..........BB..BB.", // 14
    "RRR..RRR........BBB..BBB", // 15
  ];

  return (
    <svg
      width={size}
      height={(size * 16) / 24}
      viewBox="0 0 24 16"
      shapeRendering="crispEdges"
      className={className}
    >
      {pixelGrid(rows, palette)}
    </svg>
  );
}

/**
 * Вопросительный знак — стилизованный пиксельный.
 * Для hero или секции "Узнаёшь себя?". Сетка 16x16.
 */
export function PixelQuestionMark({ className, size = 64 }: PixelArtProps) {
  const palette: Record<string, string> = {
    D: C.dark,
  };

  const rows = [
    "................", // 0
    "....DDDDDDDD....", // 1  верхняя дуга
    "...DDDDDDDDDD...", // 2
    "..DDD......DDD..", // 3
    "..DDD......DDD..", // 4
    "..........DDD...", // 5  начало загиба
    ".........DDD....", // 6
    "........DDD.....", // 7
    ".......DDD......", // 8
    "......DDD.......", // 9
    "......DDD.......", // 10
    "......DDD.......", // 11
    "................", // 12 пауза
    "......DDD.......", // 13 точка
    "......DDD.......", // 14 точка
    "................", // 15
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      className={className}
    >
      {pixelGrid(rows, palette)}
    </svg>
  );
}
