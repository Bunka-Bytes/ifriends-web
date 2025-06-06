import { useTranslation } from 'react-i18next'

export const RULES_USER_NAME = () => {
  const { t } = useTranslation()
  return [
    {
      whitespace: true,
      message: t('rules-user-name-whitespace'),
    },
    {
      required: true,
      message: t('rules-user-name-required'),
    },
    {
      pattern: /^[A-zÀ-ú0-9\s]+$/,
      message: t('rules-user-name-pattern'),
    },
  ]
}

export const RULES_USER_EMAIL = () => {
  const { t } = useTranslation()

  return [
    {
      required: true,
      message: t('rules-user-email-required'),
    },
    {
      pattern: /^[^@]+$/,
      message: t('rules-user-email-pattern'),
    },
  ]
}

export const RULES_USER_PASSWORD = (required = true) => {
  const { t } = useTranslation()

  return [
    required && {
      required: true,
      message: t('rules-user-password-require'),
    },
    {
      pattern:
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*?\-+_~])[0-9a-zA-Z!@#$%^&*?+_\-~]{6,12}$/,
      message: t('rules-user-password-pattern'),
    },
  ]
}

export const RULES_USER_CURSO = (required = true) => {
  const { t } = useTranslation()

  return [
    required && {
      required: true,
      message: t('rules-user-course-require'),
    },
  ]
}

export const RULES_USER_YEAR = () => {
  const { t } = useTranslation()

  return [
    {
      required: true,
      message: t('rules-user-year-require'),
    },
  ]
}

export const RULES_USER_AGREEMENT = () => {
  const { t } = useTranslation()

  return [
    {
      validator: (_, value) =>
        value
          ? Promise.resolve()
          : Promise.reject(new Error(t('rules-user-user-agreement'))),
    },
  ]
}

export const RULES_PASSWORD_CONFIRM = (required = true) => {
  const { t } = useTranslation()

  return [
    required && {
      required: true,
      message: t('input-password-confirm-required'),
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('senha') === value) {
          return Promise.resolve()
        }
        return Promise.reject(new Error(t('input-password-confirm-not-match')))
      },
    }),
  ]
}
