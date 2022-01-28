<template>
    <h3 class="mb-3 text-3xl font-bold text-gray-800 text-center">Cart checkout</h3>
    <form
        @submit="onSubmit"
        class="space-y-3"
        novalidate
    >
        <app-input
            name="first_name"
            label="First name"
            v-model="first_name"
            :errorMessage="errors.first_name"
        />
        <app-input
            name="last_name"
            label="Last name"
            v-model="last_name"
            :errorMessage="errors.last_name"
        />
        <app-input
            type="email"
            name="email"
            label="Email"
            v-model="email"
            :errorMessage="errors.email"
        />
        <app-input
            name="city"
            label="City"
            v-model="city"
            :errorMessage="errors.city"
        />
        <app-input
            name="street"
            label="Street"
            v-model="street"
            :errorMessage="errors.street"
        />
        <app-input-select
            name="country"
            label="Country"
            v-model="country"
            :errorMessage="errors.country"
            :options="options"
        />
        <app-input
            name="zip_code"
            label="Zip code"
            v-model="zip_code"
            :errorMessage="errors.zip_code"
        />
        <app-button
            color="success"
            :isButtonLoading="isButtonLoading"
            type="submit"
        >Checkout
        </app-button>
    </form>
</template>

<script>
    import {useStore} from 'vuex';
    import {ref, computed} from 'vue';
    import {useForm, useField} from 'vee-validate';
    import * as yup from 'yup';
    import repository from "@/api/repository";
    import {cartMath} from "@/helpers/cart";
    import formatCurrency from "@/helpers/formatCurrency";
    import router from "@/router";

    export default {
        name: "FormCheckout",
        props: {
            cartState: {
                type: Array,
                required: true
            }
        },
        setup(props) {
            const store = useStore();
            const cart = cartMath();
            const user = computed(() => store.getters['auth/user']);
            const isButtonLoading = ref(false);
            const options = [
                {
                    value: "russia",
                    label: "RUSSIA"
                },
                {
                    value: "usa",
                    label: "USA"
                },
            ];

            const formCheckout = yup.object({
                first_name: yup.string().required().label('Name'), //required('Email is required')
                last_name: yup.string().required().label('Last name'),
                email: yup.string().required().email().label('Email'),
                street: yup.string().required().label('Street'),
                city: yup.string().required().label('City'),
                country: yup.string().required().label('Country'),
                zip_code: yup.string().required().label('Zip code'),
            });

            const {errors, handleSubmit} = useForm({
                validationSchema: formCheckout,
            });

            const {value: first_name} = useField('first_name');
            const {value: last_name} = useField('last_name');
            const {value: email} = useField('email');
            const {value: street} = useField('street');
            const {value: city} = useField('city');
            const {value: country} = useField('country');
            const {value: zip_code} = useField('zip_code');

            const onSubmit = handleSubmit(async (data, actions) => {
                isButtonLoading.value = true;
                Object.assign(data, {
                    amount: cart.total(store.getters['cart/cart']),
                    cart: JSON.stringify(props.cartState)
                });
                const config = { // config fetch
                    method: 'post',
                    data
                };
                const {errors, response, fetching} = await repository.purchase(config);
                isButtonLoading.value = fetching;
                if (errors) {
                    actions.setErrors(errors);
                    return;
                }
                if (response.status) {
                    const message = `Your order. Units: ${response.product_quantity}. Total: ${formatCurrency(response.total)}`;
                    await store.dispatch('notifications/setNotify', {
                        message,
                        type: 'success'
                    });
                    await store.dispatch('cart/clearCart');
                    router.push({name: 'home'});
                }
            });

            return {
                user,
                errors,
                first_name,
                last_name,
                email,
                street,
                city,
                country,
                zip_code,
                onSubmit,
                isButtonLoading,
                options
            }
        }
    }
</script>
