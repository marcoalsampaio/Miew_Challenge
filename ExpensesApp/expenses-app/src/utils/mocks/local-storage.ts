import { TransactionInterface, UserInterface } from "../models"
import userImage from '../../assets/user_image.jpg'


export default function LocalStorageService() {

    const setTransaction = (transactions: TransactionInterface[], accountBalance: string) => {
        console.log(accountBalance);
        localStorage.setItem('balance', accountBalance)
        localStorage.setItem('transactions', JSON.stringify([...transactions]))
    }

    const getTransactions = (): TransactionInterface[] => {

        const localTransactions = localStorage.getItem('transactions');

        if (localTransactions) {
            return JSON.parse(localStorage.getItem('transactions')!).map((item: any) => ({
                uuid: item.uuid,
                value: Number(item.value),
                name: item.name,
                type: item.type,
                date: new Date(item.date)
            }));
        } else {
            return [];
        }
    }

    const getLast5Transactions = (): TransactionInterface[] => {
        const transactionsList = getTransactions();

        if (transactionsList.length === 0) return [];
        return transactionsList
            .sort((a, b) => b.date.getTime() - a.date.getTime()) // Sort by date, most recent first
            .slice(0, 5);

    }


    const getBalance = () => {
        return Number(localStorage.getItem('balance'));
    }

    const getUser = () => {
        const user: UserInterface = {
            name: "Silvestre Maia",
            email: "silmaia@gmail.com",
            image: userImage
        }

        return user;
    }

    return { setTransaction, getTransactions, getBalance, getUser, getLast5Transactions}
}