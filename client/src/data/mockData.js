import { tokens } from "../theme";
/* Dữ liệu trong 12 tháng gần nhất của trung tâm đăng kiểm*/

export const mockLineData = [
    {
        id: "Xe đăng điểm",
        color: tokens("dark").greenAccent[500],
        data: [
            {
                x: "T6/22",
                y: 36,
            },
            {
                x: "T7/22",
                y: 216,
            },
            {
                x: "T8/22",
                y: 35,
            },
            {
                x: "T9/22",
                y: 236,
            },
            {
                x: "T10/22",
                y: 88,
            },
            {
                x: "T11/22",
                y: 232,
            },
            {
                x: "T12/22",
                y: 281,
            },
            {
                x: "T1/23",
                y: 1,
            },
            {
                x: "T2/23",
                y: 35,
            },
            {
                x: "T3/23",
                y: 14,
            },
            {
                x: "T4/23(dự báo)",
                y: 20,
            },
        ],
    },
];

export const mockPieData = [
    {
        id: "Xe khách",
        label: "Xe khách",
        value: 239,
        color: "hsl(104, 70%, 50%)",
    },
    {
        id: "Xe bán tải",
        label: "Xe bán tải",
        value: 170,
        color: "hsl(162, 70%, 50%)",
    },
    {
        id: "Xe tải",
        label: "Xe tải",
        value: 322,
        color: "hsl(291, 70%, 50%)",
    },
    {
        id: "Xe con",
        label: "Xe con",
        value: 503,
        color: "hsl(229, 70%, 50%)",
    },
    {
        id: "Xe chuyên dùng",
        label: "Xe chuyên dùng",
        value: 584,
        color: "hsl(344, 70%, 50%)",
    },
];

export const mockRegistry = [
    {
        ID: "01EDSA",
        center: "Trung tâm Hà Nội 1",
        date: "01/04/2023",
    },
    {
        ID: "01EDSA",
        center: "Trung tâm Hà Nội 1",
        date: "01/04/2023",
    },
    {
        ID: "01EDSA",
        center: "Trung tâm Hà Nội 1",
        date: "01/04/2023",
    },
    {
        ID: "01EDSA",
        center: "Trung tâm Hà Nội 1",
        date: "01/04/2023",
    },
    {
        ID: "01EDSA",
        center: "Trung tâm Hà Nội 1",
        date: "01/04/2023",
    },
    {
        ID: "01EDSA",
        center: "Trung tâm Hà Nội 1",
        date: "01/04/2023",
    },
    {
        ID: "01EDSA",
        center: "Trung tâm Hà Nội 1",
        date: "01/04/2023",
    },
];

export const sampleRegistrationData = [
    {
        id: 1,
        car: "Toyota Corolla",
        customer: "John Doe",
        date: "2023-12-01",
        amount: "$200",
        "payment-mode": "Credit Card",
        status: "Completed",
    },
    {
        id: 2,
        car: "Honda Civic",
        customer: "Jane Smith",
        date: "2023-12-10",
        amount: "$180",
        "payment-mode": "Cash",
        status: "Pending",
    },
    {
        id: 3,
        car: "Ford Mustang",
        customer: "Alice Johnson",
        date: "2023-11-25",
        amount: "$250",
        "payment-mode": "Bank Transfer",
        status: "Completed",
    },
    {
        id: 4,
        car: "Tesla Model 3",
        customer: "Bob Brown",
        date: "2023-11-30",
        amount: "$300",
        "payment-mode": "Credit Card",
        status: "Failed",
    },
    {
        id: 5,
        car: "Hyundai Elantra",
        customer: "Charlie White",
        date: "2023-12-15",
        amount: "$220",
        "payment-mode": "Cash",
        status: "Pending",
    },
];
