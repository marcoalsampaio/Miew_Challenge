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

    const getFilteredTransactions = (type: string, value: string) =>{
        const transactionsList = getTransactions();

        if (transactionsList.length === 0) return [];
       
        return filterByDate(transactionsList, value);
    }


    const filterByDate = (list: TransactionInterface[], value: string) => {
        return list.sort((a, b) => {
            if (value === 'NEW') {
                // Sort by newest first (descending)
                return b.date.getTime() - a.date.getTime();
            } else if (value === 'OLD') {
                // Sort by oldest first (ascending)
                return a.date.getTime() - b.date.getTime();
            }
            return 0; // No sorting if the value is neither 'NEW' nor 'OLD'
        });
    };
    

    return { setTransaction, getTransactions, getBalance, getUser, getLast5Transactions, getFilteredTransactions}
}