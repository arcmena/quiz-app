export type TSubmission = {
  id: string
  currentQuestionId: string
  isFinished: boolean
  quiz: TQuiz
}

export type TQuiz = {
  id: string
  createdAt: string
  title: string
  description: string
  slug: string
  questions: [TQuestion]
}

export type TQuestion = {
  id: string
  createdAt: string
  text: string
  answers: [TAnswers]
}

export type TAnswers = {
  id: string
  createdAt: string
  text: string
  isCorrectAnswer: boolean
}
