import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  try {
    await prisma.workout.create({
      data: {
        title: 'Crossfit',
        backgroundImage: 'training-4.png',
        level: 'Professional',
        type: 'Crossfit',
        time: '80-100 min',
        gender: 'Everybody',
        caloriesNumber : 1200,
        description: 'Сложный комплекс упражнений для профессиональных атлетов на отработку показателей в классическом стиле.',
        demonstration: 'crossfit.mp4',
        price: 0,
        rating: 5,
        coachId: '',
        specialOffer: false,
      },
    });
    await prisma.workout.create({
      data: {
        title: 'Boxing',
        backgroundImage: 'training-3.png',
        level: 'Amateur',
        type: 'Boxing',
        time: '30-50 min',
        gender: 'Women',
        caloriesNumber : 2800,
        description: 'Тренировка на отработку правильных ударов, координации и оптимальной механики защитных движений.',
        demonstration: 'boxing.mp4',
        price: 1000,
        rating: 5,
        coachId: '',
        specialOffer: false,
      },
    });
    await prisma.workout.create({
      data: {
        title: 'Power',
        backgroundImage: 'training-1.png',
        level: 'Beginner',
        type: 'Crossfit',
        time: '50-80 min',
        gender: 'Women',
        caloriesNumber : 1800,
        description: 'Тренировка на отработку правильной техники работы с тяжелыми весами, укрепления мышц кора и спины.',
        demonstration: 'crossfit.mp4',
        price: 1200,
        rating: 4,
        coachId: '',
        specialOffer: false,
      },
    });
    await prisma.workout.create({
      data: {
        title: 'Run, Forrest, run',
        backgroundImage: 'training-2.png',
        level: 'Professional',
        type: 'Running',
        time: '80-100 min',
        gender: 'Men',
        caloriesNumber : 1500,
        description: 'Узнайте правильную технику бега, развивайте выносливость и откройте для себя все секреты длительных пробежек.',
        demonstration: 'crossfit.mp4',
        price: 1600,
        rating: 5,
        coachId: '',
        specialOffer: false,
      },
    });
    await prisma.workout.create({
      data: {
        title: 'Hatha',
        backgroundImage: 'promo-3.png',
        level: 'Beginner',
        type: 'Yoga',
        time: '30-50 min',
        gender: 'Women',
        caloriesNumber : 2350,
        description: 'Упражнения по хатха йоге, направленные на понижение нервной возбудимости и активацию процессов анаболизма.',
        demonstration: 'yoga.mp4',
        price: 1800,
        rating: 4,
        coachId: '',
        specialOffer: true,
      },
    });
    console.info('🤘️ Database was filled')

  } catch(err) {
    console.error(err);

    await prisma.$disconnect();

    process.exit(1);
  }
}

fillDb();
