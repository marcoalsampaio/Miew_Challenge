interface TransactionInterface {
    uuid: string
    value: number
    name: string
    type: 'ADD' | 'SUB'
    date: Date
    createDate: Date
}

interface UserInterface {
    name: string
    email: string
    image: string
}


interface OptionInterface {
    value: string;
    name: string;
  }

interface ViewProps {
  setLoggedIn: (value: boolean) => void;
}

interface ExpensesModalProps {
  isOpen: boolean;
  closeModal: () => void;
  transactionToEdit?: TransactionInterface
  onSave: (value: TransactionInterface) => void;
  onEdit: (value: TransactionInterface, uuid: string) => void;
}

interface LoginProps {
  loggedIn: boolean;
  setLoggedIn: (value: boolean)=> void
}

export type {TransactionInterface, UserInterface, OptionInterface, ViewProps, ExpensesModalProps, LoginProps};
