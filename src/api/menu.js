const items = [{
        id: 1,
        // menu_header: "Menu",
        sub_menu: [{
            id: 1,
            menu_item: "Dashboard",
            url: '/',
            icon: 'apps'
        }, {
            id: 2,
            menu_item: "Users",
            url: '/user-list',
            icon: 'people'
        },
        {
            id: 3,
            menu_item: "Products",
            url: '/products',
            icon: 'inventory_2'
        },
        {
            id: 4,
            menu_item: "Categories",
            url: '/categories',
            icon: 'category'
        },
        // {
        //     id: 5,
        //     menu_item: "Plans",
        //     url: '/plans',
        //     icon: 'card_membership'
        // }, 
    ]
    },
    {
        id: 2,
        menu_header: "Orders",
        sub_menu: [{
                id: 1,
                menu_item: "All Orders",
                url: '/all-orders',
                icon: 'money'
            },

            {
                id: 2,
                menu_item: "Pending",
                url: '/pending-orders',
                icon: 'pending'
            },
            {
                id: 3,
                menu_item: "In Progress",
                url: '/in-progress-orders',
                icon: 'task_alt'
            },
            {
                id: 4,
                menu_item: "Completed",
                url: '/completed-orders',
                icon: 'cancel'
            },
            {
                id: 5,
                menu_item: "Delivered",
                url: '/delivered-orders',
                icon: 'cancel'
            },
            {
                id: 6,
                menu_item: "Cancelled",
                url: '/cancelled-orders',
                icon: 'cancel'
            },
        ]

    }

]

export default items;