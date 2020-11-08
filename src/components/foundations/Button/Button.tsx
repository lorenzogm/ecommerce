import { MouseEvent, ReactElement, ReactNode } from 'react'
import classnames from 'classnames'

type ButtonProps = {
  children: ReactNode
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  variant?: 'primary'
  disabled?: boolean
}

export default function Button({
  children,
  onClick,
  variant,
  disabled,
}: ButtonProps): ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={classnames(
        'flex items-center py-2 text-sm uppercase font-medium rounded focus:outline-none',
        {
          'text-white': !variant,
          'bg-yellow-500 hover:bg-yellow-600 focus:bg-yellow-500 px-3 text-black':
            variant === 'primary',
        },
      )}
    >
      {children}
    </button>
  )
}
