export const rulesInput = {
  required: (message: string = 'Обязательное поле') => ({
    required: true,
    message
  })
}