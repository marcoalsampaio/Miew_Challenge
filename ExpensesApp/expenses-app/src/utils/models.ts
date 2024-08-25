interface TransactionInterface {
    uuid: string
    value: number
    name: string
    type: 'ADD' | 'SUB'
    date: Date
    
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

export type {TransactionInterface, UserInterface, OptionInterface};