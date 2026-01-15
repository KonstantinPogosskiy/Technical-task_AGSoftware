import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vacancy } from '../vacancies/entities/vacancy.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectModel(Vacancy)
    private vacancyModel: typeof Vacancy,
  ) {}

  async onModuleInit() {
    setTimeout(async () => {
      await this.seedVacancies();
    }, 1000);
  }

  async seedVacancies() {
    try {
      const count = await this.vacancyModel.count();
    
    if (count === 0) {
      const vacancies = [
        {
          profession: 'Frontend разработчик',
          firm_name: 'LTD "TechnoSoft"',
          payment_from: 4000,
          payment_to: 6000,
          currency: 'USD',
          type_of_work: 'Полный рабочий день',
          town: 'New York',
          vacancyRichText: '<p><strong>Обязанности:</strong></p><ul><li>Разработка пользовательских интерфейсов на React/Vue/Angular</li><li>Верстка адаптивных и кросс-браузерных компонентов</li><li>Интеграция с REST API и управление состоянием приложения</li><li>Оптимизация производительности и SEO веб-приложений</li><li>Тестирование и поддержка клиентской части продукта</li></ul><p><strong>Требования:</strong></p><ul><li>Опыт работы с React/Vue не менее 2 лет</li><li>Знание TypeScript</li><li>Опыт работы с Redux/MobX</li><li>Знание HTML/CSS, адаптивная верстка</li></ul><p><strong>Условия:</strong></p><ul><li>Официальное трудоустройство</li><li>Гибкий график</li><li>Возможность удаленной работы</li><li>Офис в центре Москвы</li></ul>',
        },
        {
          profession: 'Backend разработчик (Node.js)',
          firm_name: 'IT Solutions',
          payment_from: 5000,
          payment_to: 7000,
          currency: 'BYN',
          type_of_work: 'Полный рабочий день',
          town: 'Минск',
          vacancyRichText: '<p><strong>Обязанности:</strong></p><ul><li>Разработка серверной логики и REST API на Node.js</li><li>Проектирование и оптимизация баз данных (PostgreSQL/MongoDB)</li><li>Интеграция с внешними сервисами и микросервисная архитектура</li><li>Обеспечение безопасности, производительности и масштабируемости</li><li>Написание unit-тестов и документации к API</li></ul><p><strong>Требования:</strong></p><ul><li>Опыт разработки на Node.js не менее 3 лет</li><li>Знание Nest.js или Express</li><li>Опыт работы с PostgreSQL/MongoDB</li><li>Знание Docker, Kubernetes</li></ul><p><strong>Условия:</strong></p><ul><li>Стабильная зарплата</li><li>Обучение за счет компании</li><li>Медицинская страховка</li><li>Комфортный офис</li></ul>',
        },
        {
          profession: 'Full Stack разработчик',
          firm_name: 'Digital Agency',
          payment_from: 120000,
          payment_to: 200000,
          currency: 'RUB',
          type_of_work: 'Удаленная работа',
          town: 'Москва',
          vacancyRichText: '<p><strong>Обязанности:</strong></p><ul><li>Разработка клиентской и серверной части веб-приложений</li><li>Проектирование архитектуры и взаимодействия frontend и backend</li><li>Создание REST API и интеграция с внешними сервисами</li><li>Оптимизация производительности и обеспечение безопасности приложений</li><li>Ведение проекта от концепции до запуска и поддержки</li></ul><p><strong>Требования:</strong></p><ul><li>Опыт Full Stack разработки не менее 3 лет</li><li>React/Next.js на frontend</li><li>Node.js/Python на backend</li><li>Опыт работы с облачными сервисами (AWS, Azure)</li></ul><p><strong>Условия:</strong></p><ul><li>Полностью удаленная работа</li><li>Гибкий график</li><li>Проектная работа</li><li>Оплата по результатам</li></ul>',
        },
        {
          profession: 'UI/UX дизайнер',
          firm_name: 'Creative Studio',
          payment_from: 7000,
          payment_to: 8000,
          currency: 'BYN',
          type_of_work: 'Частичная занятость',
          town: 'Гомель',
          vacancyRichText: '<p><strong>Обязанности:</strong></p><ul><li>Разработка дизайн-макетов для наружной, интерьерной рекламы, полиграфии, сувенирной продукции.</li><li>Подготовка и вёрстка макетов в CorelDraw, Adobe photoshop.</li><li>Создание дизайна логотипов и брендбуков</li><li>Управленческая функция: обучение, адаптация дизайнеров, их контроль, оценка</li></ul><p><strong>Требования:</strong></p><ul><li>Опыт UI/UX дизайна не менее 2 лет</li><li>Знание Figma, Adobe XD</li><li>Портфолио с примерами работ</li><li>Понимание принципов UX</li></ul><p><strong>Условия:</strong></p><ul><li>Частичная занятость</li><li>Удаленная работа</li><li>Интересные проекты</li><li>Творческая атмосфера</li></ul>',
        },
        {
          profession: 'DevOps инженер',
          firm_name: 'Cloud Technologies',
          payment_from: 150000,
          payment_to: 250000,
          currency: 'RUB',
          type_of_work: 'Полный рабочий день',
          town: 'Москва',
          vacancyRichText: '<p><strong>Обязанности:</strong></p><ul><li>Разработка и поддержка CI/CD процессов для автоматизации сборки, тестирования и развертывания</li><li>Настройка и управление инфраструктурой в облачных сервисах (AWS/Azure/GCP)</li><li>Конфигурация и администрирование контейнерных сред (Docker, Kubernetes)</li><li>Автоматизация инфраструктуры с использованием Terraform/Ansible</li><li>Мониторинг и обеспечение безопасности, доступности сервисов</li></ul><p><strong>Требования:</strong></p><ul><li>Опыт работы с Docker, Kubernetes</li><li>Знание CI/CD (GitLab CI, Jenkins)</li><li>Опыт работы с облачными платформами</li><li>Знание Linux, Bash</li></ul><p><strong>Условия:</strong></p><ul><li>Высокая зарплата</li><li>Премии и бонусы</li><li>Корпоративные мероприятия</li><li>Профессиональный рост</li></ul>',
        },
      ];

      await this.vacancyModel.bulkCreate(vacancies);
      console.log('Моковые вакансии успешно созданы');
    }
    } catch (error) {
      console.error('Ошибка при создании моковых вакансий:', error);
    }
  }
}
