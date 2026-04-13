import { RecognitionResult, CategoriesResponse } from '@/types';

const mockArtifacts = [
  {
    id: 1,
    name: '三彩梳妆女坐俑',
    category: '唐代唐三彩陶器',
    description: '唐代三彩陶器精品，展现了唐代女性的妆容和服饰特点。俑人坐姿优雅，手持梳妆用具，面部表情生动，服饰色彩鲜艳，是唐三彩人物俑的代表作品。',
    similarity_percent: 92.5,
  },
  {
    id: 2,
    name: '三彩载乐骆驼俑',
    category: '唐代唐三彩陶器',
    description: '此俑塑造了一只昂首嘶鸣的骆驼，驼背上载着乐舞俑，展现了丝绸之路上的文化交流场景。造型生动，色彩绚丽，是唐代三彩艺术的杰作。',
    similarity_percent: 88.3,
  },
  {
    id: 3,
    name: '镶金兽首玛瑙杯',
    category: '唐代玉器',
    description: '唐代玉器珍品，以玛瑙为材，雕琢成兽首形杯，口沿镶金。造型独特，工艺精湛，体现了唐代玉器制作的高超技艺和外来文化的影响。',
    similarity_percent: 85.7,
  },
  {
    id: 4,
    name: '鎏金舞马衔杯纹银壶',
    category: '唐金银器',
    description: '唐代金银器代表作，壶身錾刻舞马纹饰，马匹口衔酒杯，姿态优美。此壶见证了唐玄宗时期舞马祝寿的盛况，具有极高的历史和艺术价值。',
    similarity_percent: 82.1,
  },
  {
    id: 5,
    name: '客使图',
    category: '唐代壁画',
    description: '唐代墓室壁画，描绘了外国使节朝见的场景。画面人物形象生动，服饰各异，反映了唐代对外交流的繁荣景象，是研究唐代外交史的重要资料。',
    similarity_percent: 78.9,
  },
];

export const mockRecognize = async (): Promise<RecognitionResult> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const randomIndex = Math.floor(Math.random() * 3);
  const isExactMatch = Math.random() > 0.5;

  if (isExactMatch) {
    return {
      code: 0,
      message: 'success',
      data: {
        status: 'exact_match',
        results: [mockArtifacts[randomIndex]],
      },
    };
  } else {
    return {
      code: 0,
      message: 'success',
      data: {
        status: 'candidates',
        results: mockArtifacts.slice(0, 5),
      },
    };
  }
};

export const mockGetCategories = async (): Promise<CategoriesResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    code: 0,
    data: ['唐代唐三彩陶器', '唐代壁画', '唐代玉器', '唐金银器'],
  };
};
