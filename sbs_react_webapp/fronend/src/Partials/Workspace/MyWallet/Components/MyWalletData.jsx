import { bill, education, utility, shopping } from "./RecentTransactionChart"
export const RecentTransaction = [
    {
        icon: 'fa fa-cc-mastercard',
        theme_color: 'theme-text-color1',
        title: 'Bill',
        value: '$2,500.00',
        options: bill,
        series: bill.series
    },
    {
        icon: 'fa fa-graduation-cap',
        theme_color: 'theme-text-color2',
        title: 'Education',
        value: '$22,300.00',
        options: education,
        series: education.series
    },
    {
        icon: 'fa fa-cc-mastercard',
        theme_color: 'theme-text-color3',
        title: 'Utility',
        value: '$730.00',
        options: utility,
        series: utility.series
    },
    {
        icon: 'fa fa-shopping-basket',
        theme_color: 'theme-text-color4',
        title: 'Shopping',
        value: '$5,500.00',
        options: shopping,
        series: shopping.series
    }
]

export const TableData = [
    {
        description: 'Gas Bill Payment',
        status: 'Your order is successful',
        price: '$500.00',
        order_no: 'B-123123',
        time: '22 5:08 pm',
        order_total: '$500.00'
    },
    {
        description: 'Add money to wallet',
        status: 'Successful',
        price: '$1000.00',
        order_no: 'M-123123',
        time: '22 5:08 pm',
        order_total: '$1000.00'
    },
    {
        description: 'Book move - Minions',
        status: 'Booking Confirmed',
        price: '$46.00',
        order_no: 'A-123123',
        time: '22 5:08 pm',
        order_total: '$46.00'
    },
    {
        description: 'Recharge of Jio Mobile',
        status: 'Recharge successful',
        price: '$99.90',
        order_no: 'R-123123',
        time: '22 5:08 pm',
        order_total: '$99.90'
    },
    {
        description: 'Paid for bvite Pharmacy',
        status: 'Your order is successful',
        price: '$122.00',
        order_no: 'B-123123',
        time: '22 5:08 pm',
        order_total: '$122.00'
    },
    {
        description: 'Gas Bill Payment',
        status: 'Your order is successful',
        price: '$500.00',
        order_no: 'B-123125',
        time: '22 5:08 pm',
        order_total: '$500.00'
    },
    {
        description: 'Add money to wallet',
        status: 'Successful',
        price: '$1000.00',
        order_no: 'B-123126',
        time: '22 5:08 pm',
        order_total: '$1000.00'
    },
    {
        description: 'Book move - Minions',
        status: 'Booking Confirmed',
        price: '$46.00',
        order_no: 'E-123124',
        time: '22 5:08 pm',
        order_total: '$46.00'
    },
    {
        description: 'Recharge of Jio Mobile',
        status: 'Recharge successful',
        price: '$99.90',
        order_no: 'R-123225',
        time: '22 5:08 pm',
        order_total: '$99.90'
    },
    {
        description: 'Paid for bvite Pharmacy',
        status: 'Your order is successful',
        price: '$122.00',
        order_no: 'B-123124',
        time: '22 5:08 pm',
        order_total: '$122.00'
    },

]