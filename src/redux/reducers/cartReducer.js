import * as TYPES from "redux/types";

const initialState = {
    credit: {
        amount: 0
    },
    discounts: [
        // {
        //     code: "KEEPLEARNING",
        //     status: "applied",
        //     details: null
        // }
    ],
    lists: {
        cart: [
            // {
            //     buyable: {
            //         id: null,
            //         title: "JavaScript for beginners: Create 27 projects from scratch",
            //         trackingId: null,
            //         url: "/course/javascript-for-beginners-create-27-projects-from-scratch/",
            //         is_available_on_google_app: true,
            //         is_in_user_subscription: false,
            //         is_marketing_boost_agreed: true,
            //         is_private: false,
            //         num_subscribers: 0,
            //         primary_category: {
            //             id: 0,
            //             title: "Development",
            //             title_cleaned: "development",
            //             type: "category",
            //             url: "/courses/development/",
            //         },
            //         primary_subcategory: {
            //             id: 8,
            //             title: "Web Development",
            //             title_cleaned: "web-development",
            //             type: "subcategory",
            //             url: "/courses/development/web-development/"
            //         },
            //     },
            //     current_discount: {
            //         campaign: {
            //             code: "KEEPLEARNING",
            //             discount_percent: 0,
            //             discount_percent_for_display: 0,
            //             has_discount_saving: false,
            //             is_public: true,
            //         },
            //         listPrice: {
            //             amount: 94.99,
            //             currency: "USD",
            //             currency_symbol: "$",
            //             price_string: "$94.99",
            //         },
            //         price: {
            //             amount: 94.99,
            //             currency: "USD",
            //             currency_symbol: "$",
            //             price_string: "$94.99",
            //         },
            //         savingPrice: {
            //             amount: 0,
            //             currency: "USD",
            //             currency_symbol: "$",
            //             price_string: "Free",
            //         },
            //     },
            //     listPrice: {
            //         amount: 94.99,
            //         currency: "USD",
            //         currency_symbol: "$",
            //         price_string: "$94.99",
            //     },
            //     purchasePrice: {
            //         amount: 94.99,
            //         currency: "USD",
            //         currency_symbol: "$",
            //         price_string: "$94.99",
            //     },
            // }
        ],
        express: [],
        savedForLater: [],
        whishlist: []
    },
    unseenCounts: {
        cart: 0,
        express: 0,
        saveForLater: 0,
        whishlist: 0
    },

};
export default function (state = initialState, { payload, type }) {
    switch (type) {
        case TYPES.ADD_CART_ITEM:

            const unseenCounts = { ...state.unseenCounts, cart: state.unseenCounts.cart + payload.count }
            let cart = [...state.lists.cart]
            cart.unshift(payload.buyable)

            const addCart_amount = state.credit.amount + payload.buyable.price
            const addCart_credit = { amount: addCart_amount };

            // console.log("ADD_CART_ITEM", addCart_credit)

            const lists = { ...state.lists, cart }

            return {
                ...state,
                lists,
                unseenCounts,
                credit: addCart_credit
            };

        case TYPES.RESET_CART:
            return {
                ...state,
                credit: {
                    amount: 0
                },
                discounts: [
                ],
                lists: {
                    cart: [],
                    express: [],
                    savedForLater: [],
                    whishlist: []
                },
                unseenCounts: {
                    cart: 0,
                    express: 0,
                    saveForLater: 0,
                    whishlist: 0
                }
            }

        case TYPES.REMOVE_CART_ITEM:

            let removeCart_cart = state.lists.cart.filter(item => item.id !== payload.itemId)
            const removeCart_unseenCounts = { ...state.unseenCounts, cart: state.unseenCounts.cart - 1 }
            const removeCart_amount = state.credit.amount - payload.price
            const removeCart_credit = { amount: removeCart_amount };
            const removeCart_lists = { ...state.lists, cart: removeCart_cart }

            const removeCart_obj = {
                ...state,
                lists: removeCart_lists,
                unseenCounts: removeCart_unseenCounts,
                credit: removeCart_credit
            };

            return removeCart_obj



        default:
            return state;
    }
}


