interface RulesInterface {
  required: boolean;
  message: string;
}

export const rulesInput = {
  required: (message = 'Обязательное поле'): RulesInterface => ({
    required: true,
    message,
  }),
};
