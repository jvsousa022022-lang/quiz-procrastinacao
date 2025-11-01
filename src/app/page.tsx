'use client';

import { useState } from 'react';
import { Check, Star, Clock, Users, ArrowRight, Gift, Target, Zap, Brain, Trophy, Heart } from 'lucide-react';

type QuizStep = 'home' | 'quiz' | 'result' | 'offer' | 'challenge';
type ProfileType = 'executor' | 'planejador' | 'cronico';

interface Question {
  id: number;
  question: string;
  options: { text: string; points: number }[];
}

export default function ProcrastinationQuiz() {
  const [currentStep, setCurrentStep] = useState<QuizStep>('home');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [profile, setProfile] = useState<ProfileType>('executor');
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  const questions: Question[] = [
    {
      id: 1,
      question: "Quando você tem uma tarefa importante, o que faz primeiro?",
      options: [
        { text: "Começo logo pra me livrar", points: 1 },
        { text: "Penso e planejo um pouco", points: 2 },
        { text: "Espero 'o momento certo'", points: 3 },
        { text: "Deixo pra depois (sempre dá tempo)", points: 4 }
      ]
    },
    {
      id: 2,
      question: "Como você se sente quando tem prazos apertados?",
      options: [
        { text: "Energizado e focado", points: 1 },
        { text: "Um pouco ansioso, mas consigo", points: 2 },
        { text: "Estressado, mas funciono sob pressão", points: 3 },
        { text: "Entro em pânico e paraliso", points: 4 }
      ]
    },
    {
      id: 3,
      question: "Qual sua relação com listas de tarefas?",
      options: [
        { text: "Faço e sigo religiosamente", points: 1 },
        { text: "Faço, mas às vezes ignoro", points: 2 },
        { text: "Faço várias, mas raramente sigo", points: 3 },
        { text: "Que lista? Vou na intuição", points: 4 }
      ]
    },
    {
      id: 4,
      question: "Quando surge uma tarefa chata, você:",
      options: [
        { text: "Faz logo para se livrar", points: 1 },
        { text: "Intercala com coisas prazerosas", points: 2 },
        { text: "Adia até não ter mais escolha", points: 3 },
        { text: "Espera alguém fazer por você", points: 4 }
      ]
    },
    {
      id: 5,
      question: "Como você lida com distrações (redes sociais, TV)?",
      options: [
        { text: "Tenho autocontrole total", points: 1 },
        { text: "Me distraio, mas volco ao foco", points: 2 },
        { text: "Perco muito tempo, mas termino", points: 3 },
        { text: "Sou refém das distrações", points: 4 }
      ]
    },
    {
      id: 6,
      question: "Sua mesa de trabalho geralmente está:",
      options: [
        { text: "Sempre organizada", points: 1 },
        { text: "Organizada na maioria das vezes", points: 2 },
        { text: "Bagunçada, mas sei onde está tudo", points: 3 },
        { text: "Um caos total", points: 4 }
      ]
    },
    {
      id: 7,
      question: "Quando alguém pede algo urgente, você:",
      options: [
        { text: "Para tudo e faz na hora", points: 1 },
        { text: "Reorganiza a agenda e faz", points: 2 },
        { text: "Promete fazer, mas demora", points: 3 },
        { text: "Esquece ou faz pela metade", points: 4 }
      ]
    },
    {
      id: 8,
      question: "Sua relação com exercícios físicos é:",
      options: [
        { text: "Rotina fixa e consistente", points: 1 },
        { text: "Faço regularmente, com pausas", points: 2 },
        { text: "Começo empolgado, depois paro", points: 3 },
        { text: "Sempre planejo, nunca faço", points: 4 }
      ]
    },
    {
      id: 9,
      question: "Como você se prepara para reuniões importantes?",
      options: [
        { text: "Sempre com antecedência", points: 1 },
        { text: "Um dia antes, no mínimo", points: 2 },
        { text: "Algumas horas antes", points: 3 },
        { text: "Improviso na hora", points: 4 }
      ]
    },
    {
      id: 10,
      question: "Quando você erra ou falha em algo:",
      options: [
        { text: "Analiso e melhoro rapidamente", points: 1 },
        { text: "Fico chateado, mas sigo em frente", points: 2 },
        { text: "Fico ruminando por dias", points: 3 },
        { text: "Desisto e evito tentar de novo", points: 4 }
      ]
    },
    {
      id: 11,
      question: "Sua rotina matinal é:",
      options: [
        { text: "Estruturada e produtiva", points: 1 },
        { text: "Organizada, mas flexível", points: 2 },
        { text: "Caótica, mas funciona", points: 3 },
        { text: "Inexistente - acordo correndo", points: 4 }
      ]
    },
    {
      id: 12,
      question: "Como você lida com projetos grandes?",
      options: [
        { text: "Divido em etapas pequenas", points: 1 },
        { text: "Faço um plano geral", points: 2 },
        { text: "Começo sem plano definido", points: 3 },
        { text: "Fico paralisado pelo tamanho", points: 4 }
      ]
    },
    {
      id: 13,
      question: "Quando você promete algo para alguém:",
      options: [
        { text: "Sempre cumpro no prazo", points: 1 },
        { text: "Geralmente cumpro", points: 2 },
        { text: "Cumpro, mas atrasado", points: 3 },
        { text: "Frequentemente esqueço", points: 4 }
      ]
    },
    {
      id: 14,
      question: "Sua relação com dinheiro/finanças é:",
      options: [
        { text: "Organizada e planejada", points: 1 },
        { text: "Controlo, mas poderia melhorar", points: 2 },
        { text: "Desorganizada, mas me viro", points: 3 },
        { text: "Caótica - vivo no vermelho", points: 4 }
      ]
    },
    {
      id: 15,
      question: "Como você se sente ao final de um dia produtivo?",
      options: [
        { text: "Realizado e energizado", points: 1 },
        { text: "Satisfeito e tranquilo", points: 2 },
        { text: "Aliviado por ter terminado", points: 3 },
        { text: "Que dia produtivo?", points: 4 }
      ]
    },
    {
      id: 16,
      question: "Quando você tem uma ideia nova:",
      options: [
        { text: "Anoto e planejo como executar", points: 1 },
        { text: "Pesquiso um pouco sobre ela", points: 2 },
        { text: "Fico empolgado, mas não faço nada", points: 3 },
        { text: "Esqueço em poucos dias", points: 4 }
      ]
    },
    {
      id: 17,
      question: "Sua relação com cursos online/livros é:",
      options: [
        { text: "Termino tudo que começo", points: 1 },
        { text: "Termino a maioria", points: 2 },
        { text: "Começo vários, termino poucos", points: 3 },
        { text: "Coleciono cursos não terminados", points: 4 }
      ]
    },
    {
      id: 18,
      question: "Como você reage a mudanças inesperadas?",
      options: [
        { text: "Me adapto rapidamente", points: 1 },
        { text: "Demoro um pouco, mas me adapto", points: 2 },
        { text: "Fico estressado, mas aceito", points: 3 },
        { text: "Resisto e evito mudanças", points: 4 }
      ]
    },
    {
      id: 19,
      question: "Quando você está sem motivação:",
      options: [
        { text: "Faço mesmo assim", points: 1 },
        { text: "Procuro formas de me motivar", points: 2 },
        { text: "Espero a motivação voltar", points: 3 },
        { text: "Paro tudo até me sentir melhor", points: 4 }
      ]
    },
    {
      id: 20,
      question: "Sua área de trabalho/estudo é:",
      options: [
        { text: "Sempre limpa e organizada", points: 1 },
        { text: "Organizada na maior parte do tempo", points: 2 },
        { text: "Organizo quando preciso", points: 3 },
        { text: "Vivo no caos organizado", points: 4 }
      ]
    },
    {
      id: 21,
      question: "Como você lida com críticas construtivas?",
      options: [
        { text: "Aceito e melhoro imediatamente", points: 1 },
        { text: "Reflito e aplico as sugestões", points: 2 },
        { text: "Fico na defensiva, mas considero", points: 3 },
        { text: "Levo para o pessoal", points: 4 }
      ]
    },
    {
      id: 22,
      question: "Sua relação com metas de longo prazo é:",
      options: [
        { text: "Defino e trabalho consistentemente", points: 1 },
        { text: "Defino e reviso periodicamente", points: 2 },
        { text: "Defino, mas perco o foco", points: 3 },
        { text: "Não costumo definir metas", points: 4 }
      ]
    },
    {
      id: 23,
      question: "Quando você se compromete com algo:",
      options: [
        { text: "É sagrado - sempre cumpro", points: 1 },
        { text: "Levo a sério e raramente falho", points: 2 },
        { text: "Tento cumprir, mas às vezes falho", points: 3 },
        { text: "Prometo mais do que posso cumprir", points: 4 }
      ]
    },
    {
      id: 24,
      question: "Como você se sente sobre sua produtividade atual?",
      options: [
        { text: "Muito satisfeito", points: 1 },
        { text: "Satisfeito, mas posso melhorar", points: 2 },
        { text: "Insatisfeito - sei que posso mais", points: 3 },
        { text: "Frustrado - sinto que desperdiço tempo", points: 4 }
      ]
    },
    {
      id: 25,
      question: "Se pudesse mudar uma coisa em você, seria:",
      options: [
        { text: "Nada - estou no caminho certo", points: 1 },
        { text: "Ser mais consistente", points: 2 },
        { text: "Parar de procrastinar tanto", points: 3 },
        { text: "Ter mais disciplina e foco", points: 4 }
      ]
    }
  ];

  const motivationalPhrases = [
    "Você está a um passo da sua melhor versão! 🌟",
    "Cada resposta te aproxima da transformação! 🚀",
    "Conhecimento próprio é o primeiro passo! 🧠",
    "Você já está mudando só por estar aqui! ✨",
    "A jornada de mil milhas começa com um passo! 👣",
    "Sua dedicação já mostra quem você pode ser! 💪",
    "Autoconhecimento é o maior superpoder! 🦸‍♂️",
    "Você está investindo na pessoa mais importante: VOCÊ! ❤️"
  ];

  const profiles = {
    executor: {
      title: "🧩 O Executor",
      description: "Parabéns! Você tem uma relação saudável com a produtividade. Procrastina pouco e geralmente consegue manter o foco. Você já tem uma base sólida de disciplina.",
      tips: [
        "Continue mantendo sua rotina estruturada - ela é seu maior trunfo",
        "Experimente técnicas avançadas como timeboxing para otimizar ainda mais",
        "Ajude outros a desenvolverem disciplina - ensinar fortalece seus próprios hábitos"
      ]
    },
    planejador: {
      title: "🕒 O Planejador Enrolado",
      description: "Você sabe exatamente o que precisa fazer e até faz planos detalhados, mas na hora H trava na execução. Sua mente é organizada, mas a ação ainda é um desafio.",
      tips: [
        "Transforme seus planos em ações de 2 minutos - comece micro",
        "Use a regra dos 15 minutos: comprometa-se apenas com 15 min por tarefa",
        "Crie rituais de início - uma música, um local específico, um café especial"
      ]
    },
    cronico: {
      title: "🔥 O Procrastinador Crônico",
      description: "Você vive deixando tudo para depois e sabe que isso te prejudica. Não se culpe - a procrastinação é um hábito que pode ser mudado com as estratégias certas!",
      tips: [
        "Comece com a regra dos 2 minutos: se leva menos que isso, faça AGORA",
        "Elimine decisões: prepare tudo na noite anterior (roupa, café, materiais)",
        "Use o método Pomodoro: 25 min focado + 5 min pausa - pequenos blocos são menos assustadores"
      ]
    }
  };

  const challengeDays = [
    { day: 1, title: "Mapeamento da Procrastinação", description: "Identifique seus gatilhos e padrões", completed: false },
    { day: 2, title: "Rotina Matinal Anti-Procrastinação", description: "Crie uma manhã que gera momentum", completed: false },
    { day: 3, title: "Técnica dos 2 Minutos", description: "Se leva menos de 2 min, faça agora", completed: false },
    { day: 4, title: "Eliminação de Distrações", description: "Remova tentações do seu ambiente", completed: false },
    { day: 5, title: "Método Pomodoro", description: "25 min focado + 5 min pausa", completed: false },
    { day: 10, title: "Recompensas Inteligentes", description: "Sistema de incentivos que funciona", completed: false },
    { day: 15, title: "Mindset de Crescimento", description: "Mude sua relação com falhas", completed: false },
    { day: 20, title: "Energia e Foco", description: "Otimize corpo e mente para produtividade", completed: false },
    { day: 25, title: "Sistemas vs Metas", description: "Crie processos que geram resultados", completed: false },
    { day: 30, title: "Accountability Partner", description: "O poder da responsabilidade compartilhada", completed: false },
    { day: 35, title: "Revisão e Ajustes", description: "Analise seu progresso e otimize", completed: false },
    { day: 40, title: "Nova Identidade", description: "Celebre sua transformação completa", completed: false }
  ];

  const handleAnswerSelect = (points: number) => {
    const newAnswers = [...answers, points];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calcular resultado final
      const total = newAnswers.reduce((sum, score) => sum + score, 0);
      setTotalScore(total);
      
      // Determinar perfil baseado na pontuação
      if (total <= 40) {
        setProfile('executor');
      } else if (total <= 70) {
        setProfile('planejador');
      } else {
        setProfile('cronico');
      }
      
      setCurrentStep('result');
    }
  };

  const handlePayment = () => {
    if (email) {
      setShowSuccess(true);
      setCurrentStep('challenge');
    }
  };

  const completeDay = (day: number) => {
    if (!completedDays.includes(day)) {
      setCompletedDays([...completedDays, day]);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-emerald-100">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              🎉 Bem-vindo ao Desafio!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Parabéns! Você acabou de dar o primeiro passo para eliminar a procrastinação da sua vida.
            </p>
            <div className="bg-emerald-50 rounded-2xl p-6 mb-6">
              <h3 className="font-semibold text-emerald-800 mb-3">O que acontece agora:</h3>
              <ul className="text-left space-y-2 text-emerald-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Plano completo de 40 dias enviado para seu email
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Acesso ao grupo exclusivo de apoio
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Checklist diário de progresso
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Mensagens motivacionais diárias
                </li>
              </ul>
            </div>
            <button
              onClick={() => setCurrentStep('challenge')}
              className="bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-emerald-700 transition-all duration-300"
            >
              Começar Desafio Agora
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'challenge') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                🚀 Desafio 40 Dias - Adeus Procrastinação
              </h1>
              <p className="text-gray-600">
                Dia {currentDay} de 40 • {completedDays.length} dias concluídos
              </p>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(completedDays.length / 40) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Current Day Challenge */}
            <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border border-blue-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {currentDay}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {challengeDays.find(d => d.day === currentDay)?.title}
                  </h2>
                  <p className="text-gray-600">
                    {challengeDays.find(d => d.day === currentDay)?.description}
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                <h3 className="font-semibold text-blue-800 mb-3">Desafio de Hoje:</h3>
                <p className="text-blue-700 mb-4">
                  {currentDay === 1 && "Anote 3 situações onde você procrastina mais. Identifique o que você sente antes de procrastinar (tédio, ansiedade, medo?). Esse é seu mapa da procrastinação."}
                  {currentDay === 2 && "Crie uma rotina matinal de 30 minutos que te dê energia. Inclua: 1 copo d'água, 5 min de alongamento, e definir a tarefa mais importante do dia."}
                  {currentDay === 3 && "Toda vez que pensar em uma tarefa hoje, pergunte: 'Isso leva menos de 2 minutos?' Se sim, faça IMEDIATAMENTE. Sem exceções."}
                </p>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => completeDay(currentDay)}
                    disabled={completedDays.includes(currentDay)}
                    className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                      completedDays.includes(currentDay)
                        ? 'bg-green-100 text-green-700 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {completedDays.includes(currentDay) ? '✅ Concluído' : 'Marcar como Concluído'}
                  </button>
                  
                  {currentDay < 40 && (
                    <button
                      onClick={() => setCurrentDay(currentDay + 1)}
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-300"
                    >
                      Próximo Dia →
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {challengeDays.map((day) => (
                <div
                  key={day.day}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    completedDays.includes(day.day)
                      ? 'bg-green-50 border-green-200'
                      : day.day === currentDay
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setCurrentDay(day.day)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      completedDays.includes(day.day)
                        ? 'bg-green-600 text-white'
                        : day.day === currentDay
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {completedDays.includes(day.day) ? '✓' : day.day}
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      Dia {day.day}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-1">
                    {day.title}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {day.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'offer') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Pronto para mudar de verdade?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Participe do <strong>Desafio dos 40 Dias Sem Procrastinação</strong> — um programa prático com tarefas diárias para criar foco, disciplina e consistência.
              </p>
              <p className="text-gray-600">
                Em apenas 40 dias, você pode transformar sua rotina e parar de adiar seus sonhos.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
              <h3 className="font-bold text-gray-800 mb-4">🎁 O que você recebe:</h3>
              <ul className="space-y-3">
                {[
                  "Plano diário guiado de 40 dias (um mini-desafio por dia)",
                  "Checklist de progresso personalizado",
                  "Mensagens motivacionais diárias",
                  "Relatório final de progresso",
                  "Acesso ao grupo exclusivo de apoio",
                  "Garantia de 7 dias - se não gostar, devolvemos seu dinheiro"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Zap className="w-4 h-4" />
                Oferta especial por tempo limitado
              </div>
              
              {/* Preço cortado */}
              <div className="mb-2">
                <span className="text-2xl text-gray-400 line-through mr-3">R$ 35,00</span>
                <span className="text-4xl font-bold text-blue-600">R$ 5,90</span>
              </div>
              <div className="text-sm text-gray-500">Menos que um café por dia</div>
            </div>

            <div className="space-y-4 mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor email para receber o material"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <button
              onClick={handlePayment}
              disabled={!email}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
            >
              <span>Desbloquear Desafio de 40 Dias - R$ 5,90</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              🔒 Pagamento 100% seguro • ⏰ Acesso imediato • 🎯 Garantia de 7 dias
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'result') {
    const currentProfile = profiles[profile];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="max-w-3xl mx-auto py-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">
                {profile === 'executor' && '🧩'}
                {profile === 'planejador' && '🕒'}
                {profile === 'cronico' && '🔥'}
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {currentProfile.title}
              </h2>
              <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {currentProfile.description}
                </p>
              </div>
              <div className="text-sm text-gray-500 mb-6">
                Sua pontuação: {totalScore} de 100 pontos
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                💡 3 Dicas Práticas Gratuitas:
              </h3>
              <div className="space-y-4">
                {currentProfile.tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-6">
                Essas dicas são apenas o começo. Quer um plano completo para eliminar a procrastinação de vez?
              </p>
              <button
                onClick={() => setCurrentStep('offer')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 mx-auto text-lg shadow-lg"
              >
                <Target className="w-5 h-5" />
                <span>Ver Desafio Completo de 40 Dias</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'quiz') {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="max-w-2xl mx-auto py-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Pergunta {currentQuestion + 1} de {questions.length}
              </span>
              <span className="text-sm font-medium text-blue-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Motivational Phrase */}
          {currentQuestion % 3 === 0 && currentQuestion > 0 && (
            <div className="text-center mb-6">
              <p className="text-blue-600 font-medium">
                {motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)]}
              </p>
            </div>
          )}

          {/* Question Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 leading-relaxed">
                {question.question}
              </h2>
            </div>

            <div className="space-y-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option.points)}
                  className="w-full p-4 text-left bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-xl transition-all duration-300 hover:shadow-md group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white border-2 border-gray-300 group-hover:border-blue-500 rounded-full flex items-center justify-center text-sm font-bold text-gray-600 group-hover:text-blue-600">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-800 font-medium">
                      {option.text}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Home Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Brain className="w-4 h-4" />
              Descubra seu perfil em 5 minutos
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              🚀 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Adeus, Procrastinação!
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Descubra por que você procrastina e como eliminar esse hábito em 40 dias.
            </p>

            <button
              onClick={() => setCurrentStep('quiz')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 mx-auto mb-6"
            >
              <span>Começar o Quiz</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-gray-500 text-sm">
              ⏱️ Leva só 5 minutos para mudar sua vida!
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Autoconhecimento
              </h3>
              <p className="text-gray-600">
                Entenda seus padrões de procrastinação e descubra o que realmente te impede de agir.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Plano Personalizado
              </h3>
              <p className="text-gray-600">
                Receba estratégias específicas para seu perfil e nível de procrastinação.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Transformação Real
              </h3>
              <p className="text-gray-600">
                40 dias de desafios práticos para criar disciplina e eliminar a procrastinação.
              </p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>+12.000 pessoas já fizeram o quiz</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-1">4.8/5 (2.847 avaliações)</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span>94% recomendam</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}