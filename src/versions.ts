type Version = {
  version?: string;
  names: string[];
  year?: number | undefined;
  chapterCount: number;
  chapters: number[];
  zhipiCount?: number;
  description: { source: string; content: string[] }[];
};

export const versions: Version[] = [
  {
    version: '甲戌本',
    names: ['脂砚斋甲戌抄阅再评本', '脂砚斋重评石头记'],
    year: 1754,
    chapterCount: 16,
    chapters: Array.from({ length: 8 }, (_, i) => 1 + i) // 1-8
      .concat(Array.from({ length: 4 }, (_, i) => 13 + i)) // 13-16
      .concat(Array.from({ length: 4 }, (_, i) => 25 + i)), // 25-28
    zhipiCount: 1587,
    description: [
      { source: 'Wikipedia', content: ['甲戌本很可能是作者的第一个定稿'] },
      {
        source: '胡适',
        content: [
          '我指出这个甲戌本子是世间最古的《红楼梦》写本，前面有《凡例》四百字，有自题七言律诗，结句云“字字看来皆是血，十年辛苦不寻常”，都是流行的抄本刻本所没有的。',
        ],
      },
    ],
  },

  {
    version: '己卯本',
    names: ['脂砚斋重评石头记己卯本', '冬月脂砚斋四阅评本'],
    year: 1759,
    chapterCount: 38,
    chapters: Array.from({ length: 20 }, (_, i) => 1 + i) // 1-20
      .concat(Array.from({ length: 10 }, (_, i) => 31 + i)) // 31-40
      .concat(Array.from({ length: 10 }, (_, i) => 61 + i)) // 61-70
      .filter((num) => ![64, 67].includes(num)), // however 64 and 67 are missing
    zhipiCount: 754,
    description: [
      {
        source: 'Wikipedia',
        content: [
          '内六十四、六十七两回系武裕庵从他本补抄，时间约在嘉庆年间', 
          '己卯本中避讳“祥”字、“晓”字，基本可以确认为怡亲王允祥、弘晓父子之家人抄写，是《红楼梦》抄本中唯一可以确认抄手的一个',
        ],
      },
    ],
  },

  {
    version: '庚辰本',
    names: ['秋脂砚斋四阅评本', '庚辰秋定本'],
    year: 1760,
    chapterCount: 78,
    chapters: Array.from({ length: 80 }, (_, i) => 1 + i) // 1-80
      .filter((num) => ![64, 67].includes(num)), // excluding 64 and 67
    zhipiCount: 2319,
    description: [
      {
        source: 'Wikipedia',
        content: ['此本前十回无脂评'],
      },
      {
        source: '胡适',
        content: [
          '第十七回首叶有批云：“此回宜分二回方妥。”',
          '第七册首叶有批云：“内缺六十四、六十七两回。”',
          '六十四与六十七回全缺，二十二回不全，有批语说，“此回未成而芹逝矣”。',
        ],
      },
    ],
  },

  {
    version: '戚本',
    names: ['戚序本', '戚正本', '戚张本', '戚宁本', '立松轩本'],
    year: undefined,
    chapterCount: 80,
    chapters: Array.from({ length: 80 }, (_, i) => 1 + i), // 1-80
    description: [
      {
        source: 'Wikipedia',
        content: [
          '戚本完全未提及脂砚斋，所有相关的署名被删去，且其中夹杂了许多后人的批语',
          '戚本将原合为一回的十七、十八回分断',
          '脂本中的一些“污言秽语”在戚本中得到了修改',
        ],
      },
    ],
  },

  {
    version: '梦觉本',
    names: ['梦觉主人序本', '脂晋本', '甲辰梦序抄本', '红楼梦'],
    year: 1784,
    chapterCount: 80,
    chapters: Array.from({ length: 80 }, (_, i) => 1 + i), // 1-80
    description: [
      {
        source: 'Wikipedia',
        content: [
          '删节。对某些情节，删得一字不留',
          '简化。对于铺叙描写往往作简化处理，缩为几个字的简短说明',
          '脂批不普遍，也较简略。',
        ],
      },
    ],
  },

  {
    version: '程甲本',
    names: ['新镌全部绣像红楼梦', '绣像红楼梦'],
    year: 1791,
    chapterCount: 120,
    chapters: Array.from({ length: 120 }, (_, i) => 1 + i), // 1-120
    description: [
      {
        source: 'Wikipedia',
        content: [
          '这是中国古典名著《红楼梦》首次以活字印刷版出现，也是首次以120回全貌面世，意义重大。',
        ],
      },
      {
        source: '胡适',
        content: ['此本是后来南方各种雕刻本、铅印本、石印本的祖本。'],
      },
      {
        source: '程伟元',
        content: [
          '《红楼梦》小说本名《石头记》，作者相传不一，究未知出自何人，惟书内记雪芹曹先生删改数过。',
          '好事者每传抄一部，置庙市中，昂其值得数十金，可谓不胫而走者矣。然原目一百廿卷，今所传只八十卷，殊非全本。',
          '爰为竭力收罗，自藏书家甚至故纸堆中无不留心，数年以来，仅积有廿余卷。',
          '一日偶于鼓担上得十余卷，遂重价购之，欣然翻阅，见其前后起伏，尚属接笋，然漶漫不可收拾。',
        ],
      },
      {
        source: '高鹗',
        content: [
          '予以是书虽稗官野史之流，然尚不谬于名教，欣然拜诺，正以波斯奴见宝为幸，题襄其役。工既竣，并识端末，以告阅者。',
        ],
      },
    ],
  },

  {
    version: '程乙本',
    names: ['新镌全部绣像红楼梦', '绣像红楼梦'],
    year: 1792,
    chapterCount: 120,
    chapters: Array.from({ length: 120 }, (_, i) => 1 + i), // 1-120
    description: [
      {
        source: '程伟元 高鹗',
        content: [
          '是书前八十回，藏书家抄录传阅几三十年矣，今得后四十回合成完璧。',
          '绿友人借抄，争观者甚伙，抄录固难，刊板亦需时日，姑集活字刷印。',
          '因急欲公诸同好，故初印时不及细校，间有纰缪。今复聚集各原本详加校阅，改订无讹。惟识者谅之。',
          '是书沿传既久，坊间缮本及诸家所藏秘稿，繁简歧出，前后错见。即如六十七回，此有彼无，题同文异，燕石莫辨。兹惟择其情理较协者，取为定本。',
          '书中后四十回系就历年所得，集腋成裘，更无他本可考。惟按其前后关照者，略为修辑，使其有应接而无矛盾',
        ],
      },
    ],
  },
];

// To group numbers into rows of max 10 numbers or when non-consecutive
// Useful when display chapter numbers
export const groupNumbers = (arr: number[]) => {
  const rows = [];
  let currentRow = [];

  for (let i = 0; i < arr.length; i++) {
    currentRow.push(arr[i]);

    const shouldBreak = 
      currentRow.length === 10 || 
      (i < arr.length - 1 && arr[i] !== arr[i + 1] - 1);

    if (shouldBreak) {
      rows.push([...currentRow]);
      currentRow = [];
    }
  }

  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  return rows;
};

